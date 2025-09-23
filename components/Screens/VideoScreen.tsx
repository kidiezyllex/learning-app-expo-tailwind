import { VideoData, videoMockData } from '@/data/videoMockData';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

export default function VideoScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [videoData, setVideoData] = useState<VideoData>(videoMockData);
    const [isPlaying, setIsPlaying] = useState(videoData.isPlaying);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<Video>(null);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        setIsPlaying(true);
    }, []);

    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const skipForward = async () => {
        if (videoRef.current) {
            const status = await videoRef.current.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.min(
                    status.positionMillis + 10000, // 10 seconds forward
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
                    status.positionMillis - 10000, // 10 seconds backward
                    0
                );
                await videoRef.current.setPositionAsync(newPosition);
            }
        }
    };

    return (
        <View className="overflow-hidden relative w-full h-full bg-stone-900">
            {/* Buttons*/}
            <View
                className="flex absolute flex-col justify-center items-center"
                style={{
                    gap: 32,
                    bottom: 230,
                    right: 32,
                    zIndex: 50
                }}
            >
                <TouchableOpacity className='space-y-1'>
                    <Image
                        source={require('../../assets/icons/heart.png')}
                        style={{ width: 59, height: 52 }}
                        resizeMode="contain"
                    />
                    <Text
                        className='text-center text-white'
                        style={{ fontSize: 24, fontWeight: '500' }}
                    >
                        2.5M
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className='space-y-1'>
                    <Image
                        source={require('../../assets/icons/comment.png')}
                        style={{ width: 62, height: 54 }}
                        resizeMode="contain"
                    />
                    <Text
                        className='text-center text-white'
                        style={{ fontSize: 24, fontWeight: '500' }}
                    >
                        300
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/icons/save2.png')}
                        style={{ width: 42, height: 46 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/icons/rotate.png')}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {/* Header */}
            <View
                className="absolute top-0 right-0 left-0"
                style={{ zIndex: 50 }}
            >
                <View className="flex relative flex-row px-6 justify-between items-center h-[102px]">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute left-3 z-10"
                    >
                        <Image
                            style={{ width: 69, height: 69 }}
                            source={require('../../assets/icons/left-arrow.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <Text
                        style={{ fontSize: 24 }}
                        className="absolute left-1/2 w-full font-medium text-center text-white -translate-x-1/2">
                        {videoData.title}
                    </Text>
                </View>
            </View>

            {/* Video Section */}
            <View 
                className="flex absolute inset-0 top-1/2 justify-center items-center -translate-y-1/2"
            >
                <Video
                    ref={videoRef}
                    source={{ uri: 'https://videos.pexels.com/video-files/4017060/4017060-uhd_2560_1440_30fps.mp4' }}
                    style={{ 
                        width: '100%', 
                        height: '70%' // Chiếm 70% chiều cao màn hình
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={isPlaying}
                    isLooping={true}
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.isLoaded && status.durationMillis) {
                            setProgress(status.positionMillis / status.durationMillis);
                            setDuration(status.durationMillis);
                            // Sync isPlaying state with video's actual playback status
                            if (status.isPlaying !== isPlaying) {
                                setIsPlaying(status.isPlaying);
                            }
                        }
                    }}
                />
                
                {/* Video Controls Overlay */}
                <View 
                    className="absolute flex-row justify-center items-center"
                    style={{
                        gap: 40,
                        zIndex: 10
                    }}
                >
                    {/* Skip Backward 10s */}
                    <TouchableOpacity
                        onPress={skipBackward}
                    >
                        <MaterialIcons name="replay-10" size={56} color="white" />
                    </TouchableOpacity>
                    
                    {/* Play/Pause Button */}
                    <TouchableOpacity
                        onPress={togglePlayPause}
                    >
                        {isPlaying ? (
                            <MaterialCommunityIcons name="pause" size={64} color="white" />
                        ) : (
                            <MaterialIcons name="play-arrow" size={64} color="white" />
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
                className="absolute w-[95%] left-1/2 -translate-x-1/2"
                style={{ bottom: 36 }}
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
                    <Text className='font-semibold text-white' style={{ fontSize: 30 }}>Các thành phần chính của báo cáo tài chính</Text>
                </View>

                <View className='h-[150px] min-h-[150px] w-full'>
                    <Text
                        style={{ fontSize: 24 }}
                        className='font-semibold leading-normal text-white'>Các thành phần chính của báo cáo tài chính năm 2024 là gì? Câu hỏi này đã được giải đáp trong video này.</Text>
                </View>
            </View>
            {/* Progress Bar line */}

        </View>
    );
}
