import TabSelector from '@/components/Common/TabSelector';
import ChaptersTab from '@/components/Study/ChaptersTab';
import CourseInfoTab from '@/components/Study/CourseInfoTab';
import { useCourse } from '@/contexts/CourseContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { getCourseDetailById } from '@/data/courseDetailsMockData';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ScreenHeader from '../Common/ScreenHeader';

export default function CourseDetailsScreen() {
    const [activeTab, setActiveTab] = useState("course");
    const { selectedCourse } = useCourse();
    const { setCurrentHomeScreen, setSelectedChapterId } = useNavigation();
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
                    className="px-6 py-2 mt-4 bg-blue-500 rounded-lg"
                >
                    <Text className="text-white">Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View  style={{ paddingTop: 102 }}
        className="flex-1">
            <ScreenHeader
                title="Course Details"
                handleBackClick={handleBackPress}
            />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 180 }}
            >
                {/* Tab Selector */}
                <View className="px-6">
                    <TabSelector
                        tabs={tabOptions}
                        onTabPress={handleTabPress}
                    />
                </View>

                {/* Course Info Tab Content */}
                {activeTab === "course" && courseDetail && (
                    <CourseInfoTab
                        course={courseDetail}
                        selectedCourse={selectedCourse}
                        onEditPress={() => {
                        }}
                    />
                )}

                {/* Chapters Tab Content */}
                {activeTab === "chapters" && (
                    <ChaptersTab
                        courseId={selectedCourse.id}
                        onChapterPress={(chapterId) => {
                            setSelectedChapterId(chapterId);
                            setCurrentHomeScreen("chapter-details");
                        }}
                    />
                )}

                {/* Scores Tab Content */}
                {activeTab === "scores" && (
                    <View className="px-6 py-8">
                        <Text
                            className="text-center text-gray-500"
                            style={{ fontSize: 20 }}
                        >
                            Scores content coming soon...
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
