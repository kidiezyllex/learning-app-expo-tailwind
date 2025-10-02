import { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface EssayPaginationProps {
  totalItems: number;
  currentIndex: number;
  onItemSelect: (index: number) => void;
  maxVisibleItems?: number;
}

export default function EssayPagination({
  totalItems,
  currentIndex,
  onItemSelect,
  maxVisibleItems = 6
}: EssayPaginationProps) {
  const [startIndex, setStartIndex] = useState(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  
  if (!totalItems || totalItems <= 0) {
    return null;
  }
  
  if (currentIndex < 0 || currentIndex >= totalItems) {
    return null;
  }

  const endIndex = Math.min(startIndex + maxVisibleItems, totalItems);
  const visibleItems = Array.from({ length: Math.max(0, endIndex - startIndex) }, (_, i) => startIndex + i);

  const canGoLeft = startIndex > 0;
  const canGoRight = endIndex < totalItems;

  const handlePrevious = useCallback(() => {
    if (canGoLeft) {
      const newStartIndex = Math.max(0, startIndex - maxVisibleItems);
      setStartIndex(newStartIndex);
    }
  }, [canGoLeft, startIndex, maxVisibleItems]);

  const handleNext = useCallback(() => {
    if (canGoRight) {
      const newStartIndex = Math.min(totalItems - maxVisibleItems, startIndex + maxVisibleItems);
      setStartIndex(newStartIndex);
    }
  }, [canGoRight, totalItems, maxVisibleItems, startIndex]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      scale.value = withSpring(1.05);
    })
    .onEnd((event) => {
      translateX.value = withSpring(0);
      scale.value = withSpring(1);
      
      const threshold = 50;
      
      if (event.translationX > threshold && canGoLeft) {
        runOnJS(handlePrevious)();
      } else if (event.translationX < -threshold && canGoRight) {
        runOnJS(handleNext)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
    };
  });

  const renderQuestionNumber = useCallback((index: number, arrayIndex: number) => {
    const actualIndex = startIndex + arrayIndex;
    const isActive = actualIndex === currentIndex;
    const questionNumber = actualIndex + 1; // Display 1-based question numbers
    
    // Safety check to ensure we have valid values
    if (actualIndex < 0 || actualIndex >= totalItems) {
      return null;
    }
    
    return (
      <TouchableOpacity
        style={{ height: 40, width: 40, minHeight: 40, minWidth: 40, flexShrink: 0 }}
        key={actualIndex}
        onPress={() => onItemSelect(actualIndex)}
        className={`rounded-full flex justify-center items-center border-[2px] bg-[#E5E5E5] ${
          isActive ? 'border-[#626262]' : 'border-transparent'
        }`}
      >
        <Text
          style={{ fontSize: 16 }}
          className="font-medium text-center text-[#626262]"
        >
          {questionNumber || '?'}
        </Text>
      </TouchableOpacity>
    );
  }, [startIndex, currentIndex, totalItems, onItemSelect]);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View 
        style={[animatedStyle]}
        className="flex-row justify-center items-center" 
      >
        <View style={{ gap: 20 }} className="flex-row justify-center items-center">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={!canGoLeft}
            style={{ opacity: canGoLeft ? 1 : 0.3 }}
          >
            <Image
              style={{ width: 20, height: 34 }}
              source={require('../../../assets/icons/left-angle.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {visibleItems.filter((index) => index !== undefined && index !== null).map((index, arrayIndex) => renderQuestionNumber(index, arrayIndex))}
          
          <TouchableOpacity
            onPress={handleNext}
            disabled={!canGoRight}
            style={{ opacity: canGoRight ? 1 : 0.3 }}
          >
            <Image
              style={{ width: 20, height: 34 }}
              source={require('../../../assets/icons/right-angle.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
