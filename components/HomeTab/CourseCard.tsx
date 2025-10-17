import { getScaleFactor } from '@/utils/scaling';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
import { Course } from './mock-data';

interface CourseCardProps {
    course: Course;
    onPress?: (courseId: string) => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
    return (
        <TouchableOpacity
            onPress={() => onPress?.(course.id)}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
            className="w-full bg-neutral-100 rounded-[5px]"
        >
            {/* Thumbnail Image Container */}
            <View className="relative" style={{ height: getScaleFactor() * 225 }}>
                <View
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 2,
                    }}
                    className="w-full rounded-tl-[5px] rounded-tr-[5px]"
                >
                    <Image
                        source={course.thumbnail}
                        style={{ width: '100%', maxWidth: '100%', height: getScaleFactor() * 225 }}
                        className="w-full rounded-tl-[5px] rounded-tr-[5px]"
                        resizeMode="cover"
                    />
                </View>

                {/* New Badge */}
                {course.isNew && (
                    <View 
                    style={{ width: getScaleFactor() * 64, height: getScaleFactor() * 32, left: getScaleFactor() * 16, top: getScaleFactor() * 16}}
                    className="absolute justify-center bg-rose-600 rounded-[3px]">
                        <Text className="text-xs font-semibold text-center text-neutral-100">
                            New
                        </Text>
                    </View>
                )}

                {/* Checked */}
                <Image
                    source={icons.checked}
                    className="absolute"
                    style={{ width: getScaleFactor() * 32, height: getScaleFactor() * 32, top: getScaleFactor() * 16, right: getScaleFactor() * 16 }}
                    resizeMode="cover"
                />

                {/* Play/Live Button */}
                <Image
                    source={course.isSave ? icons.saved : icons.save}
                    className="absolute"
                    style={{ width: getScaleFactor() * 24, height: getScaleFactor() * 27, bottom: getScaleFactor() * 16, left: getScaleFactor() * 16 }}
                    resizeMode="cover"
                />

                {/* Duration Badge */}
                <View 
                style={{ height: getScaleFactor() * 32, bottom: getScaleFactor() * 16, right: getScaleFactor() * 16 }}
                className="flex absolute flex-row gap-1 justify-center items-center px-1.5 rounded-md bg-black/50">
                    <Image
                        source={icons.clock}
                        style={{ width: getScaleFactor() * 22, height: getScaleFactor() * 22 }}
                        resizeMode="cover"
                    />
                    <Text className="text-xs font-medium text-neutral-100">
                        {course.duration}
                    </Text>
                </View>
            </View>
            <View className="flex flex-col flex-1 gap-1 p-2 w-full">
                <Text className="text-sm font-semibold text-black line-clamp-2">
                    {course.title}
                </Text>
                <View className="flex-row items-center w-full">
                    <Text className="flex-1 text-xs font-medium line-clamp-1 text-zinc-600">
                        {course.description}
                    </Text>
                    {/* Rating */}
                    <View className="flex-row items-center">
                        <Image
                            source={icons.star}
                            style={{ width: getScaleFactor() * 18, height: getScaleFactor() * 18 }}
                            resizeMode="cover"
                        />
                        <Text className="text-xs font-medium text-black">
                            {course.rating}/5
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
