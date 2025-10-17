import { getScaleFactor } from '@/utils/scaling';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';

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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="w-full bg-white border-t border-stone-300">
        <View className="flex-row items-center" style={{ paddingHorizontal: getScaleFactor() * 32, paddingVertical: getScaleFactor() * 24 }}>
          {/* User Avatar */}
          <Image
            source={require('../../assets/images/sample-avatar.png')}
            style={{ width: getScaleFactor() * 60, height: getScaleFactor() * 60, marginRight: getScaleFactor() * 24 }}
            className="rounded-full"
            resizeMode="cover"
          />

          {/* Input Field */}
          <View
            style={{ maxHeight: getScaleFactor() * 60, backgroundColor: '#F1F1F3', borderRadius: getScaleFactor() * 50, overflow: 'hidden', paddingHorizontal: getScaleFactor() * 12, paddingVertical: getScaleFactor() * 8, marginRight: getScaleFactor() * 12}}
            className="flex-row flex-1 items-center"
          >
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              style={{ paddingRight: getScaleFactor() * 50 }}
              className="flex-1 text-sm font-medium text-black"
            />
             {/* Send Button */}
           <TouchableOpacity
             onPress={handleSend}
             style={{ 
               position: 'absolute', 
               right: getScaleFactor() * 16, 
               top: getScaleFactor() * 16
             }}
           >
            <Image
              source={icons.send}
              style={{ width: getScaleFactor() * 28, height: getScaleFactor() * 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
