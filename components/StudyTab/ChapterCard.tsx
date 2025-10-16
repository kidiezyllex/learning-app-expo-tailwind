import { Chapter } from '@/data/chaptersMockData';
import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
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
            style={{ marginBottom: getScaleFactor() * 16, minHeight: getScaleFactor() * 140 }}
            className={`w-full shadow-sm ${cardBgColor}`}
        >
            <View 
            style={{ gap: getScaleFactor() * 28 }}
            className="flex-row flex-1 justify-between items-center p-4 w-full">
                {/* Icon */}
                <View>
                    {isExam ? (
                        <Image
                            source={icons.exam}
                            style={{ width: getScaleFactor() * 44, height: getScaleFactor() * 63 }}
                            resizeMode="contain"
                        />
                    ) : isLocked ? (
                        <Image
                            source={icons.study}
                            style={{ width: getScaleFactor() * 50, height: getScaleFactor() * 40 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={icons.activeStudy}
                            style={{ width: getScaleFactor() * 50, height: getScaleFactor() * 40 }}
                            resizeMode="contain"
                        />
                    )}
                </View>

                {/* Content */}
                <View 
                style={{ maxWidth: getScaleFactor() * 480, width: getScaleFactor() * 480}}
                className="flex-col gap-1 justify-between h-full">
                  <View className='flex-col flex-1 justify-between h-full'>
                      {/* Title Exam*/}
                      {isExam && <Text
                        className={`text-base font-semibold line-clamp-2 ${titleTextColor}`}
                        numberOfLines={2}
                    >
                        {chapter.title}
                    </Text>}
                    {/* Title */}
                    <Text
                        className={`text-base font-semibold line-clamp-2 ${titleTextColor}`}
                        numberOfLines={2}
                    >
                        {isExam ? 'Final Exam' : chapter.title}
                    </Text>

                  </View>
                    {/* Video Count */}
                    {!isExam && chapter.videoCount > 0 && (
                        <View className="flex-row justify-end">
                            <Text
                                className={`text-xs font-medium ${subtitleTextColor}`}
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
                                className={`text-xs font-medium ${subtitleTextColor}`}
                            >
                                {chapter.certificate}
                            </Text>
                        )}

                        {/* Progress Bar */}
                        {!isLocked && !isExam && (
                            <View style={{height: getScaleFactor() * 32, width: getScaleFactor() * 288}} className="justify-center items-center rounded-lg bg-zinc-300">
                                <View
                                    className="absolute h-full bg-blue-500 rounded-lg"
                                    style={{ width: `${chapter.progress}%` }}
                                />
                                {/* Progress Text - Centered in Progress Bar */}
                                <Text
                                    className="z-10 text-xs font-medium text-center text-black"
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
                    source={icons.chevronRight}
                    style={{ width: getScaleFactor() * 10, height: getScaleFactor() * 21 }}
                    resizeMode="contain"
                />
            </View>
        </TouchableOpacity>
    );
}

