import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function AbsoluteHeader() {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999, // Đảm bảo nằm trên cùng
        }}>
            <View className="flex flex-row justify-between items-center h-[102px] px-6 bg-[#1877F2]">
             
                <Text className="text-3xl font-medium text-white">
                        Nhóm 1
                    </Text>
                {/* Notification and Settings */}
                <View className="flex-row items-center space-x-3">
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
        </View>
    );
}
