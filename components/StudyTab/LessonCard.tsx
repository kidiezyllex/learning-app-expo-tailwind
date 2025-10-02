import { useAppNavigation } from '@/contexts/NavigationContext';
import { Lesson } from '@/data/lessonsMockData';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface LessonCardProps {
    lesson: Lesson;
    onPress?: () => void;
}

export default function LessonCard({ lesson, onPress }: LessonCardProps) {
    const isLocked = lesson.isLocked;
    const isCompleted = lesson.isCompleted;
    const isExam = lesson.type === 'exam';
    const isDownloaded = lesson.isDownloaded;
    const router = useRouter();
    const { setSelectedLessonId, setCurrentHomeScreen } = useAppNavigation();
    const cardBgColor = isLocked ? 'bg-[#DCDCDC]' : 'bg-white';
    const titleTextColor = isLocked ? 'text-zinc-600' : 'text-black';
    const subtitleTextColor = 'text-zinc-600';

    const handlePress = () => {
        console.log('LessonCard pressed:', { 
            lessonId: lesson.id, 
            isExam, 
            isLocked, 
            title: lesson.title 
        });
        
        if (onPress) {
            onPress();
        } else if (!isLocked) {
            if (isExam) {
                console.log('Navigating to history-exam for lesson:', lesson.id);
                setSelectedLessonId(lesson.id);
                setCurrentHomeScreen("history-exam");
            } else {
                console.log('Navigating to video for lesson:', lesson.id);
                setSelectedLessonId(lesson.id);
                setCurrentHomeScreen("video");
            }
        } else {
            console.log('Lesson is locked, cannot navigate');
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={isLocked}
            className={`mb-4 w-full shadow-sm min-h-[140px] ${cardBgColor} rounded-[10px]`}
        >
            <View className="flex-row flex-1 gap-7 justify-between items-center px-[30px] py-5 w-full">
                {/* Icon */}
                <View>
                    {isCompleted ? (
                        <Image
                            source={require('../../assets/icons/check.png')}
                            style={{ width: 48, height: 48 }}
                            resizeMode="contain"
                        />
                    ) : isExam ? (
                        <Image
                            source={require('../../assets/icons/exam.png')}
                            style={{ width: 44, height: 63 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={require('../../assets/icons/video.png')}
                            style={{ width: 50, height: 43 }}
                            resizeMode="contain"
                        />
                    )}
                </View>

                {/* Content */}
                <View className="flex-col gap-1 justify-between max-w-[480px] w-[480px] h-full">
                    {!isExam && <View className='flex-col flex-1 justify-between h-full'>
                        {/* Title */}
                        <Text
                            className={`font-semibold line-clamp-2 ${titleTextColor}`}
                            style={{ fontSize: 24 }}
                            numberOfLines={2}
                        >
                            {lesson.title}
                        </Text>
                    </View>}

                    {/* Duration and Download Status Row */}
                    {!isExam && lesson.duration && <View className="flex-row gap-1 justify-start items-center">
                        <Image
                            source={require('../../assets/icons/clock2.png')}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                        />
                        <Text
                            className={`font-medium ${subtitleTextColor}`}
                            style={{ fontSize: 18 }}
                        >
                            Duration: {lesson.duration}
                        </Text>
                    </View>}

                    {isExam && <View className='flex-col justify-center h-full'>
                        <Text
                        className={`font-semibold line-clamp-2 ${titleTextColor}`}
                        style={{ fontSize: 36 }}
                        numberOfLines={2}
                    >
                        {lesson.title}
                    </Text></View>}
                </View>

                <View className={`flex flex-col  h-full ${isExam ? 'justify-center' : 'justify-start'}`}>
                    <Image
                        source={isDownloaded ? require('../../assets/icons/completed.png') : require('../../assets/icons/download.png')}
                        style={{ width: 28, height: 28 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
