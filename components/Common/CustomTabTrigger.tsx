import { Image, Pressable, Text, View } from 'react-native';

interface CustomTabTriggerProps {
  isActive: boolean;
  onPress: () => void;
  icon: any;
  label: string;
  iconSize: number;
}

export default function CustomTabTrigger({
  isActive,
  onPress,
  icon,
  label,
  iconSize
}: CustomTabTriggerProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: isActive ? 140 : 124,
        flexShrink: 0,
        borderTopLeftRadius: isActive ? 32 : 0,
        borderTopRightRadius: isActive ? 32 : 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: isActive ? '#1877F2' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        margin: 0,
        paddingHorizontal: 0,
      }}
    >
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}>
        <Image
          source={icon}
          style={{
            width: iconSize,
            height: iconSize,
            tintColor: isActive ? '#ffffff' : '#646464',
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: isActive ? '#ffffff' : '#646464',
            marginTop: 4,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
