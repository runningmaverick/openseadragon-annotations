import OpenSeadragon, { extend } from 'OpenSeadragon';
import Dispatcher from '../dispatcher/Dispatcher';
import {
  MODE_UPDATE,
  ACTIVITY_UPDATE,
  ANNOTATIONS_CREATE,
  ANNOTATIONS_UPDATE_LAST,
  ANNOTATIONS_RESET,
  ZOOM_UPDATE,
  INITIALIZE,
  VIEWPORT_UPDATE,
  SELECTION_UPDATE,
  DELETE_UPDATE,
  COMMENT_UPDATE,
} from '../constants/actionTypes';
import { MOVE } from '../constants/modes';
import { CHANGE_EVENT } from '../constants/events';
import shapesFactory from '../utils/shapesFactory';

const data = {
  mode: MOVE,
  zoom: 1,
  // width and heigth contain the original width and height of the
  // SVG container, in pixels, at zoom level 1. These will remain
  // constant over time as the image scales up and down
  width: 0,
  height: 0,
  activityInProgress: false,
  annotations: [],
  comments:[],
  labels: [],
  selected:null,
  commentDialogShow: true,
  callback:null,
};

class AppStore extends OpenSeadragon.EventSource {
  getAll() {
    return data.annotations;
  }

  getAnnotationsAndComments(){
    var arr = []
    data.annotations.forEach(function(item){
        var id = item[1]['id'];
        if (id){
          var comment = item[1]['comment'];
          if(!comment){
            comment = "";
          }
          var obj = {shape:item[0], points:item[1]['d'], comment: comment}
          arr.push(obj);
        }
    });
    return arr;
  }

  setAnnotationLabel(labels){
    data.labels = labels;
  }

  getAnnotationLabel(){
    return data.labels;
  }

  translateAnnotationsAndComments(annotations){
      var arr = [];
      annotations.forEach(function(item){
        var type = item.shape;
        var points = item.points;
        var comment = item.comment;
        var polygon = shapesFactory.getPath(0,0);
        polygon[1]['d'] = points;
        if(comment){
          polygon[1]['comment'] = comment;
        }
        arr.push(polygon);

      })
      return arr;
  }


  // multiplying the original width in pixels by the current
  // zoom level gives us the image width in pixels at the moment
  getWidth() {
    return data.width * data.zoom;
  }

  // idem for the heigth
  getHeight() {
    return data.height * data.zoom;
  }

  getLast() {
    return data.annotations[data.annotations.length - 1];
  }

  getById(id){
    return data.annotations.find(function(item){
        return item[1].id === id
    })
  }

  removeById(id){
    var item = this.getById(id)
    if(item){
      var index = data.annotations.indexOf(item);
      data.annotations.splice(index, 1);
    }
  }

  getMode() {
    return data.mode;
  }

  inMoveMode() {
    return this.getMode() === MOVE;
  }

  notInMoveMode() {
    return !this.inMoveMode();
  }

  getZoomLevel() {
    return data.zoom;
  }

  isActivityInProgress() {
    return data.activityInProgress;
  }

  isShowCommentDialog(){
    return data.commentDialogShow;

  }

  getSelected(){
    return data.selected;
  }

  getComment(){
    if(data.selected){
      var ann = Store.getById(data.selected);
        if (ann) {
          var comment = ann[1].comment;
          if(comment)  return comment;
        }
    }
    return "";
  }
}

const Store = new AppStore();

Dispatcher.register((action) => {
  switch (action.type) {
    case MODE_UPDATE:
      data.mode = action.mode;
      break;

    case ACTIVITY_UPDATE:
      data.activityInProgress = action.inProgress;
      break;

    case ANNOTATIONS_CREATE:
      data.annotations.push(action.annotation);
      break;

    case ANNOTATIONS_UPDATE_LAST:
      extend(Store.getLast()[1], action.update);
      break;

    case ANNOTATIONS_RESET:
      data.annotations = action.annotations;
      break;

    case ZOOM_UPDATE:
      data.zoom = action.zoom;
      break;

    case INITIALIZE:
      extend(data, action.options);
      break;

    case VIEWPORT_UPDATE:
      console.log("width:" + data.width + "  height:" + data.height);
      // data.width = action.width;
      // data.height = action.height;
      break;

    case SELECTION_UPDATE:
      data.selected = action.selected;
      break;
    case DELETE_UPDATE:
      var ann = Store.getById(data.selected);
      if(ann){
        Store.removeById(data.selected)
        if(data.callback && data.callback.onAnnotationChange){
          data.callback.onAnnotationChange();
        }
      }
      data.selected = null;
      break;
    case COMMENT_UPDATE:
      var ann = Store.getById(data.selected);
      if(ann){
        ann[1].comment = action.comment;
        if(data.callback && data.callback.onAnnotationChange){
          data.callback.onAnnotationChange();
        }
      }
      break;
  }
  Store.raiseEvent(CHANGE_EVENT);
});

export default Store;
