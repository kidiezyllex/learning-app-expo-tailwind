import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  showRightIcons?: boolean;
}

export default function ScreenHeader({ title, onBack, showRightIcons = false }: ScreenHeaderProps) {
  return (
    <View className="fixed top-0 right-0 left-0 z-50">
      <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-blue-600 shadow-[0px_0px_0px_0px_rgba(0,0,0,0.25)]">
        <TouchableOpacity
          onPress={onBack}
          className="absolute left-3 z-10"
        >
          <Image
            style={{ width: 69, height: 69 }}
            source={require('../../assets/icons/left-arrow.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1 justify-center items-center">
          <Text
            style={{ fontSize: 36 }}
            className="font-semibold text-white">
            {title}
          </Text>
        </View>

        {showRightIcons && (
          <View style={{ gap: 16 }} className='absolute right-6 flex-row items-center'>
            <TouchableOpacity>
              <Image
                style={{ width: 51, height: 51 }}
                source={require('../../assets/icons/bell.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ width: 43, height: 45 }}
                source={require('../../assets/icons/setting.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
