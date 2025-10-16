import { Comment } from '@/data/commentsMockData';
import { Image, Text, View } from 'react-native';

interface CommentCardProps {
  comment: Comment;
  onLike?: (commentId: string) => void;
}

export default function CommentCard({ comment, onLike }: CommentCardProps) {
  return (
    <View className="mb-6 w-full">
      <View className="flex-row items-start">
        {/* Avatar */}
        <Image
           source={require('../../assets/images/sample-avatar.png')}
          style={{ width: 50, height: 50 }}
          className="mr-4 rounded-full"
          resizeMode="cover"
        />
        
        {/* Comment Content */}
        <View className="flex-1">
          {/* Username and Time */}
          <View style={{ gap: 8 }} className="flex-row items-center mb-2">
            <Text 
              style={{ fontSize: 20 }}
              className="font-semibold text-black"
            >
              {comment.username}
            </Text>
            <Text 
              className="text-xs font-semibold text-neutral-500"
            >
              .
            </Text>
            <Text 
              className="text-xs font-medium text-neutral-500"
            >
              {comment.timeAgo}
            </Text>
          </View>
          
          {/* Comment Text */}
          <Text 
            style={{ fontSize: 24 }}
            className="mb-2 font-medium text-black"
          >
            {comment.content}
          </Text>
        </View>
      </View>
    </View>
  );
}
