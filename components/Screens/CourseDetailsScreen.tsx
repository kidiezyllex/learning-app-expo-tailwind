import TabSelector from '@/components/Common/TabSelector';
import ChaptersTab from '@/components/StudyTab/ChaptersTab';
import CourseInfoTab from '@/components/StudyTab/CourseInfoTab';
import { useCourse } from '@/contexts/CourseContext';
import { useAppNavigation } from '@/contexts/NavigationContext';
import { getCourseDetailById } from '@/data/courseDetailsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ScreenHeader from '../Common/ScreenHeader';

export default function CourseDetailsScreen() {
    const [activeTab, setActiveTab] = useState("course");
    const { selectedCourse } = useCourse();
    const { setCurrentHomeScreen, setSelectedChapterId } = useAppNavigation();
    const courseDetail = selectedCourse ? getCourseDetailById(selectedCourse.id) : null;

    const tabOptions = [
        { id: "course", label: "Course Info", isActive: activeTab === "course" },
        { id: "chapters", label: "Chapters", isActive: activeTab === "chapters" },
        { id: "scores", label: "Scores", isActive: activeTab === "scores" },
    ];

    const handleTabPress = (tabId: string) => {
        if (tabId !== activeTab) {
            setActiveTab(tabId);
        }
    };

    const handleBackPress = () => {
        setCurrentHomeScreen("home");
    };

    if (!selectedCourse || !courseDetail) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-600">Không tìm thấy khóa học</Text>
                <TouchableOpacity
                    onPress={handleBackPress}
                    className="px-4 py-2 mt-4 bg-blue-500 rounded-lg"
                >
                    <Text className="text-white">Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderContent = useCallback(() => {
        switch (activeTab) {
            case "course":
                return courseDetail ? (
                    <CourseInfoTab
                        course={courseDetail}
                        selectedCourse={selectedCourse}
                        onEditPress={() => {
                        }}
                    />
                ) : null;
            case "chapters":
                return (
                    <ChaptersTab
                        courseId={selectedCourse.id}
                        onChapterPress={(chapterId) => {
                            setSelectedChapterId(chapterId);
                            setCurrentHomeScreen("chapter-details");
                        }}
                    />
                );
            case "scores":
                return (
                    <View className="px-4 py-8">
                        <Text
                            className="text-sm text-center text-gray-500"
                        >
                            Scores content coming soon...
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    }, [activeTab, courseDetail, selectedCourse, setSelectedChapterId, setCurrentHomeScreen]);

    const renderHeader = useCallback(() => (
        <View className="px-4">
            <TabSelector
                tabs={tabOptions}
                onTabPress={handleTabPress}
            />
        </View>
    ), [tabOptions, handleTabPress]);

    return (
        <View className="flex-1">
            <ScreenHeader
                title="Course Details"
                handleBackClick={handleBackPress}
            />
            <FlatList
                data={[1]} 
                renderItem={() => renderContent()}
                keyExtractor={() => 'content'}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: getScaleFactor() * 180 }}
                ListHeaderComponent={renderHeader}
                scrollEnabled={activeTab !== "chapters"}
            />
        </View>
    );
}
