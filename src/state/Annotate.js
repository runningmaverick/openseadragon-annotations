import OpenSeadragon from 'OpenSeadragon';

import measureCursor from '../../img/annotation_placeholder.png';


export default class Annotate {

  constructor(overlay) {
    this.overlay = overlay;
  }

  initialize() {
     $("svg").css("cursor", 'auto')
    this._onMouseDown = function (e) {
      this.rect = this.overlay.svg.getBoundingClientRect();
      var offsetX = e.clientX - this.rect.left,
          offsetY = e.clientY - this.rect.top;
      this.handleMouseDown(offsetX,offsetY);
      e.stopPropagation();
    }.bind(this);
    this.overlay.addHandler('mousedown', this._onMouseDown);
    return this;
  }

  close() {
    this.overlay.removeHandler('mousedown', this._onMouseDown);
  }

  handleMouseDown(x, y) {
    if (!this._interval) {
       this.overlay.addPlaceholder(x,y)
    }
    return this;
  }
}

