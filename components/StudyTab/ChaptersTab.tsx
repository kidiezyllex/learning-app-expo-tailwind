import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import ChapterCard from './ChapterCard';

interface ChaptersTabProps {
  courseId: string;
  onChapterPress?: (chapterId: string) => void;
}

export default function ChaptersTab({ courseId, onChapterPress }: ChaptersTabProps) {
  const chapters = getChaptersByCourseId(courseId);

  const handleChapterPress = useCallback((chapterId: string) => {
    if (onChapterPress) {
      onChapterPress(chapterId);
    } 
  }, [onChapterPress]);

  const renderChapter = useCallback(({ item }: { item: any }) => (
    <ChapterCard
      chapter={item}
      onPress={() => handleChapterPress(item.id)}
    />
  ), [handleChapterPress]);

  return (
    <View className="px-4 py-4">
      <FlatList
        data={chapters}
        renderItem={renderChapter}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      />
    </View>
  );
}
