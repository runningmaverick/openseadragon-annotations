import OpenSeadragon from 'OpenSeadragon';

import eraseCursor from '../../img/erase_cursor.png';

export default class Erase {

  constructor(overlay) {
    this.overlay = overlay;
  }

  erase(x, y) {
    var clientx = x / this.overlay.svg.clientWidth * 100,
        clienty = y / this.overlay.svg.clientHeight * 100;
    console.log("erase at " + x + "," + y);
    var paths = $(this.overlay.svg).find("path")
    var toremove = [];
    var overlay = this.overlay;
    paths.each(function (i, el) {
        var $el = $(el);
        var points = $el.attr("d").split(" ");
        for (var j = 0; j < points.length - 2; j += 4) {
            var erasedist = 2 / viewer.viewport.getZoom();
            var point1x = points[j].substr(1),
                point1y = points[j + 1];
            var point2x = points[j + 2].substr(1),
                point2y = points[j + 3];
            //check if the click occured close to the line connecting the two points
            var distto1 = overlay.distance(point1x, point1y, clientx, clienty);
            var distto2 = overlay.distance(point2x, point2y, clientx, clienty); 
            var dist1to2 = overlay.distance(point2x, point2y, point1x, point1y); 
            if (distto1 + distto2 < dist1to2 + 2*erasedist) {
                //console.log("connection erasing at " + clientx + ", " + clienty);
                toremove.push(el);
                break;
            }
        }
    });
    $(toremove).each(function (i, el) { $(el).remove(); });
    //DEBUG - show erasure circle
    // var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    // var radius = 1 / viewer.viewport.getZoom();
    // dot.setAttribute('cx', clientx-radius/2);
    // dot.setAttribute('stroke', 'black');
    // dot.setAttribute('r', radius);
    // dot.setAttribute('cy', clienty - radius / 2);
    // this.overlay.svg.appendChild(dot)
    // DEBUG - color lines to be deleted
    //$(toremove).each(function (i, el) { el.setAttribute("stroke", "green"); });
  }

  initialize() {
    console.log("erase")
    $("svg").css("cursor", 'url('+eraseCursor+') 13 9, auto')
    this._mouseTracker = function (e) {
      var offsetX = e.clientX - this.rect.left,
					offsetY = e.clientY - this.rect.top;
      //console.log("mousetracker rect"+this.rect.left+","+this.rect.top+" offset:"+offsetX+","+offsetY);
      this.x = offsetX;
      this.y = offsetY;
    }.bind(this);
    this._onMouseDown = function (e) {
		this.rect = this.overlay.svg.getBoundingClientRect();
		var	offsetX = e.clientX - this.rect.left,
		    offsetY = e.clientY - this.rect.top;
        this.handleMouseDown(offsetX, offsetY);
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
      this.x = x;
      this.y = y;
      this.erase(x, y); 
      this.overlay.el.addEventListener('mousemove', this._mouseTracker, false);
      this._interval = window.setInterval(function () {
        this.erase(this.x, this.y); 
      }.bind(this), 25);
    }
    return this;
  }

  handleMouseUp() {
    this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
    this._interval = clearInterval(this._interval);
    return this;
  }

}
