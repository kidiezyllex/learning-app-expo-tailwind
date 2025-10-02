import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface SwipeAction {
  id: string;
  title: string;
  backgroundColor: string;
  textColor?: string;
  onPress: (item: any) => void;
  icon?: any;
}

interface SwipeableListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  swipeThreshold?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

interface SwipeableItemProps<T> {
  item: T;
  index: number;
  renderItem: ListRenderItem<T>;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  swipeThreshold: number;
}

function SwipeableItem<T>({
  item,
  index,
  renderItem,
  leftActions = [],
  rightActions = [],
  swipeThreshold,
}: SwipeableItemProps<T>) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(0);

  const executeAction = useCallback((action: SwipeAction) => {
    action.onPress(item);
    // Reset position after action
    translateX.value = withSpring(0);
  }, [item, translateX]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const maxLeftSwipe = leftActions.length * 80;
      const maxRightSwipe = -rightActions.length * 80;
      
      translateX.value = Math.max(
        maxRightSwipe,
        Math.min(maxLeftSwipe, event.translationX)
      );
    })
    .onEnd((event) => {
      const velocity = event.velocityX;
      const translation = event.translationX;
      
      // Determine if we should snap to an action or return to center
      if (Math.abs(velocity) > 500 || Math.abs(translation) > swipeThreshold) {
        if (translation > 0 && leftActions.length > 0) {
          // Swiped right - show left actions
          const actionIndex = Math.min(
            Math.floor(translation / 80),
            leftActions.length - 1
          );
          if (translation > swipeThreshold * 1.5) {
            // Execute action immediately
            runOnJS(executeAction)(leftActions[actionIndex]);
          } else {
            // Snap to action position
            translateX.value = withSpring((actionIndex + 1) * 80);
          }
        } else if (translation < 0 && rightActions.length > 0) {
          // Swiped left - show right actions
          const actionIndex = Math.min(
            Math.floor(Math.abs(translation) / 80),
            rightActions.length - 1
          );
          if (Math.abs(translation) > swipeThreshold * 1.5) {
            // Execute action immediately
            runOnJS(executeAction)(rightActions[actionIndex]);
          } else {
            // Snap to action position
            translateX.value = withSpring(-(actionIndex + 1) * 80);
          }
        } else {
          // Return to center
          translateX.value = withSpring(0);
        }
      } else {
        // Return to center
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const leftActionsStyle = useAnimatedStyle(() => {
    const opacity = translateX.value > 0 ? 1 : 0;
    const scale = translateX.value > 0 ? 1 : 0.8;
    return {
      opacity: withTiming(opacity, { duration: 200 }),
      transform: [{ scale: withSpring(scale) }],
    };
  });

  const rightActionsStyle = useAnimatedStyle(() => {
    const opacity = translateX.value < 0 ? 1 : 0;
    const scale = translateX.value < 0 ? 1 : 0.8;
    return {
      opacity: withTiming(opacity, { duration: 200 }),
      transform: [{ scale: withSpring(scale) }],
    };
  });

  return (
    <Animated.View style={{ position: 'relative' }}>
      {/* Left Actions */}
      {leftActions.length > 0 && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 1,
            },
            leftActionsStyle,
          ]}
        >
          {leftActions.map((action, actionIndex) => (
            <Animated.View
              key={action.id}
              style={{
                width: 80,
                height: '100%',
                backgroundColor: action.backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Action content would go here */}
            </Animated.View>
          ))}
        </Animated.View>
      )}

      {/* Right Actions */}
      {rightActions.length > 0 && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 1,
            },
            rightActionsStyle,
          ]}
        >
          {rightActions.map((action, actionIndex) => (
            <Animated.View
              key={action.id}
              style={{
                width: 80,
                height: '100%',
                backgroundColor: action.backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Action content would go here */}
            </Animated.View>
          ))}
        </Animated.View>
      )}

      {/* Main Item */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle, { zIndex: 2 }]}>
          {renderItem({ item, index, separators: {} as any })}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

export default function SwipeableList<T>({
  data,
  renderItem,
  keyExtractor,
  leftActions,
  rightActions,
  swipeThreshold = 80,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  onRefresh,
  refreshing,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  onEndReached,
  onEndReachedThreshold,
}: SwipeableListProps<T>) {
  const renderSwipeableItem = useCallback(
    (info: { item: T; index: number; separators: any }) => (
      <SwipeableItem
        item={info.item}
        index={info.index}
        renderItem={renderItem}
        leftActions={leftActions}
        rightActions={rightActions}
        swipeThreshold={swipeThreshold}
      />
    ),
    [renderItem, leftActions, rightActions, swipeThreshold]
  );

  const memoizedData = useMemo(() => data, [data]);

  return (
    <FlatList
      data={memoizedData}
      renderItem={renderSwipeableItem}
      keyExtractor={keyExtractor}
      style={style}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      getItemLayout={undefined} // Let FlatList calculate automatically for better performance
    />
  );
}
