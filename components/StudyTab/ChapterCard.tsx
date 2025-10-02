import { Chapter } from '@/data/chaptersMockData';
import { Image, Text, TouchableOpacity, View } from 'react-native';
interface ChapterCardProps {
    chapter: Chapter;
    onPress?: () => void;
}

export default function ChapterCard({ chapter, onPress }: ChapterCardProps) {
    const isLocked = chapter.isLocked;
    const isExam = chapter.type === 'exam';
    const cardBgColor = isLocked ? 'bg-[#DCDCDC]' : 'bg-white';
    const titleTextColor = isLocked ? 'text-zinc-600' : 'text-black';
    const subtitleTextColor = 'text-zinc-600';
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isLocked}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 3,
            }}
            className={`mb-4 w-full min-h-[140px] ${cardBgColor} rounded-[10px]`}
        >
            <View className="flex-row flex-1 gap-7 justify-between items-center px-6 py-4 w-full">
                {/* Icon */}
                <View>
                    {isExam ? (
                        <Image
                            source={require('../../assets/icons/exam.png')}
                            style={{ width: 44, height: 63 }}
                            resizeMode="contain"
                        />
                    ) : isLocked ? (
                        <Image
                            source={require('../../assets/icons/study.png')}
                            style={{ width: 50, height: 40 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={require('../../assets/icons/active-study.png')}
                            style={{ width: 50, height: 40 }}
                            resizeMode="contain"
                        />
                    )}
                </View>

                {/* Content */}
                <View className="flex-col gap-1 justify-between max-w-[480px] w-[480px] h-full">
                  <View className='flex-col flex-1 justify-between h-full'>
                      {/* Title Exam*/}
                      {isExam && <Text
                        className={`font-semibold line-clamp-2 ${titleTextColor}`}
                        style={{ fontSize: 24 }}
                        numberOfLines={2}
                    >
                        {chapter.title}
                    </Text>}
                    {/* Title */}
                    <Text
                        className={`font-semibold line-clamp-2 ${titleTextColor}`}
                        style={{ fontSize: 24 }}
                        numberOfLines={2}
                    >
                        {isExam ? 'Final Exam' : chapter.title}
                    </Text>

                  </View>
                    {/* Video Count */}
                    {!isExam && chapter.videoCount > 0 && (
                        <View className="flex-row justify-end">
                            <Text
                                className={`font-medium ${subtitleTextColor}`}
                                style={{ fontSize: 16 }}
                            >
                                {chapter.videoCount} video
                            </Text>
                        </View>
                    )}

                    {/* Certificate and Progress Bar Row */}
                    <View className="flex-row gap-1 justify-between items-center">
                        {/* Certificate */}
                        {!isExam && (
                            <Text
                                className={`font-medium ${subtitleTextColor}`}
                                style={{ fontSize: 16 }}
                            >
                                {chapter.certificate}
                            </Text>
                        )}

                        {/* Progress Bar */}
                        {!isLocked && !isExam && (
                            <View style={{height: 32}} className="justify-center items-center w-72 rounded-lg bg-zinc-300">
                                <View
                                    className="absolute h-full bg-blue-500 rounded-lg"
                                    style={{ width: `${chapter.progress}%` }}
                                />
                                {/* Progress Text - Centered in Progress Bar */}
                                <Text
                                    className="z-10 font-medium text-center text-black"
                                    style={{ fontSize: 16 }}
                                >
                                    Completed {chapter.progress}%
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Chevron Icon */}
                <Image
                    className='transform scale-125'
                    source={require('../../assets/icons/chevron-right.png')}
                    style={{ width: 10, height: 21 }}
                    resizeMode="contain"
                />
            </View>
        </TouchableOpacity>
    );
}

