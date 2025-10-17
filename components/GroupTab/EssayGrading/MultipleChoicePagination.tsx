import { getScaleFactor } from '@/utils/scaling';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import { icons } from '../../../assets/icons/icons';

export interface PaginationItem {
  id: string;
  questionNumber: number;
  isCorrect: boolean;
  isCurrent: boolean;
}

interface MultipleChoicePaginationProps {
  items: PaginationItem[];
  onItemSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function MultipleChoicePagination({
  items,
  onItemSelect,
  onPrevious,
  onNext,
}: MultipleChoicePaginationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil((items.length - 1) / itemsPerPage));

  const getVisibleItems = () => {
    if (items.length <= 6) {
      return items.map((item, index) => ({ item, originalIndex: index }));
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length - 1);
    
    const visibleItems = [];
    
    for (let i = startIndex; i < endIndex; i++) {
      visibleItems.push({ item: items[i], originalIndex: i });
    }
    
    if (endIndex < items.length - 1) {
      visibleItems.push({ item: null, originalIndex: -1 });
    }
    
    visibleItems.push({ item: items[items.length - 1], originalIndex: items.length - 1 });
    
    return visibleItems;
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    onPrevious();
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
    onNext();
  };

  const handleItemPress = (originalIndex: number) => {
    if (originalIndex >= 0) {
      onItemSelect(originalIndex);
    }
  };

  const getItemStyle = (item: PaginationItem | null) => {
    if (!item) {
      return {
        containerStyle: {
          width: getScaleFactor() * 60,
          height: getScaleFactor() * 60,
          borderRadius: 100,
          backgroundColor: 'transparent',
          justifyContent: 'center' as const,
          alignItems: 'center' as const,
        },
        textStyle: {
          fontSize: getScaleFactor() * 24,
          fontWeight: 'bold' as const,
          textAlign: 'center' as const,
          color: '#3F93EA',
        },
      };
    }

    const { isCorrect, isCurrent } = item;
    
    if (isCurrent) {
      return {
        containerStyle: {
          width: getScaleFactor() * 60,
          height: getScaleFactor() * 60,
          borderRadius: 100,
          backgroundColor: '#FFD3D3',
          borderWidth: 1,
          borderColor: '#428AE7',
          justifyContent: 'center' as const,
          alignItems: 'center' as const,
        },
        textStyle: {
          fontSize: getScaleFactor() * 20,
          fontWeight: 'bold' as const,
          textAlign: 'center' as const,
          color: '#F21818',
        },
      };
    } else if (isCorrect) {
      return {
        containerStyle: {
          width: getScaleFactor() * 60,
          height: getScaleFactor() * 60,
          borderRadius: 100,
          backgroundColor: '#C0F0BF',
          borderWidth: 1,
          borderColor: '#C0F0BF',
          justifyContent: 'center' as const,
          alignItems: 'center' as const,
        },
        textStyle: {
          fontSize: getScaleFactor() * 20,
          fontWeight: 'bold' as const,
          textAlign: 'center' as const,
          color: '#1DBA2D',
        },
      };
    } else {
      return {
        containerStyle: {
          width: getScaleFactor() * 60,
          height: getScaleFactor() * 60,
          borderRadius: 100,
          backgroundColor: '#FFD3D3',
          borderWidth: 1,
          borderColor: '#FFD3D3',
          justifyContent: 'center' as const,
          alignItems: 'center' as const,
        },
        textStyle: {
          fontSize: getScaleFactor() * 20,
          fontWeight: 'bold' as const,
          textAlign: 'center' as const,
          color: '#F21818',
        },
      };
    }
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const threshold = 50;
      
      if (translationX > threshold) {
        handlePrevious();
      } else if (translationX < -threshold) {
        handleNext();
      }
    }
  };

  const visibleItems = getVisibleItems();

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: getScaleFactor() * 28,
        gap: getScaleFactor() * 20 
      }}>
        <TouchableOpacity onPress={handlePrevious} disabled={currentPage === 0}>
          <Image
            style={{ 
              width: getScaleFactor() * 20, 
              height: getScaleFactor() * 34,
              opacity: currentPage === 0 ? 0.5 : 1
            }}
            source={icons.leftAngle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        {visibleItems.map(({ item, originalIndex }, index) => {
          const style = getItemStyle(item);
          
          if (!item) {
            return (
              <View key={`dots-${index}`} style={style.containerStyle}>
                <Text style={style.textStyle}>
                  ...
                </Text>
              </View>
            );
          }
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleItemPress(originalIndex)}
              style={style.containerStyle}
            >
              <Text style={style.textStyle}>
                {item.questionNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
        
        <TouchableOpacity onPress={handleNext} disabled={currentPage === totalPages - 1}>
          <Image
            style={{ 
              width: getScaleFactor() * 20, 
              height: getScaleFactor() * 34,
              opacity: currentPage === totalPages - 1 ? 0.5 : 1
            }}
            source={icons.rightAngle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </PanGestureHandler>
  );
}
