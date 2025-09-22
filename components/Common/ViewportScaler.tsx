import { getScaleFactor } from '@/utils/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ViewportScalerProps {
  children: React.ReactNode;
}

export default function ViewportScaler({ children }: ViewportScalerProps) {
  const scaleFactor = getScaleFactor();

  // Only apply scaling if scale factor is different from 1 (to avoid unnecessary transforms)
  if (scaleFactor === 1) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.scaledContainer,
          {
            transform: [{ scale: scaleFactor }],
            width: `${100 / scaleFactor}%`,
            height: `${100 / scaleFactor}%`,
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
    overflow: 'hidden',
  },
  scaledContainer: {
    flex: 1,
    transformOrigin: 'top left',
  },
});
