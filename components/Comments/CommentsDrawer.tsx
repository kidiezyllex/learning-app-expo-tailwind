import { Comment, commentsMockData } from '@/data/commentsMockData';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';

interface CommentsDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CommentsDrawer({ isVisible, onClose }: CommentsDrawerProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [comments, setComments] = useState<Comment[]>(commentsMockData);

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Handle opening the drawer
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // Handle closing the drawer
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
  }, [onClose]);

  // Handle adding a new comment
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

  // Handle liking a comment
  const handleLikeComment = useCallback((commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    );
  }, []);

  // Render individual comment item
  const renderCommentItem = useCallback(({ item }: { item: Comment }) => (
    <CommentCard 
      comment={item} 
      onLike={handleLikeComment}
    />
  ), [handleLikeComment]);

  // Render the content of the bottom sheet
  const renderContent = () => (
    <BottomSheetView style={{ flex: 1, paddingHorizontal: 16 }}>
      {/* Header */}
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
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={handleClose}
      backgroundStyle={{ backgroundColor: 'white' }}
      handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
    >
      {renderContent()}
    </BottomSheet>
  );
}
