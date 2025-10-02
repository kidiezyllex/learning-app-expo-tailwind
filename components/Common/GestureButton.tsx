import { useCallback } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface GestureButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  className?: string;
  disabled?: boolean;
  hapticFeedback?: boolean;
  scaleEffect?: boolean;
  rippleEffect?: boolean;
}

export default function GestureButton({
  children,
  onPress,
  onLongPress,
  style,
  className,
  disabled = false,
  hapticFeedback = true,
  scaleEffect = true,
  rippleEffect = false,
}: GestureButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const handlePress = useCallback(() => {
    if (disabled) return;
    
    if (hapticFeedback) {
      // Add haptic feedback if available
      try {
        const { HapticFeedback } = require('expo-haptics');
        HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Light);
      } catch (error) {
        // Haptic feedback not available
      }
    }
    
    onPress?.();
  }, [disabled, hapticFeedback, onPress]);

  const handleLongPress = useCallback(() => {
    if (disabled) return;
    
    if (hapticFeedback) {
      try {
        const { HapticFeedback } = require('expo-haptics');
        HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Medium);
      } catch (error) {
        // Haptic feedback not available
      }
    }
    
    onLongPress?.();
  }, [disabled, hapticFeedback, onLongPress]);

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      'worklet';
      if (scaleEffect) {
        scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
      }
      opacity.value = withTiming(0.7, { duration: 100 });
      
      if (rippleEffect) {
        rippleScale.value = 0;
        rippleOpacity.value = 0.3;
        rippleScale.value = withTiming(1, { duration: 300 });
        rippleOpacity.value = withTiming(0, { duration: 300 });
      }
    })
    .onFinalize((event) => {
      'worklet';
      if (scaleEffect) {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }
      opacity.value = withTiming(1, { duration: 100 });
      
      if (event.state === 4) { // ENDED
        runOnJS(handlePress)();
      }
    });

  const longPressGesture = Gesture.LongPress()
    .enabled(!disabled && !!onLongPress)
    .minDuration(500)
    .onStart(() => {
      'worklet';
      runOnJS(handleLongPress)();
    });

  const combinedGesture = Gesture.Race(tapGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const rippleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: rippleScale.value }],
      opacity: rippleOpacity.value,
    };
  });

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[style, animatedStyle]} className={className}>
        {rippleEffect && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 1000,
              },
              rippleStyle,
            ]}
          />
        )}
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
