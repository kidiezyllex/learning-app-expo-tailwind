import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  showRightIcons?: boolean;
  handleBackClick?: () => void;
  firstRightIcon?: any;
  secondRightIcon?: any;
  firstRightIconHeight?: number;
  firstRightIconWidth?: number;
  secondRightIconHeight?: number;
  secondRightIconWidth?: number;
  handleFirstRightIconClick?: () => void;
  handleSecondRightIconClick?: () => void;
}

export default function ScreenHeader({
  title,
  onBack,
  showRightIcons = false,
  handleBackClick,
  firstRightIcon,
  secondRightIcon,
  firstRightIconHeight = 51,
  firstRightIconWidth = 51,
  secondRightIconHeight = 45,
  secondRightIconWidth = 43,
  handleFirstRightIconClick,
  handleSecondRightIconClick
}: ScreenHeaderProps) {
  return (
    <View className="fixed top-0 right-0 left-0 z-50">
      <View
        style={{
          height: getScaleFactor() * 102,
          minHeight: getScaleFactor() * 102,
        }}
        className="flex relative flex-row justify-between items-center px-4 bg-blue-600 shadow-sm">
        {(handleBackClick || onBack) && (
          <TouchableOpacity
            onPress={handleBackClick || onBack}
            className="absolute left-3 z-10"
          >
            <Image style={{ width: getScaleFactor() * 69, height: getScaleFactor() * 69 }}
              source={icons.leftArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-semibold text-white">
            {title}
          </Text>
        </View>

        {showRightIcons && (
          <View style={{ gap: 16 }} className='absolute right-6 flex-row items-center'>
            {firstRightIcon && (
              <TouchableOpacity onPress={handleFirstRightIconClick}>
                <Image
                  style={{ width: firstRightIconWidth, height: firstRightIconHeight }}
                  source={firstRightIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {secondRightIcon && (
              <TouchableOpacity onPress={handleSecondRightIconClick}>
                <Image
                  style={{ width: secondRightIconWidth, height: secondRightIconHeight }}
                  source={secondRightIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
