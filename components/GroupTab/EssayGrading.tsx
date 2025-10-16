import { EssayGradingItem, essayGradingMockData } from '@/data/essayGradingMockData';
import { getScaleFactor } from '@/utils/scaling';
import Checkbox from 'expo-checkbox';
import { useCallback, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Button from '../Common/Button';

interface EssayGradingProps {
    onNavigateToResult?: (screenType: 'exam' | 'quiz') => void;
}

export default function EssayGrading({ onNavigateToResult }: EssayGradingProps) {
    const initialItems = essayGradingMockData.map(item => ({ ...item, isSelected: false }));
    const [items, setItems] = useState<EssayGradingItem[]>(initialItems);
    const [selectAll, setSelectAll] = useState(false);

    const handleItemSelect = (id: string) => {
        setItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.id === id ? { ...item, isSelected: !item.isSelected } : item
            );
            return updatedItems;
        });
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setItems(prevItems =>
            prevItems.map(item => ({ ...item, isSelected: newSelectAll }))
        );
    };

    const handleCancel = () => {
        setSelectAll(false);
        setItems(prevItems =>
            prevItems.map(item => ({ ...item, isSelected: false }))
        );
    };

    const handleBatchGrading = () => {
        const selectedItems = items.filter(item => item.isSelected);
        if (selectedItems.length > 1) {
            onNavigateToResult?.('exam');
        } else if (selectedItems.length === 1) {
            onNavigateToResult?.('quiz');
        }
    };


    const renderEssayScore = (score: string, isGraded: boolean) => (
        <Text
            className={`font-medium text-xs ${isGraded ? 'underline text-neutral-600' : 'text-blue-600 underline'}`}
        >
            {score}
        </Text>
    );

    const renderEssayItem = useCallback(({ item }: { item: EssayGradingItem }) => (
        <View
            style={{
                gap: getScaleFactor() * 24,
                padding: getScaleFactor() * 30,
            }}
            className="flex-row justify-between items-center w-full bg-white rounded-xl shadow-sm h-fit"
        >
            {/* Checkbox */}
            <Checkbox
                value={item.isSelected}
                onValueChange={() => handleItemSelect(item.id)}
                style={{ width: getScaleFactor() * 32, height: getScaleFactor() * 32 }}
                color="#2563eb"
            />
            <View style={{ gap: getScaleFactor() * 24 }} className="flex-row flex-1 items-start">
                {/* Avatar */}
                <Image
                    source={require('../../assets/images/sample-avatar.png')}
                    style={{ width: getScaleFactor() * 80, height: getScaleFactor() * 80, maxWidth: getScaleFactor() * 80, maxHeight: getScaleFactor() * 80, flexShrink: 0 }}
                    className="rounded-full"
                    resizeMode="contain"
                />

                {/* Content */}
                <View className="flex-1">
                    {/* Student Name and Total Score */}
                    <View className="flex-row justify-between items-center">
                        <Text className="text-base font-semibold text-black">
                            {item.studentName}
                        </Text>
                        <Text className="text-xl font-semibold text-red-600">
                            {item.totalScore}
                        </Text>
                    </View>

                    {/* Exam Title */}
                    <Text className="mb-3 text-xs font-bold text-neutral-600">
                        {item.examTitle}
                    </Text>

                    {/* Time */}
                    <View className="flex-row justify-between items-center mb-2 ml-3">
                        <Text className="mr-2 text-xs italic font-medium text-neutral-600">
                            Thời gian
                        </Text>
                        <Text className="text-xs font-medium text-neutral-600">
                            {item.time}
                        </Text>
                    </View>

                    {/* Scores */}
                    <View className="flex-row justify-between items-center mb-2 ml-3">
                        <Text className="mr-2 text-xs italic font-medium text-neutral-600">
                            Trắc nghiệm
                        </Text>
                        <Text className="text-xs font-medium text-neutral-600">
                            {item.multipleChoiceScore}
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-center ml-3">
                        <Text className="mr-2 text-xs italic font-medium text-neutral-600">
                            Tự luận
                        </Text>
                        {renderEssayScore(item.essayScore, item.isGraded)}
                    </View>
                </View>
            </View>
        </View>
    ), [handleItemSelect, renderEssayScore]);

    const renderHeader = useCallback(() => (
        <View style={{ marginBottom: getScaleFactor() * 40, paddingHorizontal: getScaleFactor() * 20 }} className="flex-row justify-between items-center">
            <TouchableOpacity onPress={handleSelectAll}>
                <Text className="text-sm font-bold text-blue-500 underline">
                    Select All
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel}>
                <Text className="text-sm font-bold text-blue-500 underline">
                    Cancel
                </Text>
            </TouchableOpacity>
        </View>
    ), [handleSelectAll, handleCancel]);

    const renderFooter = useCallback(() => (
        <View style={{ marginTop: getScaleFactor() * 52 }} className="items-center">
            <Button
                text="Batch Grading"
                onPress={handleBatchGrading}
            />
        </View>
    ), [handleBatchGrading]);

    return (
        <View className="w-full">
            <FlatList
                data={items}
                renderItem={renderEssayItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: getScaleFactor() * 40 }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}
