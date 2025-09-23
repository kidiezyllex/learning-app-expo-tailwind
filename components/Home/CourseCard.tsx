import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Course } from './mock-data';

interface CourseCardProps {
    course: Course;
    onPress?: (courseId: string) => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
    return (
        <TouchableOpacity
            onPress={() => onPress?.(course.id)}
            className="w-full bg-neutral-100 rounded-[10px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.25)]"
        >
            {/* Thumbnail Image Container */}
            <View className="relative" style={{ height: 225 }}>
                <Image
                    source={course.thumbnail}
                    className="w-full rounded-tl-[10px] rounded-tr-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    resizeMode="cover"
                    style={{ width: '100%', maxWidth: '100%', height: 225 }}
                />

                {/* New Badge */}
                {course.isNew && (
                    <View className="absolute top-4 left-4 w-16 h-7 bg-rose-600 rounded-[5px] justify-center">
                        <Text style={{ fontSize: 16 }} className="font-semibold text-center text-neutral-100">
                            New
                        </Text>
                    </View>
                )}

                {/* Checked */}
                <Image
                    source={require("../../assets/icons/checked.png")}
                    className="absolute top-4 right-4"
                    style={{ width: 28, height: 28}}
                    resizeMode="cover"
                />

                {/* Play/Live Button */}
                <Image
                    source={course.isSave ? require("../../assets/icons/saved.png") : require("../../assets/icons/save.png")}
                    className="absolute bottom-4 left-4"
                    style={{ width: 24, height: 27 }}
                    resizeMode="cover"
                />

                {/* Duration Badge */}
                <View className="flex absolute right-4 bottom-4 flex-row gap-2 justify-center items-center w-20 h-7 rounded-md bg-black/50">
                    <Image
                        source={require("../../assets/icons/clock.png")}
                        style={{ width: 22, height: 22 }}
                        resizeMode="cover"
                    />
                    <Text style={{ fontSize: 16 }} className="font-medium text-neutral-100">
                        {course.duration}
                    </Text>
                </View>
            </View>
            <View className="flex-1 w-full p-[10px] flex flex-col gap-2">
                <Text style={{ fontSize: 22 }} className="font-semibold leading-tight text-black line-clamp-2">
                    {course.title}
                </Text>
                <View className="flex-row items-center w-full">
                    <Text style={{ fontSize: 16 }} className="flex-1 font-medium leading-tight line-clamp-1 text-zinc-600">
                        {course.description}
                    </Text>
                    {/* Rating */}
                    <View className="flex-row items-center">
                        <Image
                            source={require('../../assets/icons/star.png')}
                            style={{ width: 18, height: 18 }}
                            resizeMode="cover"
                        />
                        <Text style={{ fontSize: 16 }} className="font-medium text-black">
                            {course.rating}/5
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
