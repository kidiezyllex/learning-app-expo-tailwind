import { Dimensions } from 'react-native';

export const BASE_VIEWPORT = {
  width: 720,
  height: 1400,
};

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



