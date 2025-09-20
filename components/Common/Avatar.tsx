import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface AvatarProps {
  source: string;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  showBorder?: boolean;
}

export default function Avatar({ 
  source, 
  size = 'medium', 
  onPress, 
  showBorder = false 
}: AvatarProps) {
  const sizeClasses = {
    small: 'w-11 h-11',
    medium: 'w-16 h-16', 
    large: 'w-20 h-20'
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component onPress={onPress}>
      <Image
        source={{ uri: source }}
        className={`${sizeClasses[size]} rounded-full ${showBorder ? 'border-2 border-white' : ''}`}
        resizeMode="cover"
      />
    </Component>
  );
}
