export interface Lesson {
  id: string;
  title: string;
  type: 'lesson' | 'exam';
  isCompleted: boolean;
  isLocked: boolean;
  isDownloaded: boolean;
  duration?: string;
  order: number;
}

export const lessonsMockData: Lesson[] = [
  {
    id: "1",
    title: "Lesson 1: Understanding Unity's physics system",
    type: 'lesson',
    isCompleted: true,
    isLocked: false,
    isDownloaded: true,
    duration: "5 minutes",
    order: 1
  },
  {
    id: "2",
    title: "Lesson 2: Advanced Physics Concepts",
    type: 'lesson',
    isCompleted: false,
    isLocked: false,
    isDownloaded: false,
    duration: "8 minutes",
    order: 2
  },
  {
    id: "3",
    title: "Lesson 3: Physics Materials and Colliders",
    type: 'lesson',
    isCompleted: false,
    isLocked: false,
    isDownloaded: true,
    duration: "6 minutes",
    order: 3
  },
  {
    id: "4",
    title: "Lesson 4: Rigidbody and Forces",
    type: 'lesson',
    isCompleted: false,
    isLocked: true,
    isDownloaded: false,
    duration: "10 minutes",
    order: 4
  },
  {
    id: "5",
    title: "Exam Chapter",
    type: 'exam',
    isCompleted: false,
    isLocked: true,
    isDownloaded: false,
    order: 5
  }
];

export const getLessonsByChapterId = (chapterId: string): Lesson[] => {
  // For now, return the same lessons for all chapters
  // In a real app, this would fetch from an API based on chapterId
  return lessonsMockData;
};
