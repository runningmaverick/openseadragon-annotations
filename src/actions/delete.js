import { DELETE_UPDATE } from '../constants/actionTypes';
import { DRAW, MOVE } from '../constants/modes';


export default function del(Dispatcher, Store) {
  if (Store.getMode() != DRAW) {
     Dispatcher.dispatch({
        type: DELETE_UPDATE,
      });
   }
}