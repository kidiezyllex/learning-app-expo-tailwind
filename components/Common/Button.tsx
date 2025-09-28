import { Pressable, Text, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({ text, onPress, disabled = false, style }: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (disabled) return;
    
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1.05, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 8, stiffness: 200 })
    );
    
    opacity.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(1, { duration: 200 })
    );
  };

  const handlePressOut = () => {
    if (disabled) return;
    
    scale.value = withSpring(1, { damping: 8, stiffness: 200 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const handlePress = () => {
    if (disabled) return;
    
    setTimeout(() => {
      runOnJS(onPress)();
    }, 100);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            height: 60,
            paddingHorizontal: 70,
          },
          style
        ]}
        className={`bg-[#1877F2] px-[70px] rounded-[10px] justify-center items-center ${
          disabled ? 'opacity-50' : ''}`}
      >
        <Text
          className="font-semibold text-white"
          style={{ fontSize: 24 }}
        >
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
