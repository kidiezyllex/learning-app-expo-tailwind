import { getScaleFactor } from '@/utils/scaling';
import { Pressable, Text, View, ViewStyle } from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({ text, onPress, disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          {
            height: getScaleFactor() * 60,
            paddingHorizontal: getScaleFactor() * 70,
            borderRadius: getScaleFactor() * 10,
          },
          style
        ]}
        className={`bg-[#1877F2] justify-center items-center ${
          disabled ? 'opacity-50' : ''}`}
      >
        <Text
          className="text-base font-semibold text-white"
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
