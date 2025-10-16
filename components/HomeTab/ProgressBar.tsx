import { getScaleFactor } from '@/utils/scaling';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({ 
  progress, 
  showPercentage = true, 
  height = getScaleFactor() * 28
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
          <View className="absolute justify-center items-center" style={{ 
            left: '50%', 
            top: '50%',
            transform: [{ translateX: -(getScaleFactor() * 50) }, { translateY: - (getScaleFactor() * 16) }]
          }}>
            <Text className="z-10 text-sm font-medium text-black">
              {progress}% completed
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
