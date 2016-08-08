import Store from '../store/Store';

const convertWidth = {
  toPercent(horizontalMeasureInPixels) {
    const totalImageWidthInPixels = Store.getWidth();
    if (totalImageWidthInPixels === 0) { return 0; } // image not yet initialized
    // rule of three:
    // total width (px) ---------- 100 %
    // measured width (px) --------- x %
    return (horizontalMeasureInPixels * 100) / totalImageWidthInPixels;
  },
  toPixels(horizontalMeasureAsPercentage) {
    const totalImageWidthInPixels = Store.getWidth();
    if (totalImageWidthInPixels === 0) { return 0; } // image not yet initialized
    // rule of three:
    // total width (px) --------- 100 %
    // x (px) -------- measured width %
    return (horizontalMeasureAsPercentage * totalImageWidthInPixels) / 100;
  },
};

const convertHeight = {
  toPercent(verticalMeasureInPixels) {
    const totalImageHeightInPixels = Store.getHeight();
    if (totalImageHeightInPixels === 0) { return 0; } // image not yet initialized
    // rule of three:
    // total height (px) --------- 100 %
    // measured height (px) -------- x %
    return (verticalMeasureInPixels * 100) / totalImageHeightInPixels;
  },
  toPixels(verticallMeasureAsPercentage) {
    const totalImageHeightInPixels = Store.getHeight();
    if (totalImageHeightInPixels === 0) { return 0; } // image not yet initialized
    // rule of three:
    // total height (px) -------- 100 %
    // x (px) ------- measured height %
    return (verticallMeasureAsPercentage * totalImageHeightInPixels) / 100;
  },
};

const convertCoordinates = {
  toPercent(x, y) {
    return [
      convertWidth.toPercent(x),
      convertHeight.toPercent(y),
    ];
  },
  toPixels(x, y) {
    return [
      convertWidth.toPixels(x),
      convertHeight.toPixels(y),
    ];
  },
};

const convertVector = {
  toPercent(x1, y1, x2, y2) {
    return [
      convertWidth.toPercent(x1),
      convertHeight.toPercent(y1),
      convertWidth.toPercent(x2),
      convertHeight.toPercent(y2),
    ];
  },
  toPixels(x1, y1, x2, y2) {
    return [
      convertWidth.toPixels(x1),
      convertHeight.toPixels(y1),
      convertWidth.toPixels(x2),
      convertHeight.toPixels(y2),
    ];
  },
};

export { convertWidth, convertHeight, convertCoordinates, convertVector };
