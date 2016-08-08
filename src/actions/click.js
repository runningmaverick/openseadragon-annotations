import types from '../constants/actionTypes';
import modes from '../constants/modes';
import { distanceToPoint } from '../utils/measure';
import { convertWidth, convertHeight, convertCoordinates } from '../utils/convert';

export default function press(Dispatcher, Store, x, y) {
  switch (Store.getMode()) {

    case modes.ERASE:
      const annotations = Store.getAll();
      const toRemove = [];
      const pixelCoordinates = [
        convertWidth.toPixels(x),
        convertHeight.toPixels(y),
      ];
      const eraseDist = 10;

      annotations.forEach((annotation, index) => {
        if (annotation[0] === 'path') {
          const points = annotation[1].d.split(' ');
          if (points.length > 2) {
            for (let i = 0; i < points.length - 2; i += 4) {
              const p1 = [
                convertWidth.toPixels(points[i].substr(1)),
                convertHeight.toPixels(points[i + 1]),
              ];
              const p2 = [
                convertWidth.toPixels(points[i + 2].substr(1)),
                convertHeight.toPixels(points[i + 3]),
              ];
              convertCoordinates.toPixels(x, y)
              const distto1 = distanceToPoint(pixelCoordinates[0], pixelCoordinates[1], ...p1);
              const distto2 = distanceToPoint(pixelCoordinates[0], pixelCoordinates[1], ...p2);
              const dist1to2 = distanceToPoint(p1[0], p1[1], p2[0], p2[1]);

              if ((distto1 * distto2) / dist1to2 < eraseDist) {
                toRemove.push(index);
                break;
              }
            }
          }
        }
      });
      if (toRemove.length > 0) {
        Dispatcher.dispatch({
          type: types.ANNOTATIONS_DELETE,
          annotations: toRemove,
        });
      }
      break;

  }
}
