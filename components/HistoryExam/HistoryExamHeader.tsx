import { Image, Text, View } from 'react-native';

export default function HistoryExamHeader() {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
        }}>
            <View className="flex flex-row justify-between items-center h-[96px] px-6 bg-blue-600">
                <View className="w-16 h-16 rounded-full border-[5px] border-white items-center justify-center">
                    <View className="w-0 h-5 origin-top-left -rotate-90 rounded-[20px] border-[5px] border-white" />
                    <View className="w-1 h-5 rounded-[20px] border-[5px] border-white" />
                </View>
                
                <Text style={{ fontSize: 24 }} className="font-semibold text-white">
                    Final Exam
                </Text>
                
                <Image
                    source={{ uri: 'https://placehold.co/69x69' }}
                    style={{ width: 64, height: 64 }}
                    className="rounded-full"
                />
            </View>
        </View>
    );
}
