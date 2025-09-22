import { Dimensions, PixelRatio } from 'react-native';

// Base viewport dimensions (your design viewport)
export const BASE_VIEWPORT = {
  width: 720,
  height: 1280,
};

// Get current device dimensions
export const getDeviceDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

// Calculate scale factor based on width (maintains aspect ratio)
export const getScaleFactor = (): number => {
  const { width: deviceWidth } = getDeviceDimensions();
  const scaleFactor = deviceWidth / BASE_VIEWPORT.width;
  return scaleFactor;
};

// Calculate scale factor for height (allows different height scaling)
export const getHeightScaleFactor = (): number => {
  const { height: deviceHeight } = getDeviceDimensions();
  const heightScaleFactor = deviceHeight / BASE_VIEWPORT.height;
  return heightScaleFactor;
};

// Get scaled size for any dimension
export const scaleSize = (size: number): number => {
  const scaleFactor = getScaleFactor();
  const scaledSize = size * scaleFactor;
  return PixelRatio.roundToNearestPixel(scaledSize);
};

// Get scaled font size (with optional minimum font size for readability)
export const scaleFont = (fontSize: number, minFontSize?: number): number => {
  const scaledSize = scaleSize(fontSize);
  return minFontSize ? Math.max(scaledSize, minFontSize) : scaledSize;
};

// Get scaled dimensions (width and height)
export const scaleDimensions = (width: number, height: number) => {
  return {
    width: scaleSize(width),
    height: scaleSize(height),
  };
};

// Get viewport info for debugging
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
