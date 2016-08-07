import types from '../constants/actionTypes';

export default function selectMode(Dispatcher, Store, zoom) {
  Dispatcher.dispatch({
    type: types.ZOOM_UPDATE,
    zoom,
  });
}
