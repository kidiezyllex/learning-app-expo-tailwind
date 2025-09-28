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
            height: 60,
            paddingHorizontal: 70,
          },
          style
        ]}
        className={`bg-[#1877F2] px-[70px] rounded-[10px] justify-center items-center ${
          disabled ? 'opacity-50' : ''}`}
      >
        <Text
          className="font-semibold text-white"
          style={{ fontSize: 24 }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
