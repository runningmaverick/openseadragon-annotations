import { VIEWPORT_UPDATE } from '../constants/actionTypes';

export default function resize(width, height, zoom, Dispatcher) {
  console.log("resize x:" + width + ", y:" + height + " zoom:" + zoom);
  Dispatcher.dispatch({
    type: VIEWPORT_UPDATE,
    width: width,
    height:height,
  });
}