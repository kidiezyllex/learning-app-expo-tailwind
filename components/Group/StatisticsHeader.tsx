import { Image, Text, View } from 'react-native';

export default function StatisticsHeader() {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999, // Đảm bảo nằm trên cùng
        }}>
            <View className="flex flex-row justify-between items-center h-[96px] px-6 bg-blue-600">
                {/* Back Button */}
                <View className="w-16 h-16 rounded-full border-[5px] border-white items-center justify-center">
                    <View className="w-0 h-5 origin-top-left -rotate-90 rounded-[20px] border-[5px] border-white" />
                    <View className="w-1 h-5 rounded-[20px] border-[5px] border-white" />
                </View>
                
                {/* Title */}
                <Text style={{ fontSize: 24 }} className="font-medium text-white">
                    Group 1
                </Text>
                
                {/* Avatar */}
                <Image
                    source={{ uri: 'https://placehold.co/69x69' }}
                    style={{ width: 64, height: 64 }}
                    className="rounded-full"
                />
            </View>
        </View>
    );
}
