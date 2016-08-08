import types from '../constants/actionTypes';

export default function leaveCanvas(Dispatcher, options) {
  Dispatcher.dispatch({
    type: types.INITIALIZE,
    options,
  });
}
