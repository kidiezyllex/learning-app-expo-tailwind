import LessonCard from '@/components/Study/LessonCard';
import { useNavigation } from '@/contexts/NavigationContext';
import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { getLessonsByChapterId } from '@/data/lessonsMockData';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ChapterDetailsScreen() {
    const { selectedChapterId, setCurrentHomeScreen } = useNavigation();
    const allChapters = getChaptersByCourseId('1');
    const chapter = allChapters.find(c => c.id === selectedChapterId);
    const lessons = getLessonsByChapterId(selectedChapterId || '');
    if (!chapter) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-600">Không tìm thấy chương học</Text>
                <TouchableOpacity
                    onPress={() => setCurrentHomeScreen("course-details")}
                    className="px-6 py-2 mt-4 bg-blue-500 rounded-lg"
                >
                    <Text className="text-white">Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 pt-[66px]">
            {/* Header */}
            <View className="fixed top-0 right-0 left-0 z-50">
                <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
                    <TouchableOpacity
                        onPress={() => setCurrentHomeScreen("course-details")}
                        className="absolute left-3 z-10"
                    >
                        <Image
                            style={{ width: 69, height: 69 }}
                            source={require('../../assets/icons/left-arrow.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <View className="flex-1 justify-center items-center">
                        <Text className="text-3xl font-medium text-white">
                            {chapter.title.split(':')[0]}
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="absolute right-6"
                    >
                        <Image
                            style={{ width: 28, height: 28 }}
                            source={require('../../assets/icons/download2.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
            >
                {/* Lessons List */}
                <View className="px-6 py-4">
                    {lessons.map((lesson) => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
