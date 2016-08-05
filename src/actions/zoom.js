import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';

export default function selectMode(zoom) {
  Dispatcher.dispatch({
    type: types.ZOOM_UPDATE,
    zoom,
  });
}
