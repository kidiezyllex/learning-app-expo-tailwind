import { Comment, commentsMockData } from '@/data/commentsMockData';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
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
  const drawerHeight = deviceHeight - 328;
  const snapPoints = useMemo(() => [drawerHeight], [drawerHeight]);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
  }, [onClose]);

  const handleSendComment = useCallback((newComment: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      username: 'You',
      avatar: 'https://placehold.co/50x50',
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
    <BottomSheetView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View className="py-4 w-full">
        <Text 
          style={{ fontSize: 30 }}
          className="font-semibold text-black"
        >
          Bình luận
        </Text>
      </View>

      {/* Comments List */}
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flex: 1 }}
      />

      {/* Comment Input */}
      <CommentInput onSendComment={handleSendComment} />
    </BottomSheetView>
  );

  return (
    <View style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 9999,
      pointerEvents: isVisible ? 'auto' : 'none'
    }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={handleClose}
        backgroundStyle={{ backgroundColor: 'white' }}
        handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
        style={{ zIndex: 9999 }}
      >
        {renderContent()}
      </BottomSheet>
    </View>
  );
}
