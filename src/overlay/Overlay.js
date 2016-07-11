import OpenSeadragon from 'OpenSeadragon';

export default class Overlay extends OpenSeadragon.EventSource {

  initialize(viewer) {
    this.el = createOverlay();
    this.svg = appendSVG(this.el);
    this.el.addEventListener('mousedown', this.raiseEvent.bind(this, 'mousedown'), false);
    this.el.addEventListener('mouseup', this.raiseEvent.bind(this, 'mouseup'), false);
    viewer.addOverlay(this.el, createOpenSeadragonRect(viewer));
  }

  export() {
    var serializer = new XMLSerializer();
    var data = serializer.serializeToString(this.svg);
    return data;
  }

  import(data) {
    this.el.innerHTML = data;
    this.svg = this.el.firstChild;
  }

  reset() {
    this.el.innerHTML = '';
    this.svg = appendSVG(this.el);
  }

  startPath(x, y) {
    var path = createPath(x / this.el.clientWidth * 100, y / this.el.clientHeight * 100);
    this.svg.appendChild(path);
  }

  updatePath(x, y) {
    var x = x / this.el.clientWidth * 100;
    var y = y / this.el.clientHeight * 100;
    var path = this.svg.lastChild;
    path.setAttribute('d', path.getAttribute('d') + ' L' + x + ' ' + y);
  }

  updatePathsEnd(path, x, y) {
    var coords = path.getAttribute('d').split(' ');
    var x = x / this.el.clientWidth * 100;
    var y = y / this.el.clientHeight * 100;
    path.setAttribute('d', coords[0]+' '+coords[1]+' L'+ x + ' ' + y);
  }

 addLabel(x, y, text) {
    var x = x / this.el.clientWidth * 100;
    var y = y / this.el.clientHeight * 100;
    this.svg.appendChild(createLabel(x, y, text))
  }

  addPlaceholder(x,y) {
    var x = x / this.el.clientWidth * 100;
    var y = y / this.el.clientHeight * 100;
    return createPlaceholder(x, y, this.svg)
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

}

function createOverlay() {
  var div = document.createElement('div');
  div.className = 'overlay';
  return div;
}

function appendSVG(el) {
  var svg = createSVG();
  el.appendChild(svg);
  return svg;
}

function createPath(x, y) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'red');
  path.setAttribute('stroke-width', 0.5/viewer.viewport.getZoom());
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('d', 'M' + x + ' ' + y);
  return path;
}

function createSVG() {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('version', '1.1');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.style.cursor = 'default';
  return svg;
}

function createLabel(x, y, text) {
    var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.textContent = text;
    label.setAttribute('x', x*viewer.viewport.getZoom());
    label.setAttribute('y', y*viewer.viewport.getZoom());
    label.setAttribute('font-size', 3);
    label.setAttribute('font-family', 'monospace');
    label.setAttribute('transform', 'scale('+1/viewer.viewport.getZoom()+')')
    return label;
  }

function createOpenSeadragonRect(viewer) {
  var width = viewer.viewport.homeBounds.width;
  var height = viewer.viewport.homeBounds.height;
  return new OpenSeadragon.Rect(0, 0, width, height);
}

function createPlaceholder(x, y, svg) {
    var r = 2;
    x = x*viewer.viewport.getZoom();
    y = y*viewer.viewport.getZoom();
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', 0.1/viewer.viewport.getZoom());
    circle.setAttribute('opacity', '0.8');
    circle.setAttribute('transform', 'scale('+1/viewer.viewport.getZoom()+')')
    svg.appendChild(circle);
    var circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('cx', x);
    circle2.setAttribute('cy', y);
    circle2.setAttribute('r', r*0.9);
    circle2.setAttribute('stroke', 'blue');
    circle2.setAttribute('fill', 'rgb(0,0,255)');
    circle2.setAttribute('stroke-width', 0.1);
    circle2.setAttribute('opacity', '0.2');
    circle2.setAttribute('transform', 'scale('+1/viewer.viewport.getZoom()+')')
    circle2.setAttribute('cursor', 'pointer')
    svg.appendChild(circle2);
    x = x*3;y = y*3; //to counter scale
    x = x-2;y = y-4; //to shift it to the center
    var iletter = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iletter.setAttribute('stroke', 'white');
    iletter.setAttribute('stroke-width', 0.5);
    iletter.setAttribute('d', 'M3 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-1.5 2.5c-.83 0-1.5.67-1.5 1.5h1c0-.28.22-.5.5-.5s.5.22.5.5-1 1.64-1 2.5c0 .86.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h-1c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-.36 1-1.84 1-2.5 0-.81-.67-1.5-1.5-1.5z');
    iletter.setAttribute('opacity', '0.7');
    iletter.setAttribute('transform', 'scale('+1/3/viewer.viewport.getZoom()+') translate('+x+','+y+')');
    svg.appendChild(iletter)

    var newnote = prompt("Specify note for this location");
    if (newnote === null) { //user cancelled prompt
      circle.remove();
      circle2.remove();
      iletter.remove();
      return;
    } 
    circle2.setAttribute('note', newnote)
    $(circle2).on('mouseenter', function() { this.setAttribute('opacity', "1"); });
    $(circle2).on('mouseleave', function() { this.setAttribute('opacity', "0.2")});
    $(circle2).on('mousedown', function(e) { 
      var newnote = prompt("Specify note for this location, leave it empty to remove the note", this.getAttribute('note'));
      if (newnote !== null) //user cancelled prompt 
        this.setAttribute('note', newnote); 
      if (newnote === "") {
        var circle2 = $(this).prev();
        var iletter = $(this).next();
        this.remove();
        circle2.remove();
        iletter.remove();
      }
      e.stopPropagation(); 
    });
    return circle2;
  }
