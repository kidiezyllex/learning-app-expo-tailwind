// Mock data for History Exam Screen

export interface AnswerOption {
  id: string;
  text: string;
  isSelected?: boolean;
}

export interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  options: AnswerOption[];
  selectedAnswer?: string;
}

// Mock exam questions data
export const examQuestions: Question[] = [
  {
    id: "1",
    questionNumber: 1,
    questionText: "1 + 1 = ?",
    options: [
      { id: "1a", text: "2" },
      { id: "1b", text: "8888888888888888888888888888888888" },
      { id: "1c", text: "8" },
      { id: "1d", text: "9" }
    ],
    selectedAnswer: "1a"
  },
  {
    id: "2", 
    questionNumber: 2,
    questionText: "22+ 2 + 2 = ?",
    options: [
      { id: "2a", text: "26" },
      { id: "2b", text: "9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999" },
      { id: "2c", text: "8" },
      { id: "2d", text: "9" }
    ],
    selectedAnswer: "2a"
  },
  {
    id: "3",
    questionNumber: 3,
    questionText: "2 + 2 = ?",
    options: [
      { id: "3a", text: "3" },
      { id: "3b", text: "8888888888888888888888888888888888" },
      { id: "3c", text: "8" },
      { id: "3d", text: "9" }
    ]
  }
];
