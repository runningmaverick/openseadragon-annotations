import { ACTIVITY_UPDATE, MODE_UPDATE } from '../constants/actionTypes';
import { DRAW, MOVE } from '../constants/modes';

export default function release(Dispatcher, Store) {
  switch (Store.getMode()) {

    case DRAW:
      Dispatcher.dispatch({
        type: ACTIVITY_UPDATE,
        inProgress: false,
      });

      if (Store.getMode() !== MOVE) {
          Dispatcher.dispatch({
            type: MODE_UPDATE,
            mode: MOVE,
          });
        }
      break;
  }
}
