import { User } from '@/data/mockData';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    user: User;
    onNotificationPress?: () => void;
    onAvatarPress?: () => void;
}

export default function Header({ user, onNotificationPress, onAvatarPress }: HeaderProps) {
    return (
        <View className="flex flex-row justify-between items-center px-4 pt-4 pb-4 bg-[#1877F2]">
            {/* User Avatar and Group Name */}
            <View className="flex-row items-center">
                <TouchableOpacity onPress={onAvatarPress}>
                    <Image
                        source={require('../../assets/icons/left-arrow.png')}
                        style={{ width: 46, height: 46 }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                
            </View>
            <Text className="text-xl font-medium text-white">
                    Nhóm 1
                </Text>
            {/* Notification and Settings */}
            <View className="flex-row items-center space-x-3">
                {/* Notification Bell */}
                <TouchableOpacity onPress={onNotificationPress} className="relative">
                    <Image
                        style={{ width: 34, height: 34 }}
                        source={require('../../assets/icons/bell.png')}
                        resizeMode="contain"
                    />
                    {user.notificationCount > 0 && (
                        <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
                    )}
                </TouchableOpacity>

                {/* Settings/Menu Icon */}
                <TouchableOpacity>
                <Image
                        style={{ width: 27, height: 27 }}
                        source={require('../../assets/icons/logout.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
