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

export interface PaginationItem {
  id: string;
  questionNumber: number;
  isCorrect: boolean;
  isCurrent: boolean;
}

export interface QuizResultData {
  quizTitle: string;
  studentName: string;
  questions: QuizQuestion[];
  questionNumbers: number[];
  currentQuestionIndex: number;
  totalQuestions: number;
  paginationItems: PaginationItem[];
}

export const quizResultMockData: QuizResultData = {
  quizTitle: "Game Object - Bài kiểm tra cuối khóa",
  studentName: "Phoenix Baker",
  currentQuestionIndex: 0,
  totalQuestions: 15,
  questionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  paginationItems: [
    { id: '1', questionNumber: 1, isCorrect: false, isCurrent: false },
    { id: '2', questionNumber: 2, isCorrect: true, isCurrent: false },
    { id: '3', questionNumber: 3, isCorrect: false, isCurrent: false },
    { id: '4', questionNumber: 4, isCorrect: true, isCurrent: false },
    { id: '5', questionNumber: 5, isCorrect: true, isCurrent: false },
    { id: '6', questionNumber: 6, isCorrect: false, isCurrent: false },
    { id: '7', questionNumber: 7, isCorrect: true, isCurrent: false },
    { id: '8', questionNumber: 8, isCorrect: false, isCurrent: false },
    { id: '9', questionNumber: 9, isCorrect: true, isCurrent: false },
    { id: '10', questionNumber: 10, isCorrect: false, isCurrent: false },
    { id: '11', questionNumber: 11, isCorrect: true, isCurrent: false },
    { id: '12', questionNumber: 12, isCorrect: false, isCurrent: false },
    { id: '13', questionNumber: 13, isCorrect: true, isCurrent: false },
    { id: '14', questionNumber: 14, isCorrect: false, isCurrent: false },
    { id: '15', questionNumber: 15, isCorrect: true, isCurrent: false },
  ],
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
    },
    {
      id: '2',
      questionNumber: 2,
      questionText: "Câu hỏi thứ 2 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 2 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '3',
      questionNumber: 3,
      questionText: "Câu hỏi thứ 3 - Câu sai",
      explanation: "Đây là câu hỏi thứ 3 và đã trả lời sai",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: true,
        }
      ]
    },
    {
      id: '4',
      questionNumber: 4,
      questionText: "Câu hỏi thứ 4 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 4 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '5',
      questionNumber: 5,
      questionText: "Câu hỏi thứ 5 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 5 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '6',
      questionNumber: 6,
      questionText: "Câu hỏi thứ 6 - Câu sai",
      explanation: "Đây là câu hỏi thứ 6 và đã trả lời sai",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: true,
        }
      ]
    },
    {
      id: '7',
      questionNumber: 7,
      questionText: "Câu hỏi thứ 7 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 7 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '8',
      questionNumber: 8,
      questionText: "Câu hỏi thứ 8 - Câu sai",
      explanation: "Đây là câu hỏi thứ 8 và đã trả lời sai",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: true,
        }
      ]
    },
    {
      id: '9',
      questionNumber: 9,
      questionText: "Câu hỏi thứ 9 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 9 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '10',
      questionNumber: 10,
      questionText: "Câu hỏi thứ 10 - Câu sai",
      explanation: "Đây là câu hỏi thứ 10 và đã trả lời sai",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: true,
        }
      ]
    },
    {
      id: '11',
      questionNumber: 11,
      questionText: "Câu hỏi thứ 11 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 11 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '12',
      questionNumber: 12,
      questionText: "Câu hỏi thứ 12 - Câu sai",
      explanation: "Đây là câu hỏi thứ 12 và đã trả lời sai",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: true,
        }
      ]
    },
    {
      id: '13',
      questionNumber: 13,
      questionText: "Câu hỏi thứ 13 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 13 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    },
    {
      id: '14',
      questionNumber: 14,
      questionText: "Câu hỏi thứ 14 - Câu sai",
      explanation: "Đây là câu hỏi thứ 14 và đã trả lời sai",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: false,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: true,
        }
      ]
    },
    {
      id: '15',
      questionNumber: 15,
      questionText: "Câu hỏi thứ 15 - Câu đúng",
      explanation: "Đây là câu hỏi thứ 15 và đã trả lời đúng",
      answers: [
        {
          id: 'a',
          text: "Đáp án đúng",
          isCorrect: true,
          isSelected: true,
        },
        {
          id: 'b',
          text: "Đáp án sai",
          isCorrect: false,
          isSelected: false,
        }
      ]
    }
  ]
};
