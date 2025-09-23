import { Dimensions, PixelRatio } from 'react-native';

export const BASE_VIEWPORT = {
  width: 720,
  height: 1400,
};

// Lấy height, width thực tế của device
export const getDeviceDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

// Scale theo width
export const getScaleFactor = (): number => {
  const { width: deviceWidth } = getDeviceDimensions();
  const scaleFactor = deviceWidth / BASE_VIEWPORT.width;
  return scaleFactor;
};

// Scale theo height (nhưng đang để cứng tỉ lệ 0.5 ~ tỉ lệ đẹp)
export const getHeightScaleFactor = (): number => {
  const { height: deviceHeight } = getDeviceDimensions();
  const heightScaleFactor = 0.5; // deviceHeight / BASE_VIEWPORT.height;
  return heightScaleFactor;
};

export const scaleSize = (size: number): number => {
  const scaleFactor = getScaleFactor();
  const scaledSize = size * scaleFactor;
  return PixelRatio.roundToNearestPixel(scaledSize);
};

export const scaleFont = (fontSize: number, minFontSize?: number): number => {
  const scaledSize = scaleSize(fontSize);
  return minFontSize ? Math.max(scaledSize, minFontSize) : scaledSize;
};

export const scaleDimensions = (width: number, height: number) => {
  return {
    width: scaleSize(width),
    height: scaleSize(height),
  };
};

export const getViewportInfo = () => {
  const device = getDeviceDimensions();
  const scaleFactor = getScaleFactor();
  const heightScaleFactor = getHeightScaleFactor();

  return {
    device,
    baseViewport: BASE_VIEWPORT,
    scaleFactor,
    heightScaleFactor,
    scaledViewport: {
      width: device.width,
      height: device.height,
    },
  };
};
