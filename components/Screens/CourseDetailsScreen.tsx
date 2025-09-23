import TabSelector from '@/components/Common/TabSelector';
import ChaptersTab from '@/components/Study/ChaptersTab';
import CourseInfoTab from '@/components/Study/CourseInfoTab';
import { useCourse } from '@/contexts/CourseContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { getCourseDetailById } from '@/data/courseDetailsMockData';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function CourseDetailsScreen() {
    const [activeTab, setActiveTab] = useState("course");
    const { selectedCourse } = useCourse();
    const { setCurrentHomeScreen } = useNavigation();
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
        console.log('Back button pressed in CourseDetailsScreen');
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
        <View className="flex-1 pt-[66px]">
            {/* Header */}
            <View className="fixed top-0 right-0 left-0 z-50">
                <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
                    <TouchableOpacity
                        onPress={handleBackPress}
                        className="absolute left-3 z-10"
                    >
                        <Image
                            style={{ width: 69, height: 69 }}
                            source={require('../../assets/icons/left-arrow.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            fontSize: 32
                        }}
                        className="font-medium text-white">
                        Course Details
                    </Text>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
            >
                <View>
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
                                // Handle chapter navigation if needed
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
                </View>
            </ScrollView>
        </View>
    );
}
