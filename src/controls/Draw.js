import Control from './Control';
import drawGroupHover from '../../img/draw_grouphover.png';
import drawHover from '../../img/draw_hover.png';
import drawPressed from '../../img/draw_pressed.png';
import drawRest from '../../img/draw_rest.png';

export default class Draw extends Control {
  constructor() {
    super({
      mode: 'DRAW',
      tooltip: '曲线',
      srcRest: drawRest,
      srcGroup: drawGroupHover,
      srcHover: drawHover,
      srcDown: drawPressed,
    });
  }
}
