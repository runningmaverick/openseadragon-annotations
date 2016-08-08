import { h, Component } from 'preact';
import Store from '../store/Store';
import { click, leaveCanvas, move, press, release } from '../actions/';
import modes from '../constants/modes';
import { CHANGE_EVENT } from '../constants/events';
import { convertWidth, convertHeight } from '../utils/convert';

export default class Annotations extends Component {
  getInitialState() {
    return { annotations: Store.getAll() };
  }

  componentDidMount() {
    Store.addHandler(CHANGE_EVENT, () => {
      this.setState({ annotations: Store.getAll() });
    });
  }

  coords(e) {
    const rect = this.base.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = convertWidth.toPercent(offsetX);
    const y = convertHeight.toPercent(offsetY);
    return [
      Math.round(x * 100) / 100,
      Math.round(y * 100) / 100,
    ];
  }

  render() {
    return (
      <svg
        {...svgProperties}
        style={{ cursor: 'default' }}
        onClick={unlessInMoveMode((e) => click(...this.coords(e)))}
        onMouseDown={unlessInMoveMode((e) => press(...this.coords(e)))}
        onMouseLeave={unlessInMoveMode(leaveCanvas)}
        onMouseMove={unlessInMoveMode((e) => move(...this.coords(e)))}
        onMouseUp={unlessInMoveMode(release)}
      >
        { this.state.annotations.map(el => h(...el)) }
      </svg>
    );
  }
}

function unlessInMoveMode(fn) {
  return (e) => {
    if (Store.getMode() !== modes.MOVE) {
      e.stopPropagation();
      fn(e);
    }
  };
}

const svgProperties = {
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  preserveAspectRatio: 'none',
  viewBox: '0 0 100 100',
  width: '100%',
  height: '100%',
};
