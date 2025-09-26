import { Course } from '@/components/Home/mock-data';
import { CourseDetail } from '@/data/courseDetailsMockData';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Button from '../Common/Button';

interface CourseInfoTabProps {
    course: CourseDetail;
    selectedCourse: Course;
    onEditPress?: () => void;
}

export default function CourseInfoTab({ course, selectedCourse, onEditPress }: CourseInfoTabProps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
        >
            <View className="px-6">
                <View className="flex-row mb-6" style={{ gap: 50 }}>
                    {/* Course Thumbnail */}
                    <View className="flex-1">
                        <View className="relative">
                            <Image
                                source={selectedCourse.thumbnail}
                                style={{
                                    width: '100%',
                                    height: 225,
                                    borderRadius: 10
                                }}
                                resizeMode="cover"
                            />
                            {/* Play button overlay */}
                            <Image
                                source={require("../../assets/icons/save.png")}
                                className="absolute top-3 left-3"
                                style={{ width: 36, height: 44 }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Instructor Info Section */}
                    <View className="flex-1">
                        <View className="flex-row justify-between items-start">
                            {/* Left side - Instructor info */}
                            <View className="flex-1">
                                <View className="flex-row items-center mb-2">
                                    <View className="w-[60px] flex justify-start">
                                        <Image
                                            source={require('../../assets/icons/user.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text
                                        className="font-medium text-black"
                                        style={{ fontSize: 16 }}
                                    >
                                        {course.instructor.name}
                                    </Text>
                                </View>

                                <View className="flex-row items-center mb-2">
                                    <View className="w-[60px] flex justify-start">
                                        <Image
                                            source={require('../../assets/icons/clock2.png')}
                                            style={{ width: 36, height: 36 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text
                                        className="font-medium text-black"
                                        style={{ fontSize: 16 }}
                                    >
                                        Duration: {selectedCourse.duration}
                                    </Text>
                                </View>

                                <View className="flex-row items-center mb-5">
                                    <View className="w-[60px] flex justify-start">
                                        <Image
                                            source={require('../../assets/icons/star.png')}
                                            style={{ width: 34, height: 34 }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text
                                        className="font-medium text-black"
                                        style={{ fontSize: 16 }}
                                    >
                                        {selectedCourse.rating}/{course.maxRating}
                                    </Text>
                                </View>

                                <View className='w-[200px] flex justify-center items-center flex-col gap-2'>
                                    <Text
                                        className="italic font-bold text-black"
                                        style={{ fontSize: 32 }}
                                    >
                                        {course.price}{course.currency}
                                    </Text>

                                    {!course.isPurchased && (
                                        <Pressable
                                            className="bg-blue-600 rounded-[10px] justify-center items-center"
                                            style={{ width: 192, height: 48 }}
                                        >
                                            <Text
                                                className="font-semibold text-white"
                                                style={{ fontSize: 20 }}
                                            >
                                                Buy now
                                            </Text>
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Course Description */}
                <View className="mb-6">
                    <Text
                        className="mb-4 font-semibold text-black"
                        style={{ fontSize: 32 }}
                    >
                        {selectedCourse.title}
                    </Text>

                    <Text
                        className="font-medium leading-6 text-stone-500"
                        style={{ fontSize: 20 }}
                    >
                        {selectedCourse.description}
                    </Text>
                </View>

                {/* Progress Section */}
                <View className="flex flex-col gap-3 justify-center items-center mb-">
                    <Button text="Edit" onPress={()=>{}} />
                    {!course.isPurchased && (
                        <Text
                            className="font-medium text-center text-stone-500 max-w-[370px] text-wrap break-words"
                            style={{ fontSize: 20 }}
                        >
                            Complete {course.progress}% of the course progress to unlock the assessment feature
                        </Text>
                    )}
                </View>

                {/* Reviews Section */}
                {course.reviews && course.reviews.length > 0 && (
                    <View style={{ marginTop: 24 }}>
                        {course.reviews.map((review) => (
                            <View
                                key={review.id}
                                className="bg-white rounded-[10px] p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-3">
                                    <View className="flex-row flex-1 items-center">
                                        <View
                                            className="flex flex-shrink-0 justify-center items-center mr-3 rounded-full border-2 border-stone-500"
                                            style={{ 
                                                width: 48, 
                                                height: 48, 
                                                minWidth: 48, 
                                                minHeight: 48, 
                                                maxWidth: 48,
                                                maxHeight: 48,
                                                borderRadius: 100,
                                                flexBasis: 48
                                            }}
                                        >
                                            <Image
                                                source={require('../../assets/icons/user.png')}
                                                style={{ width: 31, height: 31 }}
                                                resizeMode="cover"
                                            />
                                        </View>

                                        <View className="flex-1">
                                            <Text
                                                className="font-medium text-black"
                                                style={{ fontSize: 20 }}
                                            >
                                                {review.user.name}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="flex-row gap-2 items-center">
                                        <Image
                                            source={require('../../assets/icons/star.png')}
                                            style={{ width: 33, height: 33 }}
                                            resizeMode="cover"
                                        />
                                        <Text
                                            className="font-medium text-black"
                                            style={{ fontSize: 20 }}
                                        >
                                            {review.rating}/{review.maxRating}
                                        </Text>
                                    </View>
                                </View>

                                <TextInput
                                    className="font-medium text-neutral-500 h-[70px]"
                                    style={{ fontSize: 20 }}
                                    value={review.comment}
                                    multiline={true}
                                    editable={true}
                                    placeholder="Nhập bình luận..."
                                />
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
