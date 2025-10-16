import { Course } from '@/components/HomeTab/mock-data';
import { CourseDetail } from '@/data/courseDetailsMockData';
import { getScaleFactor } from '@/utils/scaling';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
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
            <View className="px-4">
                <View className="flex-row" style={{ gap: getScaleFactor() * 50, marginBottom: getScaleFactor() * 24 }}>
                    {/* Course Thumbnail */}
                    <View className="flex-1">
                        <View className="relative">
                            <Image
                                source={selectedCourse.thumbnail}
                                style={{
                                    width: '100%',
                                    height: getScaleFactor() * 225,
                                    borderRadius: getScaleFactor() * 10
                                }}
                                resizeMode="cover"
                            />
                            {/* Play button overlay */}
                            <Image
                                source={icons.save}
                                className="absolute"
                                style={{ width: getScaleFactor() * 36, height: getScaleFactor() * 44, top: getScaleFactor() * 12, left: getScaleFactor() * 12 }}
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
                                    <View 
                                    style={{ width: getScaleFactor() * 60 }}
                                    className="flex justify-start">
                                        <Image
                                            source={icons.user}
                                            style={{ width: getScaleFactor() * 30, height: getScaleFactor() * 30 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text
                                        className="text-xs font-medium text-black"
                                    >
                                        {course.instructor.name}
                                    </Text>
                                </View>

                                <View className="flex-row items-center mb-2">
                                    <View 
                                    style={{ width: getScaleFactor() * 60 }}
                                    className="flex justify-start">
                                        <Image
                                            source={icons.clock2}
                                            style={{ width: getScaleFactor() * 36, height: getScaleFactor() * 36 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text
                                        className="text-xs font-medium text-black"
                                    >
                                        Duration: {selectedCourse.duration}
                                    </Text>
                                </View>

                                <View className="flex-row items-center mb-5">
                                    <View 
                                    style={{ width: getScaleFactor() * 60 }}
                                    className="flex justify-start">
                                        <Image
                                            source={icons.star}
                                            style={{ width: getScaleFactor() * 34, height: getScaleFactor() * 34 }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text
                                        className="text-xs font-medium text-black"
                                    >
                                        {selectedCourse.rating}/{course.maxRating}
                                    </Text>
                                </View>

                                <View 
                                
                                style={{ width: getScaleFactor() * 200 }}
                                className='flex flex-col gap-2 justify-center items-center'>
                                    <Text
                                        className="text-xl italic font-bold text-black"
                                    >
                                        {course.price}{course.currency}
                                    </Text>

                                    {!course.isPurchased && (
                                        <Pressable
                                            className="bg-blue-600 rounded-[5px] justify-center items-center"
                                            style={{ width: getScaleFactor() * 192, height: getScaleFactor() * 48 }}
                                        >
                                            <Text
                                                className="text-sm font-semibold text-white"
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
                <View style={{ marginBottom: getScaleFactor() * 24 }}>
                    <Text className="text-xl font-semibold text-black"
                    style={{ marginBottom: getScaleFactor() * 16 }}
                    >
                        {selectedCourse.title}
                    </Text>

                    <Text
                        className="text-sm font-medium text-stone-500"
                    >
                        {selectedCourse.description}
                    </Text>
                </View>

                {/* Progress Section */}
                <View className="flex flex-col gap-3 justify-center items-center">
                    <Button text="Edit" onPress={()=>{}} />
                    {!course.isPurchased && (
                        <Text
                            className="text-sm font-medium text-center break-words text-stone-500 text-wrap"
                            style={{ maxWidth: getScaleFactor() * 370 }}
                        >
                            Complete {course.progress}% of the course progress to unlock the assessment feature
                        </Text>
                    )}
                </View>

                {/* Reviews Section */}
                {course.reviews && course.reviews.length > 0 && (
                    <View style={{ marginTop: getScaleFactor() * 24 }}>
                        {course.reviews.map((review) => (
                            <View
                                key={review.id}
                                className="bg-white rounded-[10px] p-4"
                                style={{ marginBottom: getScaleFactor() * 24 }}
                            >
                                <View className="flex-row justify-between items-center" style={{ marginBottom: getScaleFactor() * 12 }}>
                                    <View className="flex-row flex-1 items-center">
                                        <View
                                            className="flex flex-shrink-0 justify-center items-center rounded-full border-2 border-stone-500"
                                            style={{ 
                                                width: getScaleFactor() * 48, 
                                                height: getScaleFactor() * 48, 
                                                minWidth: getScaleFactor() * 48, 
                                                minHeight: getScaleFactor() * 48, 
                                                maxWidth: getScaleFactor() * 48,
                                                maxHeight: getScaleFactor() * 48,
                                                borderRadius: 100,
                                                flexBasis: 48,
                                                marginRight: getScaleFactor() * 12,
                                            }}
                                        >
                                            <Image
                                                source={icons.user}
                                                style={{ width: getScaleFactor() * 31, height: getScaleFactor() * 31 }}
                                                resizeMode="cover"
                                            />
                                        </View>

                                        <View className="flex-1">
                                            <Text
                                                className="text-sm font-medium text-black"
                                            >
                                                {review.user.name}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="flex-row gap-1 items-center">
                                        <Image
                                            source={icons.star}
                                            style={{ width: getScaleFactor() * 33, height: getScaleFactor() * 33 }}
                                            resizeMode="cover"
                                        />
                                        <Text
                                            className="text-sm font-medium text-black"
                                        >
                                            {review.rating}/{review.maxRating}
                                        </Text>
                                    </View>
                                </View>

                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                    <TextInput
                                        className="text-sm font-medium text-neutral-500"
                                        style={{ height: getScaleFactor() * 70 }}
                                        value={review.comment}
                                        multiline={true}
                                        editable={true}
                                        placeholder="Nhập bình luận..."
                                    />
                                </KeyboardAvoidingView>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
