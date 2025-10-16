import { useAppNavigation } from '@/contexts/NavigationContext';
import { VideoData, videoMockData } from '@/data/videoMockData';
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
                <View className="flex relative flex-row px-4 justify-between items-center h-[102px]">
                    <TouchableOpacity
                        onPress={() => setCurrentHomeScreen("chapter-details")}
                        className="absolute left-3 z-10"
                    >
                        <Image
                            style={{ width: 69, height: 69 }}
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
                    gap: 32,
                    bottom: 230,
                    right: 32,
                    zIndex: 20
                }}
            >
                <TouchableOpacity>
                    <Image
                        source={icons.heart}
                        style={{ width: 59, height: 52 }}
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
                        style={{ width: 62, height: 54 }}
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
                        style={{ width: 42, height: 46 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={icons.rotate}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {/* Video Section */}
            <View
                style={{
                    position: 'absolute',
                    top: 102,
                    left: 0,
                    right: 0,
                    bottom: 200,
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
                        height: 410
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
                        gap: 40,
                        zIndex: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={skipBackward}
                    >
                        <MaterialIcons name="replay-10" size={56} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={togglePlayPause}
                    >
                        {isPlaying ? (
                            <MaterialCommunityIcons name="pause" size={72} color="white" />
                        ) : (
                            <MaterialIcons name="play-arrow" size={72} color="white" />
                        )}
                    </TouchableOpacity>

                    {/* Skip Forward 10s */}
                    <TouchableOpacity
                        onPress={skipForward}
                    >
                        <MaterialIcons name="forward-10" size={56} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Progress Bar */}
            <View
                className="absolute w-[95%]"
                style={{
                    bottom: 36,
                    left: '2.5%',
                    zIndex: 20
                }}
            >
                <View
                    className="w-full"
                    style={{
                        height: 4,
                        backgroundColor: '#828282'
                    }}
                >
                    <View
                        style={{
                            height: 4,
                            backgroundColor: '#1877F2',
                            width: `${progress * 100}%`
                        }}
                    />
                </View>
            </View>

            {/* Video Info */}
            <View
                style={{
                    bottom: 52,
                    paddingHorizontal: 32,
                    gap: 24,
                    zIndex: 20
                }}
                className="flex absolute flex-col justify-start w-full">
                <View
                    style={{
                        gap: 24,
                    }}
                    className='flex flex-row items-center'>
                    <Image
                        style={{ width: 86, height: 86 }}
                        source={require('../../assets/images/sample-avatar.png')}
                        resizeMode="contain"
                    />
                    <Text className='text-xl font-semibold text-white' >Mr. Tung Tung Sahur</Text>
                </View>

                <View className='h-[150px] min-h-[150px] w-full'>
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
