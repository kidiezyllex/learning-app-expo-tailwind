import { getChaptersByCourseId } from '@/data/chaptersMockData';
import { ScrollView, View } from 'react-native';
import ChapterCard from './ChapterCard';

interface ChaptersTabProps {
  courseId: string;
  onChapterPress?: (chapterId: string) => void;
}

export default function ChaptersTab({ courseId, onChapterPress }: ChaptersTabProps) {
  const chapters = getChaptersByCourseId(courseId);

  const handleChapterPress = (chapterId: string) => {
    if (onChapterPress) {
      onChapterPress(chapterId);
    } else {
      console.log('Chapter pressed:', chapterId);
    }
  };

  return (
    <View className="px-6 py-4">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            onPress={() => handleChapterPress(chapter.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
