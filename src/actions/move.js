import { ANNOTATIONS_UPDATE_LAST } from '../constants/actionTypes';
import { DRAW } from '../constants/modes';

export default function move(x, y, Dispatcher, Store) {
  switch (Store.getMode()) {

    case DRAW:
      if (Store.isActivityInProgress()) {
        const last = Store.getLast();
        if (last && last[0] === 'path') {
          const d = last[1].d;
          Dispatcher.dispatch({
            type: ANNOTATIONS_UPDATE_LAST,
            update: { d: `${d} L${x} ${y}` },
          });
        }
      }
      break;
    case 'LINE':
      if (Store.isActivityInProgress()) {
        const last = Store.getLast();
        if (last && last[0] === 'path') {
          let d = last[1].d;
          if (d.indexOf('L') != -1) {
              d = d.substr(0, d.indexOf('L') - 1)
          }
          Dispatcher.dispatch({
            type: ANNOTATIONS_UPDATE_LAST,
            update: { d: `${d} L${x} ${y}` },
          });
        }
      }
      break;
  }
}
