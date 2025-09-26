import { Comment } from '@/data/commentsMockData';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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
          source={{ uri: comment.avatar }}
          style={{ width: 48, height: 48 }}
          className="mr-4 rounded-full"
          resizeMode="cover"
        />
        
        {/* Comment Content */}
        <View className="flex-1">
          {/* Username and Time */}
          <View className="flex-row items-center mb-2">
            <Text 
              style={{ fontSize: 22 }}
              className="mr-2 font-semibold text-black"
            >
              {comment.username}
            </Text>
            <Text 
              style={{ fontSize: 16 }}
              className="mr-2 font-semibold text-neutral-500"
            >
              .
            </Text>
            <Text 
              style={{ fontSize: 16 }}
              className="font-medium text-neutral-500"
            >
              {comment.timeAgo}
            </Text>
          </View>
          
          {/* Comment Text */}
          <Text 
            style={{ fontSize: 22 }}
            className="mb-2 font-medium leading-6 text-black"
          >
            {comment.content}
          </Text>
          
          {/* Like Button */}
          {comment.likes && (
            <TouchableOpacity 
              onPress={() => onLike?.(comment.id)}
              className="self-end"
            >
              <View 
                style={{ width: 24, height: 24 }}
                className="bg-blue-500 rounded-full"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
