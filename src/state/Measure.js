import OpenSeadragon from 'OpenSeadragon';

import measureCursor from '../../img/measure_cursor.png';


export default class Measure {

  constructor(overlay) {
    this.overlay = overlay;
  }

  initialize() {
     $("svg").css("cursor", 'url('+measureCursor+') 7 9, auto')
    this._mouseTracker = function (e) {
      var offsetX = e.clientX - this.rect.left,
					offsetY = e.clientY - this.rect.top;
      this.x = offsetX;
      this.y = offsetY;
      e.preventDefault();
      e.stopPropagation();
      return false;
    }.bind(this);
    this._onMouseDown = function (e) {
      var target = e.target || e.srcElement;
			this.rect = target.getBoundingClientRect();
			var	offsetX = e.clientX - this.rect.left,
			    offsetY = e.clientY - this.rect.top;
      this.handleMouseDown(offsetX,offsetY);
      e.stopPropagation();
    }.bind(this);
    this._onMouseUp = function () {
      this.handleMouseUp();
    }.bind(this);
    this.overlay.addHandler('mousedown', this._onMouseDown);
    window.addEventListener('mouseup', this._onMouseUp, false);
    return this;
  }

  close() {
    this.overlay.removeHandler('mousedown', this._onMouseDown);
    window.removeEventListener('mouseup', this._onMouseUp, false);
  }

  handleMouseDown(x, y) {
    if (!this._interval) {
      this.startX = x;
      this.startY = y;
      this.x = x;
      this.y = y;
      this.overlay.startPath(this.x, this.y);
      this.path = this.overlay.svg.lastChild;
      this.overlay.addLabel(this.x, this.y, "0");
      this.label = this.overlay.svg.lastChild;
      
      this.path.setAttribute('stroke', 'black');
      this.overlay.el.addEventListener('mousemove', this._mouseTracker, false);
      this._interval = window.setInterval(function () {
        this.overlay.updatePathsEnd(this.path, this.x, this.y);
        var dst = this.overlay.distance(this.x, this.y, this.startX, this.startY);
        dst = dst/getCurrentPPM();
        this.label.textContent = prettyPrintDistance(dst);
      }.bind(this), 25);
    }
    return this;
  }

  handleMouseUp() {
    this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
    this._interval = clearInterval(this._interval);
    this.path.remove();
    this.label.remove();
    return this;
  }

}

function prettyPrintDistance(dst) {
    //distance in meters
    if (dst >= 1000) {
        return (dst/1000).toFixed(2) + 'km';
    } else if (dst >= 1) {
        return dst.toFixed(2) + 'm';
    } else if (dst >= 0.001) {
        return (dst*1000).toFixed(2) + 'mm';
    } else if (dst >= 0.000001) {
        return (dst*1000*1000).toFixed(2) + 'um';
    } else 
        return (dst*1000*1000*1000).toFixed(2) + 'nm';
}

// from scalebar plugin
function getCurrentPPM() {
    var tiledImage = viewer.world.getItemAt(0);
    var ratio = tiledImage._scaleSpring.current.value *
            tiledImage.viewport._containerInnerSize.x /
            tiledImage.source.dimensions.x;
    var zoom = ratio * viewer.viewport.getZoom(true);
    return zoom * viewer.annotations.options.pixelsPerMeter;

}
