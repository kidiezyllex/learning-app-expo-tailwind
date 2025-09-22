import { VideoData, videoMockData } from '@/data/videoMockData';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function VideoScreen() {
  const [videoData, setVideoData] = useState<VideoData>(videoMockData);
  const [isPlaying, setIsPlaying] = useState(videoData.isPlaying);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setVideoData(prev => ({ ...prev, isPlaying: !isPlaying }));
  };

  const handleBack = () => {
    router.back();
  };

  const handleVolumeToggle = () => {
    setVideoData(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  return (
    <View className="overflow-hidden relative w-full h-full bg-stone-900">
      {/* Header */}
      <View className="w-full h-[100px] absolute top-0 left-0 z-10">
        <View className="w-[85%] h-[80px] left-[7.5%] top-[25px] absolute justify-center">
          <Text 
            className="font-semibold text-center text-white"
            style={{ fontSize: 22 }}
            numberOfLines={2}
          >
            {videoData.title}
          </Text>
        </View>
      </View>

      {/* Video Thumbnail */}
      <View className="w-full h-[411px] left-0 top-[100px] absolute">
        <Image
          source={{ uri: videoData.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Play/Pause Button Overlay */}
        <TouchableOpacity
          onPress={handlePlayPause}
          className="absolute w-[80px] h-[80px] left-[50%] top-[50%] -translate-x-10 -translate-y-10"
        >
          <Image
            source={isPlaying ? require('../../assets/icons/video.png') : require('../../assets/icons/video.png')}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Video Controls */}
      <View className="w-full h-[200px] left-0 top-[511px] absolute">
        {/* Time Display */}
        <View className="w-[80px] h-[32px] left-[94px] top-[18px] absolute justify-center">
          <Text 
            className="font-semibold text-center text-white"
            style={{ fontSize: 22 }}
          >
            {videoData.currentTime}
          </Text>
        </View>

        <View className="w-[80px] h-[32px] left-[549px] top-[18px] absolute justify-center">
          <Text 
            className="font-semibold text-center text-white"
            style={{ fontSize: 22 }}
          >
            {videoData.duration}
          </Text>
        </View>

        {/* Volume Controls */}
        <View className="w-[80px] h-[80px] left-[625px] top-[10px] absolute">
          <TouchableOpacity onPress={handleVolumeToggle}>
            <Image
              source={videoData.isMuted ? require('../../assets/icons/bell.png') : require('../../assets/icons/bell.png')}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Volume Indicator */}
        <View className="w-[56px] h-[56px] left-[629px] top-[80px] absolute rounded-2xl border-[3px] border-white justify-center items-center">
          <View className="w-[20px] h-[20px] rounded-full border-2 border-white" />
        </View>

        {/* Volume Dots */}
        <View className="w-[40px] h-[8px] left-[630px] top-[118px] absolute flex-row justify-between">
          <View className="w-[10px] h-[10px] rounded-full border-2 border-white" />
          <View className="w-[10px] h-[10px] rounded-full border-2 border-white" />
          <View className="w-[10px] h-[10px] rounded-full border-2 border-white" />
        </View>

        {/* Play/Pause Button */}
        <View className="w-[56px] h-[44px] left-[636px] top-[203px] absolute border-[3px] border-white rounded justify-center items-center">
          <View className="w-[20px] h-[6px] rounded border-2 border-white" />
        </View>
      </View>

      {/* Video Info */}
      <View className="w-full h-[200px] left-0 top-[711px] absolute">
        {/* Title */}
        <View className="w-[96%] h-[144px] left-[2%] top-[28px] absolute">
          <Text 
            className="font-semibold text-white"
            style={{ fontSize: 22 }}
            numberOfLines={3}
          >
            {videoData.title}
          </Text>
        </View>

        {/* Stats */}
        <View className="w-[200px] h-[28px] left-[631px] top-[34px] absolute">
          <Text 
            className="font-medium text-white"
            style={{ fontSize: 22 }}
          >
            {videoData.views}
          </Text>
        </View>

        <View className="w-[200px] h-[28px] left-[635px] top-[150px] absolute">
          <Text 
            className="font-medium text-white"
            style={{ fontSize: 22 }}
          >
            {videoData.likes}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-[20px] left-0 top-[1232px] absolute">
        {/* Background Progress Bar */}
        <View className="w-[95%] h-[4px] left-[2.5%] top-[8px] absolute opacity-50 bg-white rounded-[38px]" />
        
        {/* Active Progress Bar */}
        <View 
          className="h-[4px] left-[2.5%] top-[8px] absolute opacity-80 bg-blue-600 rounded-[38px]"
          style={{ width: `${videoData.progress}%` }}
        />
      </View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={handleBack}
        className="absolute w-[80px] h-[80px] left-[32px] top-[976px]"
      >
        <Image
          source={require('../../assets/icons/left-arrow.png')}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Bottom Info Card */}
      <View className="w-[144px] h-[176px] left-0 top-[1140px] absolute rounded-[32px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.42)] bg-gray-800">
        <View className="w-[64px] h-[64px] left-[21px] top-[13px] absolute">
          <Image
            source={require('../../assets/icons/video.png')}
            style={{ width: 64, height: 64 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}
