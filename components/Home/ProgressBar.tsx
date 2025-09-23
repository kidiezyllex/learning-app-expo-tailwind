import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({ 
  progress, 
  showPercentage = true, 
  height = 28
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
            transform: [{ translateX: -50 }, { translateY: -14 }]
          }}>
            <Text style={{ fontSize: 20 }} className="z-10 font-medium text-black">
              {progress}% completed
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
