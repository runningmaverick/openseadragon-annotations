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
    // measured width (px) --------- x %
    return (verticalMeasureInPixels * 100) / totalImageHeightInPixels;
  },
  toPixels(horizontalMeasureAsPercentage) {
    const totalImageHeightInPixels = Store.getHeight();
    if (totalImageHeightInPixels === 0) { return 0; } // image not yet initialized
    // rule of three:
    // total height (px) -------- 100 %
    // x (px) -------- measured width %
    return (verticalMeasureInPixels * totalImageHeightInPixels) / 100;
  },
};

export { convertWidth, convertHeight };
