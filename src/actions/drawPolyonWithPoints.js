import { ACTIVITY_UPDATE, ANNOTATIONS_CREATE, ANNOTATIONS_UPDATE_LAST } from '../constants/actionTypes';

export default function drawPolyonWithPoints(points, Dispatcher) {
  Dispatcher.dispatch({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  });
  Dispatcher.dispatch({
        type: ANNOTATIONS_CREATE,
        annotation: shapesFactory.getPath(0, 0),
  });
  Dispatcher.dispatch({
        type: ANNOTATIONS_UPDATE_LAST,
        update: { points: `${points}` },
  });
}
