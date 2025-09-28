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
          source={require('../../assets/images/sample-avatar.png')}
          style={{ width: 50, height: 50, marginRight: 24 }}
          className="rounded-full"
          resizeMode="cover"
        />

        {/* Input Field */}
        <View
          style={{ maxHeight: 51}}
          className="flex-1 flex-row items-center rounded-[38.5px] px-5 py-3 mr-4"
        >
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            style={{ fontSize: 20, paddingRight: 50 }}
            className="flex-1 font-medium text-black"
          />
           {/* Send Button */}
         <TouchableOpacity
           onPress={handleSend}
           style={{ 
             position: 'absolute', 
             right: 16, 
             top: 16
           }}
         >
          <Image
            source={require('../../assets/icons/send.png')}
            style={{ width: 22, height: 19 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
