import { useAppNavigation } from '@/contexts/NavigationContext';
import { VideoData, videoMockData } from '@/data/videoMockData';
import { getScaleFactor } from '@/utils/scaling';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
import CommentsDrawer from '../Comments/CommentsDrawer';

export default function VideoScreen() {
    const { selectedLessonId, setCurrentHomeScreen } = useAppNavigation();
    const [videoData, setVideoData] = useState<VideoData>(videoMockData);
    const [isPlaying, setIsPlaying] = useState(videoData.isPlaying);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isCommentsDrawerVisible, setIsCommentsDrawerVisible] = useState(false);
    const videoRef = useRef<Video>(null);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        setIsPlaying(false);
    }, []);

    if (!selectedLessonId) {
        return (
            <View className="flex-1 justify-center items-center bg-stone-900">
                <Text className="text-lg text-white">Loading video...</Text>
            </View>
        );
    }

    const togglePlayPause = async () => {
        if (videoRef.current) {
            try {
                if (isPlaying) {
                    await videoRef.current.pauseAsync();
                    setIsPlaying(false);
                } else {
                    await videoRef.current.playAsync();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.error('Error toggling play/pause:', error);
            }
        }
    };

    const skipForward = async () => {
        if (videoRef.current) {
            const status = await videoRef.current.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.min(
                    status.positionMillis + 10000,
                    status.durationMillis || 0
                );
                await videoRef.current.setPositionAsync(newPosition);
            }
        }
    };

    const skipBackward = async () => {
        if (videoRef.current) {
            const status = await videoRef.current.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.max(
                    status.positionMillis - 10000,
                    0
                );
                await videoRef.current.setPositionAsync(newPosition);
            }
        }
    };

    const handleOpenComments = () => {
        setIsCommentsDrawerVisible(true);
    };

    const handleCloseComments = () => {
        setIsCommentsDrawerVisible(false);
    };

    return (
        <View className="overflow-hidden relative flex-1 bg-stone-900">
            {/* Header */}
            <View className="fixed top-0 right-0 left-0 z-50">
                <View className="flex relative flex-row justify-between items-center px-4" style={{ height: getScaleFactor() * 102 }}>
                    <TouchableOpacity
                    style={{ left: getScaleFactor() * 12 }}
                        onPress={() => setCurrentHomeScreen("chapter-details")}
                        className="absolute z-10"
                    >
                        <Image
                            style={{ width: getScaleFactor() * 69, height: getScaleFactor() * 69 }}
                            source={icons.leftArrow}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <View className="flex-1 justify-center items-center">
                        <Text
                            className="text-base font-medium text-white">
                            {videoData.title}
                        </Text>
                    </View>
                </View>
            </View>
            {/* Buttons*/}
            <View
                className="flex absolute flex-col justify-center items-center"
                style={{
                    gap: getScaleFactor() * 32,
                    bottom: getScaleFactor() * 230,
                    right: getScaleFactor() * 32,
                    zIndex: 20
                }}
            >
                <TouchableOpacity>
                    <Image
                        source={icons.heart}
                        style={{ width: getScaleFactor() * 59, height: getScaleFactor() * 52 }}
                        resizeMode="contain"
                    />
                    <Text
                        className='text-base font-medium text-center text-white'
                        style={{ marginTop: 4 }}
                    >
                        2.5M
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenComments}>
                    <Image
                        source={icons.comment}
                        style={{ width: getScaleFactor() * 62, height: getScaleFactor() * 54 }}
                        resizeMode="contain"
                    />
                    <Text
                        className='text-base font-medium text-center text-white'
                        style={{ marginTop: 4 }}
                    >
                        300
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={icons.save2}
                        style={{ width: getScaleFactor() * 42, height: getScaleFactor() * 46 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={icons.rotate}
                        style={{ width: getScaleFactor() * 50, height: getScaleFactor() * 50 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {/* Video Section */}
            <View
                style={{
                    position: 'absolute',
                    top: getScaleFactor() * 102,
                    left: 0,
                    right: 0,
                    bottom: getScaleFactor() * 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1
                }}
            >
                <Video
                    ref={videoRef}
                    source={{ uri: 'https://videos.pexels.com/video-files/4017060/4017060-uhd_2560_1440_30fps.mp4' }}
                    style={{
                        width: '100%',
                        height: getScaleFactor() * 410
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={isPlaying}
                    isLooping={true}
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.isLoaded && status.durationMillis) {
                            setProgress(status.positionMillis / status.durationMillis);
                            setDuration(status.durationMillis);
                        }
                    }}
                />

                {/* Video Controls Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: getScaleFactor() * 40,
                        zIndex: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={skipBackward}
                    >
                        <MaterialIcons name="replay-10" size={getScaleFactor() * 56} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={togglePlayPause}
                    >
                        {isPlaying ? (
                            <MaterialCommunityIcons name="pause" size={getScaleFactor() * 72} color="white" />
                        ) : (
                            <MaterialIcons name="play-arrow" size={getScaleFactor() * 72} color="white" />
                        )}
                    </TouchableOpacity>

                    {/* Skip Forward 10s */}
                    <TouchableOpacity
                        onPress={skipForward}
                    >
                        <MaterialIcons name="forward-10" size={getScaleFactor() * 56} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Progress Bar */}
            <View
                className="absolute w-[95%]"
                style={{
                    bottom: getScaleFactor() * 36,
                    left: '2.5%',
                    zIndex: 20
                }}
            >
                <View
                    className="w-full"
                    style={{
                        height: getScaleFactor() * 4,
                        backgroundColor: '#828282'
                    }}
                >
                    <View
                        style={{
                            height: getScaleFactor() * 4,
                            backgroundColor: '#1877F2',
                            width: `${progress * 100}%`
                        }}
                    />
                </View>
            </View>

            {/* Video Info */}
            <View
                style={{
                    bottom: getScaleFactor() * 52,
                    paddingHorizontal: getScaleFactor() * 32,
                    gap: getScaleFactor() * 24,
                    zIndex: 20
                }}
                className="flex absolute flex-col justify-start w-full">
                <View
                    style={{
                        gap: getScaleFactor() * 24,
                    }}
                    className='flex flex-row items-center'>
                    <Image
                        style={{ width: getScaleFactor() * 86, height: getScaleFactor() * 86 }}
                        source={require('../../assets/images/sample-avatar.png')}
                        resizeMode="contain"
                    />
                    <Text className='text-xl font-semibold text-white' >Mr. Tung Tung Sahur</Text>
                </View>

                <View style={{ minHeight: getScaleFactor() * 150, height: getScaleFactor() * 150 }} className='w-full'>
                    <Text
                        className='text-base font-semibold text-white'>Các thành phần chính của báo cáo tài chính năm 2024 là gì? Câu hỏi này đã được giải đáp trong video này.</Text>
                </View>
            </View>
            {/* Comments Drawer */}
            <CommentsDrawer 
                isVisible={isCommentsDrawerVisible}
                onClose={handleCloseComments}
            />
        </View>
    );
}
