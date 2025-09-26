import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

interface CommentInputProps {
  onSendComment: (comment: string) => void;
  placeholder?: string;
}

export default function CommentInput({ 
  onSendComment, 
  placeholder = "Thêm bình luận" 
}: CommentInputProps) {
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      onSendComment(comment.trim());
      setComment('');
    }
  };

  return (
    <View className="w-full bg-white border-t border-stone-300">
      <View className="flex-row items-center p-4">
        {/* User Avatar */}
        <Image
          source={{ uri: 'https://placehold.co/50x50' }}
          style={{ width: 48, height: 48 }}
          className="mr-4 rounded-full"
          resizeMode="cover"
        />
        
        {/* Input Field */}
        <View 
          style={{ width: '75%' }}
          className="bg-zinc-100 rounded-[38.5px] px-5 py-3 mr-4"
        >
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            style={{ fontSize: 20 }}
            className="font-medium text-black"
            multiline
            maxLength={500}
          />
        </View>
        
        {/* Send Button */}
        <TouchableOpacity 
          onPress={handleSend}
          className="w-5 h-5 bg-blue-500 rounded-full"
        />
      </View>
    </View>
  );
}
