import { SELECTION_UPDATE } from '../constants/actionTypes';
import { DRAW, MOVE } from '../constants/modes';
import { STROKE_SIZE, STROKE_COLOR } from '../constants/graphical';

export default function select(selectedId, Dispatcher, Store) {
  if (Store.getMode() != DRAW) {

     var last = Store.getSelected();
     if(last){
        var ann = Store.getById(last);
        ann[1]["stroke-width"] = ann[1]["stroke-width"] - 2;;
     }
     var current = Store.getById(selectedId);
     if(current){
        current[1]["stroke-width"] = STROKE_SIZE + 2;
     }

     Dispatcher.dispatch({
        type: SELECTION_UPDATE,
        selected:selectedId, 
      });
   }
}
