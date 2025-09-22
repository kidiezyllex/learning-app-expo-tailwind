import { getScaleFactor, getViewportInfo, scaleDimensions, scaleFont, scaleSize } from '@/utils/scaling';
import { useMemo } from 'react';

export function useScaling() {
  return useMemo(() => ({
    scaleFactor: getScaleFactor(),
    scaleSize,
    scaleFont,
    scaleDimensions,
    getViewportInfo,
  }), []);
}
