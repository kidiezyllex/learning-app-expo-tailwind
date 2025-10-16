import { getScaleFactor } from '@/utils/scaling';
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
        height: isActive ? getScaleFactor() * 140 : getScaleFactor() * 124,
        flexShrink: 0,
        borderTopLeftRadius: isActive ? getScaleFactor() * 32 : 0,
        borderTopRightRadius: isActive ? getScaleFactor() * 32 : 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: isActive ? '#1877F2' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        paddingHorizontal: 0,
      }}
    >
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
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
        className="text-sm font-medium"
        style={{ color: isActive ? '#ffffff' : '#646464' }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
