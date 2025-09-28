export interface Chapter {
  id: string;
  title: string;
  type: 'chapter' | 'exam';
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  videoCount: number;
  certificate: string;
  order: number;
}

export const chaptersMockData: Chapter[] = [
  {
    id: "1",
    title: "Chapter 1: Understanding Unity's physics system",
    type: 'chapter',
    isCompleted: false,
    isLocked: false,
    progress: 0,
    videoCount: 100,
    certificate: "Professional certificate",
    order: 1
  },
  {
    id: "2", 
    title: "Chapter 2: Understanding Unity's physics system",
    type: 'chapter',
    isCompleted: false,
    isLocked: true,
    progress: 0,
    videoCount: 100,
    certificate: "Professional certificate",
    order: 2
  },
  {
    id: "3",
    title: "Chapter 3: Understanding Unity's physics system", 
    type: 'chapter',
    isCompleted: false,
    isLocked: true,
    progress: 0,
    videoCount: 100,
    certificate: "Professional certificate",
    order: 3
  },
  {
    id: "4",
    title: "Understanding Unity's physics system",
    type: 'exam',
    isCompleted: false,
    isLocked: true,
    progress: 0,
    videoCount: 0,
    certificate: "",
    order: 4
  }
];

export const getChaptersByCourseId = (courseId: string): Chapter[] => {
  return chaptersMockData;
};
