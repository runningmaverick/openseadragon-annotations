import { COMMENT_UPDATE } from '../constants/actionTypes';
import { DRAW, MOVE } from '../constants/modes';


export default function comment(Dispatcher, Store) {
  if (Store.getMode() != DRAW) {
     Dispatcher.dispatch({
        type: COMMENT_UPDATE,
      });
   }
}