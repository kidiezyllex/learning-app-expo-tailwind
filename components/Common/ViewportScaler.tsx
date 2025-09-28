import { getHeightScaleFactor, getScaleFactor } from '@/utils/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ViewportScalerProps {
  children: React.ReactNode;
  useFullHeight?: boolean; // New prop to control height behavior
}

export default function ViewportScaler({ children, useFullHeight = true }: ViewportScalerProps) {
  const scaleFactor = getScaleFactor();
  const heightScaleFactor = getHeightScaleFactor();

  if (scaleFactor === 1 && (!useFullHeight || heightScaleFactor === 1)) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.scaledContainer,
          {
            transform: [{ scaleX: scaleFactor }, { scaleY: useFullHeight ? heightScaleFactor : scaleFactor }],
            width: `${100 / scaleFactor}%`,
            height: useFullHeight ? `${100 / heightScaleFactor}%` : `${100 / scaleFactor}%`,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scaledContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transformOrigin: 'top left',
  },
});
