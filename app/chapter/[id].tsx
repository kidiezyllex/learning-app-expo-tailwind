import LessonCard from '@/components/Study/LessonCard';
import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { getLessonsByChapterId } from '@/data/lessonsMockData';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ChapterDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState("overview");
    
    // Tìm chapter theo ID
    const allChapters = getChaptersByCourseId('1'); // Get all chapters and find by ID
    const chapter = allChapters.find(c => c.id === id);
    
    // Get lessons for this chapter
    const lessons = getLessonsByChapterId(id);

    const tabOptions = [
        { id: "overview", label: "Overview", isActive: activeTab === "overview" },
        { id: "videos", label: "Videos", isActive: activeTab === "videos" },
        { id: "resources", label: "Resources", isActive: activeTab === "resources" },
    ];

    const handleTabPress = (tabId: string) => {
        if (tabId !== activeTab) {
            setActiveTab(tabId);
        }
    };

    if (!chapter) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-600">Không tìm thấy chương học</Text>
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
                        Chapter 1
                    </Text>
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
