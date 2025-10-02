import { memo, useCallback, useMemo } from 'react';
import {
    FlatList,
    FlatListProps,
    ListRenderItem,
    RefreshControl,
    ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

interface OptimizedFlatListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  onRefresh?: () => void;
  refreshing?: boolean;
  estimatedItemSize?: number;
  enableVirtualization?: boolean;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  initialNumToRender?: number;
  updateCellsBatchingPeriod?: number;
  removeClippedSubviews?: boolean;
  scrollEventThrottle?: number;
  onEndReachedThreshold?: number;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  animated?: boolean;
  optimizeForPerformance?: boolean;
}

function OptimizedFlatListComponent<T>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  refreshing = false,
  estimatedItemSize,
  enableVirtualization = true,
  maxToRenderPerBatch = 10,
  windowSize = 10,
  initialNumToRender = 10,
  updateCellsBatchingPeriod = 50,
  removeClippedSubviews = true,
  scrollEventThrottle = 16,
  onEndReachedThreshold = 0.1,
  contentContainerStyle,
  style,
  animated = false,
  optimizeForPerformance = true,
  ...props
}: OptimizedFlatListProps<T>) {
  
  // Memoize data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  // Memoize render item to prevent recreation on every render
  const memoizedRenderItem = useCallback(
    (info: { item: T; index: number; separators: any }) => renderItem(info),
    [renderItem]
  );

  // Memoize key extractor
  const memoizedKeyExtractor = useCallback(
    (item: T, index: number) => keyExtractor(item, index),
    [keyExtractor]
  );

  // Get item layout for better performance (if estimatedItemSize is provided)
  const getItemLayout = useMemo(() => {
    if (!estimatedItemSize) return undefined;
    
    return (data: any, index: number) => ({
      length: estimatedItemSize,
      offset: estimatedItemSize * index,
      index,
    });
  }, [estimatedItemSize]);

  // Refresh control
  const refreshControl = useMemo(() => {
    if (!onRefresh) return undefined;
    
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="#666"
        colors={['#666']}
      />
    );
  }, [onRefresh, refreshing]);

  // Performance optimizations
  const performanceProps = useMemo(() => {
    if (!optimizeForPerformance) return {};

    return {
      removeClippedSubviews,
      maxToRenderPerBatch,
      windowSize,
      initialNumToRender,
      updateCellsBatchingPeriod,
      scrollEventThrottle,
      onEndReachedThreshold,
      disableVirtualization: !enableVirtualization,
      // Additional performance optimizations
      keyboardShouldPersistTaps: 'handled' as const,
      keyboardDismissMode: 'on-drag' as const,
    };
  }, [
    optimizeForPerformance,
    removeClippedSubviews,
    maxToRenderPerBatch,
    windowSize,
    initialNumToRender,
    updateCellsBatchingPeriod,
    scrollEventThrottle,
    onEndReachedThreshold,
    enableVirtualization,
  ]);

  const ListComponent = animated ? Animated.FlatList : FlatList;

  return (
    <ListComponent
      data={memoizedData}
      renderItem={memoizedRenderItem}
      keyExtractor={memoizedKeyExtractor}
      getItemLayout={getItemLayout}
      refreshControl={refreshControl}
      contentContainerStyle={contentContainerStyle}
      style={style}
      showsVerticalScrollIndicator={false}
      {...performanceProps}
      {...props}
    />
  );
}

// Memoize the component to prevent unnecessary re-renders
const OptimizedFlatList = memo(OptimizedFlatListComponent) as <T>(
  props: OptimizedFlatListProps<T>
) => JSX.Element;

export default OptimizedFlatList;
