export interface QuizAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  answers: QuizAnswer[];
  explanation: string;
  questionNumber: number;
}

export interface QuizResultData {
  quizTitle: string;
  studentName: string;
  questions: QuizQuestion[];
  questionNumbers: number[];
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const quizResultMockData: QuizResultData = {
  quizTitle: "Game Object - Bài kiểm tra cuối khóa",
  studentName: "Phoenix Baker",
  currentQuestionIndex: 0,
  totalQuestions: 15,
  questionNumbers: [1, 2, 3, 4, 5, 15],
  questions: [
    {
      id: '1',
      questionNumber: 1,
      questionText: "Hành động nào sau đây giúp bảo vệ thiết bị của bạn khỏi người lạ tò mò khi bạn rời đi một chút?",
      explanation: "khi khóa màn hình, người khác mới không thể truy cập vào thiết bị của bạn",
      answers: [
        {
          id: 'a',
          text: "Để màn hình luôn sáng",
          isCorrect: false,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Tắt nguồn thiết bị.",
          isCorrect: false,
          isSelected: false,
        },
        {
          id: 'c',
          text: "Khóa màn hình thiết bị",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'd',
          text: "Mở một ứng dụng bất kỳ",
          isCorrect: false,
          isSelected: false,
        }
      ]
    }
  ]
};
