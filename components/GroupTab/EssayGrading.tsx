import { EssayGradingItem, essayGradingMockData } from '@/data/essayGradingMockData';
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
            style={{ fontSize: 12 }}
            className={`font-medium ${isGraded ? 'underline text-neutral-600' : 'text-blue-600 underline'}`}
        >
            {score}
        </Text>
    );

    const renderEssayItem = useCallback(({ item }: { item: EssayGradingItem }) => (
        <View
            style={{
                gap: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 5,
            }}
            className="w-full flex-row items-center justify-between h-fit rounded-xl p-[30px] bg-white"
        >
            {/* Checkbox */}
            <Checkbox
                value={item.isSelected}
                onValueChange={() => handleItemSelect(item.id)}
                style={{ width: 32, height: 32 }}
                color="#2563eb"
            />
            <View style={{ gap: 24 }} className="flex-row flex-1 items-start">
                {/* Avatar */}
                <Image
                    source={require('../../assets/images/sample-avatar.png')}
                    style={{ width: 80, height: 80, maxWidth: 80, maxHeight: 80, flexShrink: 0 }}
                    className="rounded-full"
                    resizeMode="contain"
                />

                {/* Content */}
                <View className="flex-1">
                    {/* Student Name and Total Score */}
                    <View className="flex-row justify-between items-center">
                        <Text style={{ fontSize: 24 }} className="font-semibold text-black">
                            {item.studentName}
                        </Text>
                        <Text style={{ fontSize: 32 }} className="font-semibold text-red-600">
                            {item.totalScore}
                        </Text>
                    </View>

                    {/* Exam Title */}
                    <Text style={{ fontSize: 14 }} className="mb-3 font-bold text-neutral-600">
                        {item.examTitle}
                    </Text>

                    {/* Time */}
                    <View className="flex-row justify-between items-center mb-2 ml-3">
                        <Text style={{ fontSize: 14 }} className="mr-2 italic font-medium text-neutral-600">
                            Thời gian
                        </Text>
                        <Text style={{ fontSize: 14 }} className="font-medium text-neutral-600">
                            {item.time}
                        </Text>
                    </View>

                    {/* Scores */}
                    <View className="flex-row justify-between items-center mb-2 ml-3">
                        <Text style={{ fontSize: 14 }} className="mr-2 italic font-medium text-neutral-600">
                            Trắc nghiệm
                        </Text>
                        <Text style={{ fontSize: 14 }} className="font-medium text-neutral-600">
                            {item.multipleChoiceScore}
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-center ml-3">
                        <Text style={{ fontSize: 14 }} className="mr-2 italic font-medium text-neutral-600">
                            Tự luận
                        </Text>
                        {renderEssayScore(item.essayScore, item.isGraded)}
                    </View>
                </View>
            </View>
        </View>
    ), [handleItemSelect, renderEssayScore]);

    const renderHeader = useCallback(() => (
        <View style={{ marginBottom: 40 }} className="flex-row justify-between items-center px-5">
            <TouchableOpacity onPress={handleSelectAll}>
                <Text style={{ fontSize: 20 }} className="font-bold text-blue-500 underline">
                    Select All
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel}>
                <Text style={{ fontSize: 20 }} className="font-bold text-blue-500 underline">
                    Cancel
                </Text>
            </TouchableOpacity>
        </View>
    ), [handleSelectAll, handleCancel]);

    const renderFooter = useCallback(() => (
        <View style={{ marginTop: 52 }} className="items-center">
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
                contentContainerStyle={{ gap: 40 }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}
