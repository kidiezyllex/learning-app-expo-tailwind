import ScreenHeader from '@/components/Common/ScreenHeader';
import LessonCard from '@/components/StudyTab/LessonCard';
import { useAppNavigation } from '@/contexts/NavigationContext';
import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { getLessonsByChapterId } from '@/data/lessonsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';

export default function ChapterDetailsScreen() {
    const { selectedChapterId, setCurrentHomeScreen } = useAppNavigation();
    const allChapters = getChaptersByCourseId('1');
    const chapter = allChapters.find(c => c.id === selectedChapterId);
    const lessons = getLessonsByChapterId(selectedChapterId || '');
    if (!chapter) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-600">Không tìm thấy chương học</Text>
                <TouchableOpacity
                    onPress={() => setCurrentHomeScreen("course-details")}
                    className="px-4 py-2 mt-4 bg-blue-500 rounded-lg"
                >
                    <Text className="text-white">Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderLesson = useCallback(({ item }: { item: any }) => (
        <LessonCard lesson={item} />
    ), []);

    return (
        <View className="flex-1">
            <ScreenHeader 
                title={chapter.title.split(':')[0]}
                handleBackClick={() => setCurrentHomeScreen("course-details")}
                showRightIcons={true}
                firstRightIcon={icons.download2}
                firstRightIconWidth={getScaleFactor() * 28}
                firstRightIconHeight={getScaleFactor() * 28}
                handleFirstRightIconClick={() => {}}
            />
            {/* Scrollable Content */}
            <FlatList
                data={lessons}
                renderItem={renderLesson}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}
