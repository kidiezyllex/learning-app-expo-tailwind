import { getScaleFactor } from '@/utils/scaling';
import { useCallback } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../assets/icons/icons';

interface AnimatedHeaderProps {
  title: string;
  scrollY?: Animated.SharedValue<number>;
  onBack?: () => void;
  showRightIcons?: boolean;
  firstRightIcon?: any;
  firstRightIconWidth?: number;
  firstRightIconHeight?: number;
  secondRightIcon?: any;
  secondRightIconWidth?: number;
  secondRightIconHeight?: number;
  handleFirstRightIconClick?: () => void;
  handleSecondRightIconClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  headerHeight?: number;
  enableBlur?: boolean;
}

export default function AnimatedHeader({
  title,
  scrollY,
  onBack,
  showRightIcons = false,
  firstRightIcon,
  firstRightIconWidth = 24,
  firstRightIconHeight = 24,
  secondRightIcon,
  secondRightIconWidth = 24,
  secondRightIconHeight = 24,
  handleFirstRightIconClick,
  handleSecondRightIconClick,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  headerHeight = 60,
  enableBlur = true,
}: AnimatedHeaderProps) {
  const insets = useSafeAreaInsets();
  const totalHeight = headerHeight + insets.top;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};

    const opacity = interpolate(
      scrollY.value,
      [0, 50, 100],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};

    const opacity = interpolate(
      scrollY.value,
      [0, 50, 100],
      [0, 0.7, 1],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, 100],
      [0.9, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};

    const opacity = interpolate(
      scrollY.value,
      [0, 50, 100],
      [0, 0.8, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const handleBackPress = useCallback(() => {
    onBack?.();
  }, [onBack]);

  return (
    <View style={{ position: 'relative', zIndex: 1000 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Animated Background */}
      {scrollY && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height:  getScaleFactor() * totalHeight,
              backgroundColor,
              zIndex: 1,
            },
            backgroundAnimatedStyle,
          ]}
        />
      )}

      {/* Header Content */}
      <Animated.View
        style={[
          {
            height: getScaleFactor() * totalHeight,
            paddingTop: insets.top,
            paddingHorizontal: getScaleFactor() * 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
          },
          !scrollY && { backgroundColor },
          scrollY && headerAnimatedStyle,
        ]}
      >
        {/* Left Side - Back Button */}
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          {onBack && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{
                width: getScaleFactor() * 40,
                height: getScaleFactor() * 40,
                borderRadius: getScaleFactor() * 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              activeOpacity={0.7}
            >
              <Image
                source={icons.leftArrow}
                style={{ width: getScaleFactor() * 24, height: getScaleFactor() * 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Center - Title */}
        <Animated.View
          style={[
            { flex: 2, alignItems: 'center' },
            scrollY && titleAnimatedStyle,
          ]}
        >
          <Text
            className="text-base font-semibold text-center"
            style={{
              color: textColor,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </Animated.View>

        {/* Right Side - Action Icons */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
          {showRightIcons && (
            <>
              {firstRightIcon && (
                <TouchableOpacity
                  onPress={handleFirstRightIconClick}
                  style={{
                    width: getScaleFactor() * 40,
                    height: getScaleFactor() * 40,
                    borderRadius: getScaleFactor() * 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={firstRightIcon}
                    style={{ width: getScaleFactor() * firstRightIconWidth, height: getScaleFactor() * firstRightIconHeight }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              {secondRightIcon && (
                <TouchableOpacity
                  onPress={handleSecondRightIconClick}
                  style={{
                    width: getScaleFactor() * 40,
                    height: getScaleFactor() * 40,
                    borderRadius: getScaleFactor() * 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={secondRightIcon}
                    style={{ width: getScaleFactor() * secondRightIconWidth, height: getScaleFactor() * secondRightIconHeight }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
