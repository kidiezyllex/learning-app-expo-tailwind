import TabSelector from '@/components/Common/TabSelector';
import ChaptersTab from '@/components/Course/ChaptersTab';
import CourseInfoTab from '@/components/Course/CourseInfoTab';
import { mockCourses } from '@/components/Home/mock-data';
import { getCourseDetailById } from '@/data/courseDetailsMockData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function CourseDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("course");
    
    // Tìm course theo ID
    const course = mockCourses.find(c => c.id === id);
    const courseDetail = getCourseDetailById(id || '');

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

    if (!course || !courseDetail) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-600">Không tìm thấy khóa học</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="px-6 py-2 mt-4 bg-blue-500 rounded-lg"
                >
                    <Text className="text-white">Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 pt-[102px] pb-32">
            {/* Header */}
            <View className="fixed top-0 right-0 left-0 z-50">
                <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute left-3"
                    >
                        <Image
                            style={{ width: 69, height: 69 }}
                            source={require('../../assets/icons/left-arrow.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <Text className="absolute left-1/2 text-3xl font-medium text-white -translate-x-1/2">
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
                           onEditPress={() => {
                               console.log('Edit course pressed');
                           }}
                       />
                   )}

                   {/* Chapters Tab Content */}
                   {activeTab === "chapters" && (
                       <ChaptersTab 
                           courseId={id || ''}
                           onChapterPress={(chapterId) => {
                               console.log('Chapter pressed:', chapterId);
                               // Navigate to ChapterDetailsScreen
                               router.push(`/chapter/${chapterId}`);
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
