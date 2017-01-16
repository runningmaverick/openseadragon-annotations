import { STROKE_SIZE, STROKE_COLOR } from '../constants/graphical';


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
};

export default shapesFactory;
