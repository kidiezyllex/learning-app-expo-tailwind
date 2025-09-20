import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({ 
  progress, 
  showPercentage = true, 
  height = 20 
}: ProgressBarProps) {
  return (
    <View className="w-[94%]">
      <View 
        className="overflow-hidden relative rounded-3xl bg-zinc-300"
        style={{ height }}
      >
        <View 
          className="absolute top-0 bottom-0 left-0 bg-amber-400 rounded-3xl"
          style={{ width: `${progress}%` }}
        />
        
        {showPercentage && (
          <View className="absolute inset-0 justify-center items-center">
            <Text className="z-10 text-base font-medium text-black">
              {progress}% Hoàn thành
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
