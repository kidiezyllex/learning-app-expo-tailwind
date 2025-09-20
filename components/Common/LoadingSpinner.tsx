import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export default function LoadingSpinner({ 
  size = 'small', 
  color = '#2563eb' 
}: LoadingSpinnerProps) {
  return (
    <View className="justify-center items-center p-4">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
