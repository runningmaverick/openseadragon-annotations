import { Button } from 'OpenSeadragon';
import comment from '../actions/comment';
import Store from '../store/Store';
import Dispatcher from '../dispatcher/Dispatcher';


import drawGroupHover from '../../img/draw_grouphover.png';
import drawHover from '../../img/draw_hover.png';
import drawPressed from '../../img/draw_pressed.png';
import drawRest from '../../img/draw_rest.png';


export default class Comment {

    constructor() {
        this.btn = new Button(
    {
        mode: 'COMMENT',
        tooltip: 'Comment',
        srcRest: drawRest,
        srcGroup: drawGroupHover,
        srcHover: drawHover,
        srcDown: drawPressed,
        onClick: this.onClick,
        });
    }

    onClick(e) {
        
        comment(Dispatcher, Store);
        
    }


}
