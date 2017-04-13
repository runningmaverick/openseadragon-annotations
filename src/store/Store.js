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
  imageProp:null,
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
          if (item[0] == 'line') {
              var obj = {shape:item[0], 'x1': item[1]['x1'], 'y1': item[1]['y1'], 'x2': item[1]['x2'], 'y2': item[1]['y2'], comment: comment}
          } else {
              var obj = {shape:item[0], points:item[1]['d'], comment: comment}
          }
          arr.push(obj);
        }
    });
    return arr;
  }

  ppmRatioX(){
    //"{"viewbox":{"x":10000,"y":10000},"imageSize":{"x":20480,"y":17408}}"
    var prop = data.imageProp;
    prop.imageSize.x;
    prop.imageSize.y;
    prop.viewbox.x;
    prop.viewbox.y;
    prop.pixelsPerMeter;
    return (prop.imageSize.x / prop.viewbox.x) * prop.mpp;
  }

  ppmRatioY(){
    var prop = data.imageProp;
    prop.imageSize.x;
    prop.imageSize.y;
    prop.viewbox.x;
    prop.viewbox.y;
    return (prop.imageSize.y / prop.viewbox.y) * prop.mpp;
  }

  caculateLength(points){
    //M9 4 L6 7 L6 7 L3 11

    var arr = points.split(" ");
    var length = 0;
    var lastX  = -1;
    var lastY = -1;
    for(var i = 0; i < arr.length; i = i + 2){
      var x = arr[i];
      var y = arr[i+1];
      x = x.replace('M', '').replace('L', '');
      x = parseInt(x);
      y = parseInt(y);

      if(lastX == -1 || lastY == -1){
        lastX = x;
        lastY = y;
        continue;
      }

      length += Math.sqrt(Math.pow((lastY - y) * this.ppmRatioY(), 2) + Math.pow((lastX - x) * this.ppmRatioX(), 2));
      lastX = x;
      lastY = y;
      
    }
    return length;
  }

  caculateArea(points){
    var area = 0;
    var arr = points.split(" ");
    var length = 0;
    var lastX  = -1;
    var lastY = -1;
    

    var pts = [];
    for(var i = 0;i < arr.length; i = i + 2){
      var x = arr[i];
      var y = arr[i+1]; 
      x = x.replace('M', '').replace('L', '');
      x = parseInt(x) * this.ppmRatioX();
      y = parseInt(y) * this.ppmRatioY();
      pts.push({x,y});
    }
    var len = pts.length;
    var area=0,len=pts.length;
    for(var i=0;i<len;++i){
      var p1 = pts[i], p2=pts[(i-1+len)%len];
      area += (p2.x+p1.x) * (p2.y-p1.y);
    }
    return Math.abs(area/2);

  }



  setAnnotationLabel(labels){
    data.labels = labels;
  }

  getAnnotationLabel(){
    return data.labels;
  }

  setImageProp(prop){
    data.imageProp = prop;
  }

  translateAnnotationsAndComments(annotations){
      var arr = [];
      annotations.forEach(function(item){
        var type = item.shape;
        var points = item.points;
        var comment = item.comment;
        if (type === 'line') {
            var polygon = shapesFactory.getLine(0, 0);
            polygon[1]['x1'] = item['x1']; 
            polygon[1]['x2'] = item['x2']; 
            polygon[1]['y1'] = item['y1']; 
            polygon[1]['y2'] = item['y2']; 
        } else {
            var polygon = shapesFactory.getPath(0,0);
            polygon[1]['d'] = points;
        }
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
      console.log('index:', index);
      console.log('anns:', data.annotations);
      data.annotations.splice(index, 1);
      console.log('anns:', data.annotations);
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

  getLength(){
    if(data.selected){
      var ann = Store.getById(data.selected);
        if (ann) {
            if (ann[0] === 'line') {
                return Math.sqrt(
                    (ann[1]['x1'] - ann[1]['x2']) * (ann[1]['x1'] - ann[1]['x2']) +
                    (ann[1]['y1'] - ann[1]['y2']) * (ann[1]['y1'] - ann[1]['y2']));
            } else {
              var length = this.caculateLength(ann[1]['d']);
              return length;
            }
        }
    }
  }

  getArea(){
    if(data.selected){
      var ann = Store.getById(data.selected);
        if (ann) {
            if (ann[0] === 'line') {
                return 1;
            } else {
              var area = this.caculateArea(ann[1]['d']);
              return area;
            }
        }
    }
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
      console.log('a create');
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
