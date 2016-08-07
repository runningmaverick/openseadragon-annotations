import types from '../constants/actionTypes';
import modes from '../constants/modes';

export default function leaveCanvas(Dispatcher, Store, options) {
  Dispatcher.dispatch({
    type: types.INITIALIZE,
    options,
  });
}
