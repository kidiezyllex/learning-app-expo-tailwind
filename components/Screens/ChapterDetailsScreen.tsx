import ScreenHeader from '@/components/Common/ScreenHeader';
import LessonCard from '@/components/Study/LessonCard';
import { useNavigation } from '@/contexts/NavigationContext';
import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { getLessonsByChapterId } from '@/data/lessonsMockData';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
        <View 
        style={{ paddingTop: 102 }}
        className="flex-1">
            <ScreenHeader 
                title={chapter.title.split(':')[0]}
                handleBackClick={() => setCurrentHomeScreen("course-details")}
                showRightIcons={true}
                firstRightIcon={require('../../assets/icons/download2.png')}
                firstRightIconWidth={28}
                firstRightIconHeight={28}
                handleFirstRightIconClick={() => {}}
            />
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
