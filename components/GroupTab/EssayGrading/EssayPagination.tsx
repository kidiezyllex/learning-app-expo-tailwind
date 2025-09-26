import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';

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
  const panRef = useRef<PanGestureHandler>(null);

  const endIndex = Math.min(startIndex + maxVisibleItems, totalItems);
  const visibleItems = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i + 1);

  const canGoLeft = startIndex > 0;
  const canGoRight = endIndex < totalItems;

  const handlePrevious = () => {
    if (canGoLeft) {
      const newStartIndex = Math.max(0, startIndex - maxVisibleItems);
      setStartIndex(newStartIndex);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      const newStartIndex = Math.min(totalItems - maxVisibleItems, startIndex + maxVisibleItems);
      setStartIndex(newStartIndex);
    }
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === State.END) {
      const threshold = 50; // Minimum swipe distance
      
      if (translationX > threshold && canGoLeft) {
        handlePrevious();
      } else if (translationX < -threshold && canGoRight) {
        handleNext();
      }
    }
  };

  const renderQuestionNumber = (number: number, index: number) => {
    const actualIndex = startIndex + index;
    const isActive = actualIndex === currentIndex;
    
    return (
      <TouchableOpacity
        style={{ height: 40, width: 40, minHeight: 40, minWidth: 40, flexShrink: 0 }}
        key={number}
        onPress={() => onItemSelect(actualIndex)}
        className={`rounded-full flex justify-center items-center border-[2px] bg-[#E5E5E5] ${
          isActive ? 'border-[#626262]' : 'border-transparent'
        }`}
      >
        <Text
          style={{ fontSize: 16 }}
          className="font-medium text-center text-[#626262]"
        >
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <View className="flex-row justify-center items-center" style={{ gap: 20 }}>
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
        
        {visibleItems.map((number, index) => renderQuestionNumber(number, index))}
        
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
    </PanGestureHandler>
  );
}
