import Control from './Control';
import eraseGroupHover from '../../img/erase_grouphover.png';
import eraseHover from '../../img/erase_hover.png';
import erasePressed from '../../img/erase_pressed.png';
import eraseRest from '../../img/erase_rest.png';

export default class Draw extends Control {
  constructor() {
    super({
      Tooltip: 'Erase',
      srcRest: eraseRest,
      srcGroup: eraseGroupHover,
      srcHover: eraseHover,
      srcDown: erasePressed,
    });
  }
}
