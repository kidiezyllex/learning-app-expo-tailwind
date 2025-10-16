import { useAppNavigation } from '@/contexts/NavigationContext';
import { Lesson } from '@/data/lessonsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';

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
        if (onPress) {
            onPress();
        } else if (!isLocked) {
            if (isExam) {
                setSelectedLessonId(lesson.id);
                setCurrentHomeScreen("history-exam");
            } else {
                setSelectedLessonId(lesson.id);
                setCurrentHomeScreen("video");
            }
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
                            source={icons.check}
                            style={{ width: getScaleFactor() * 48, height: getScaleFactor() * 48 }}
                            resizeMode="contain"
                        />
                    ) : isExam ? (
                        <Image
                            source={icons.exam}
                            style={{ width: getScaleFactor() * 44, height: getScaleFactor() * 63 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image  
                            source={icons.video}
                            style={{ width: getScaleFactor() * 50, height: getScaleFactor() * 43 }}
                            resizeMode="contain"
                        />
                    )}
                </View>

                {/* Content */}
                <View className="flex-col gap-1 justify-between max-w-[480px] w-[480px] h-full">
                    {!isExam && <View className='flex-col flex-1 justify-between h-full'>
                        {/* Title */}
                        <Text
                            className={`text-base font-semibold line-clamp-2 ${titleTextColor}`}
                            numberOfLines={2}
                        >
                            {lesson.title}
                        </Text>
                    </View>}

                    {/* Duration and Download Status Row */}
                    {!isExam && lesson.duration && <View className="flex-row gap-1 justify-start items-center">
                        <Image
                            source={icons.clock2}
                            style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                            resizeMode="contain"
                        />
                        <Text
                            className={`text-sm font-medium ${subtitleTextColor}`}
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
                        source={isDownloaded ? icons.completed : icons.download}
                        style={{ width: getScaleFactor() * 28, height: getScaleFactor() * 28 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
