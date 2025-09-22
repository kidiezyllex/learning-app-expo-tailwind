import TabSelector from '@/components/Common/TabSelector';
import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ChapterDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    
    // Tìm chapter theo ID
    const allChapters = getChaptersByCourseId('1'); // Get all chapters and find by ID
    const chapter = allChapters.find(c => c.id === id);

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
                        Chapter Details
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

                   {/* Overview Tab Content */}
                   {activeTab === "overview" && (
                       <View className="px-6 py-8">
                           <View className="p-6 bg-white rounded-lg shadow-sm">
                               <Text className="mb-4 text-2xl font-bold text-black">
                                   {chapter.title}
                               </Text>
                               
                               <View className="flex-row items-center mb-4">
                                   <Image
                                       source={require('../../assets/icons/study.png')}
                                       style={{ width: 24, height: 24 }}
                                       resizeMode="contain"
                                   />
                                   <Text className="ml-2 text-lg text-gray-600">
                                       {chapter.type === 'exam' ? 'Exam' : 'Chapter'}
                                   </Text>
                               </View>

                               {chapter.videoCount > 0 && (
                                   <View className="flex-row items-center mb-4">
                                       <Image
                                           source={require('../../assets/icons/clock.png')}
                                           style={{ width: 24, height: 24 }}
                                           resizeMode="contain"
                                       />
                                       <Text className="ml-2 text-lg text-gray-600">
                                           {chapter.videoCount} videos
                                       </Text>
                                   </View>
                               )}

                               {chapter.certificate && (
                                   <View className="flex-row items-center mb-4">
                                       <Image
                                           source={require('../../assets/icons/checked.png')}
                                           style={{ width: 24, height: 24 }}
                                           resizeMode="contain"
                                       />
                                       <Text className="ml-2 text-lg text-gray-600">
                                           {chapter.certificate}
                                       </Text>
                                   </View>
                               )}

                               <View className="mt-6">
                                   <Text className="mb-2 text-lg font-semibold text-black">
                                       Progress
                                   </Text>
                                   <View className="w-full h-4 rounded-lg bg-zinc-300">
                                       <View
                                           className="h-full bg-blue-500 rounded-lg"
                                           style={{ width: `${chapter.progress}%` }}
                                       />
                                   </View>
                                   <Text className="mt-1 text-sm text-gray-600">
                                       {chapter.progress}% completed
                                   </Text>
                               </View>

                               <View className="mt-6">
                                   <Text className="mb-2 text-lg font-semibold text-black">
                                       Status
                                   </Text>
                                   <View className="flex-row items-center">
                                       <View className={`w-3 h-3 rounded-full mr-2 ${
                                           chapter.isCompleted ? 'bg-green-500' : 
                                           chapter.isLocked ? 'bg-gray-400' : 'bg-blue-500'
                                       }`} />
                                       <Text className="text-gray-600">
                                           {chapter.isCompleted ? 'Completed' : 
                                            chapter.isLocked ? 'Locked' : 'Available'}
                                       </Text>
                                   </View>
                               </View>
                           </View>
                       </View>
                   )}

                   {/* Videos Tab Content */}
                   {activeTab === "videos" && (
                       <View className="px-6 py-8">
                           <Text 
                               className="text-center text-gray-500"
                               style={{ fontSize: 20 }}
                           >
                               Videos content coming soon...
                           </Text>
                       </View>
                   )}

                   {/* Resources Tab Content */}
                   {activeTab === "resources" && (
                       <View className="px-6 py-8">
                           <Text 
                               className="text-center text-gray-500"
                               style={{ fontSize: 20 }}
                           >
                               Resources content coming soon...
                           </Text>
                       </View>
                   )}
                </View>
            </ScrollView>
        </View>
    );
}
