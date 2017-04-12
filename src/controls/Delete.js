import { Button } from 'OpenSeadragon';
import del from '../actions/delete';
import Store from '../store/Store';
import Dispatcher from '../dispatcher/Dispatcher';


import drawGroupHover from '../../img/draw_grouphover.png';
import drawHover from '../../img/draw_hover.png';
import drawPressed from '../../img/draw_pressed.png';
import drawRest from '../../img/draw_rest.png';


export default class Delete {

    constructor() {
        this.btn = new Button(
    {
        mode: 'DELETE',
        tooltip: 'Delete',
        srcRest: drawRest,
        srcGroup: drawGroupHover,
        srcHover: drawHover,
        srcDown: drawPressed,
        onClick: this.onClick,
        });
    }

    onClick(e) {
        
        del(Dispatcher, Store);
        
    }


}
