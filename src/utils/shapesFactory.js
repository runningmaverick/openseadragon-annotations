import { 
    STROKE_SIZE, STROKE_COLOR,
    STROKE_LINE_WIDTH, STROKE_LINE_COLOR
} from '../constants/graphical';


const shapesFactory = {
  getPath(x, y) {
    return [
      'path',
      {
        fill: 'red',
        'fill-opacity': 0.1,
        d: `M${x} ${y}`,
        stroke: STROKE_COLOR,
        'stroke-width': STROKE_SIZE,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        'vector-effect': 'non-scaling-stroke',
        id: 'polygon-' + Math.random().toString(36).substr(2),
      },
    ];
  },
  getLine(x, y) {
    return [
      'line',
      {
        fill: STROKE_LINE_COLOR,
        'fill-opacity': 0.1,
        'x1': x,
        'y1': y,
        'x2': x,
        'y2': y,
        stroke: STROKE_LINE_COLOR,
        'stroke-width': STROKE_LINE_WIDTH,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        'vector-effect': 'non-scaling-stroke',
        id: 'polygon-' + Math.random().toString(36).substr(2),
      },
    ];
  },
};

export default shapesFactory;
