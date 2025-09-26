export interface QuestionResult {
  id: string;
  questionNumber: number;
  questionText: string;
  answerTemplate: string;
  score: string;
  maxScore: string;
  feedback: string;
  isGraded: boolean;
}

export interface ExamResultData {
  examTitle: string;
  studentName: string;
  questions: QuestionResult[];
  questionNumbers: number[];
  currentQuestionIndex: number;
}

export const examResultMockData: ExamResultData = {
  examTitle: "Nhà sáng lập - Bài kiểm tra cuối khóa",
  studentName: "Phoenix",
  currentQuestionIndex: 11,
  questionNumbers: [11, 12, 13, 14, 15, 16],
  questions: [
    {
      id: '1',
      questionNumber: 11,
      questionText: "Một công ty chứng khoán muốn rót gần 1.500 tỷ góp vốn thành lập sàn giao dịch tài sản mã hóa",
      answerTemplate: "Khóa màn hình thiết bị",
      score: "2",
      maxScore: "3",
      feedback: "Câu trả lời đúng trọng tâm. Cần phát huy.",
      isGraded: true,
    },
    {
      id: '2',
      questionNumber: 12,
      questionText: "Một công ty chứng khoán muốn rót gần 1.500 tỷ góp vốn thành lập sàn giao dịch tài sản mã hóa",
      answerTemplate: "aaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      score: "__",
      maxScore: "100",
      feedback: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      isGraded: false,
    }
  ]
};
