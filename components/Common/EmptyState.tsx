import React from 'react';
import { Image, Text, View } from 'react-native';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export default function EmptyState({ title, subtitle, icon }: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center p-8">
      {icon && (
        <Image 
          source={{ uri: icon }}
          className="mb-4 w-20 h-20 opacity-50"
          resizeMode="contain"
        />
      )}
      <Text className="mb-2 text-xl font-semibold text-center text-gray-600">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-center text-gray-500">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
