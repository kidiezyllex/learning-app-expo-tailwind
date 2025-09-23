import { Image, TouchableOpacity, View } from 'react-native';

interface AvatarProps {
  source: string;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  showBorder?: boolean;
}

export default function Avatar({ 
  source, 
  size = 'medium', 
  onPress, 
  showBorder = false 
}: AvatarProps) {
  const sizeClasses = {
    small: 'w-11 h-11',
    medium: 'w-16 h-16', 
    large: 'w-[100px] h-[100px]'
  };

  return (
    onPress ? (
      <TouchableOpacity onPress={onPress}>
        <Image
          source={require('../../assets/images/sample-avatar.png')}
          className={`${sizeClasses[size]} rounded-full ${showBorder ? 'border-2 border-white' : ''}`}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ) : (
      <View>
        <Image
          source={require('../../assets/images/sample-avatar.png')}
          className={`${sizeClasses[size]} rounded-full ${showBorder ? 'border-2 border-white' : ''}`}
          resizeMode="cover"
        />
      </View>
    )
  );
}
