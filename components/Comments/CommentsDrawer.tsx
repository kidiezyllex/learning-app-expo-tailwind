import { Comment, commentsMockData } from '@/data/commentsMockData';
import { getScaleFactor } from '@/utils/scaling';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';

interface CommentsDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CommentsDrawer({ isVisible, onClose }: CommentsDrawerProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [comments, setComments] = useState<Comment[]>(commentsMockData);
  const deviceHeight = Dimensions.get('window').height;
  const topInset = 328; 

  const snapPoints = useMemo(() => ['100%'], []); 

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleSendComment = useCallback((newComment: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      username: 'You',
      avatar: '',
      content: newComment,
      timeAgo: 'now',
      likes: 0
    };
    setComments(prev => [comment, ...prev]);
  }, []);

  const handleLikeComment = useCallback((commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    );
  }, []);

  const renderCommentItem = useCallback(({ item }: { item: Comment }) => (
    <CommentCard 
      comment={item} 
      onLike={handleLikeComment}
    />
  ), [handleLikeComment]);

  const renderContent = () => (
    <BottomSheetView style={{ flex: 1}}>
      <View style={{ paddingHorizontal: getScaleFactor() * 28, paddingBottom: getScaleFactor() * 24 }} className="w-full border-b border-b-[#C5C5C5] justify-between flex-row items-center">
        <Text 
          className="text-xl font-semibold text-black"
        >
          Bình luận
        </Text>
        <TouchableOpacity
           onPress={handleClose}
         >
          <Image
            source={icons.close}
            style={{ width: getScaleFactor() * 25, height: getScaleFactor() * 25 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Comments List */}
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getScaleFactor() * 20 }}
        style={{ flex: 1, paddingHorizontal: getScaleFactor() * 28, paddingTop: getScaleFactor() * 24 }}
      />

      {/* Comment Input */}
      <CommentInput onSendComment={handleSendComment} />
    </BottomSheetView>
  );

  // Chỉ render BottomSheet khi isVisible = true
  if (!isVisible) {
    return null;
  }

  return (
    <View style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 9999,
      pointerEvents: 'auto',
    }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={handleClose}
        backgroundStyle={{ backgroundColor: 'white' }}
        handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
        style={{ zIndex: 9999 }} 
        animateOnMount={true}
        enableDynamicSizing={false} 
        topInset={topInset} 
        containerHeight={deviceHeight}
        enableOverDrag={false}
        enableHandlePanningGesture={true}
      >
        {renderContent()}
      </BottomSheet>
    </View>
  );
}