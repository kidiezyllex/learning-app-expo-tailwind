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
      questionText: "Hãy phân tích các yếu tố ảnh hưởng đến quyết định đầu tư của nhà sáng lập startup trong giai đoạn seed funding",
      answerTemplate: "Các yếu tố chính bao gồm: 1) Thị trường mục tiêu và quy mô, 2) Đội ngũ sáng lập và kinh nghiệm, 3) Sản phẩm/dịch vụ và tính khả thi, 4) Mô hình kinh doanh và khả năng sinh lời, 5) Cạnh tranh và lợi thế cạnh tranh",
      score: "2",
      maxScore: "3",
      feedback: "Câu trả lời đúng trọng tâm và đầy đủ các yếu tố quan trọng. Cần phát huy khả năng phân tích sâu hơn.",
      isGraded: true,
    },
    {
      id: '2',
      questionNumber: 12,
      questionText: "Trình bày chiến lược xây dựng và phát triển đội ngũ cho một startup trong giai đoạn đầu",
      answerTemplate: "Chiến lược xây dựng đội ngũ: 1) Xác định rõ vai trò và kỹ năng cần thiết, 2) Tuyển dụng dựa trên văn hóa và giá trị công ty, 3) Đào tạo và phát triển nhân viên, 4) Xây dựng môi trường làm việc tích cực, 5) Thiết lập hệ thống đánh giá và thưởng phạt công bằng",
      score: "__",
      maxScore: "3",
      feedback: "Câu trả lời cần được đánh giá chi tiết hơn về tính thực tiễn và khả năng áp dụng trong thực tế.",
      isGraded: false,
    },
    {
      id: '3',
      questionNumber: 13,
      questionText: "Phân tích các mô hình kinh doanh phổ biến của startup và ưu nhược điểm của từng mô hình",
      answerTemplate: "Các mô hình kinh doanh chính: 1) Freemium - ưu điểm: thu hút người dùng, nhược điểm: khó chuyển đổi, 2) Subscription - ưu điểm: doanh thu ổn định, nhược điểm: cần duy trì giá trị, 3) Marketplace - ưu điểm: mở rộng nhanh, nhược điểm: phụ thuộc vào cả hai bên, 4) SaaS - ưu điểm: chi phí thấp, nhược điểm: cạnh tranh cao",
      score: "3",
      maxScore: "3",
      feedback: "Phân tích xuất sắc! Hiểu rõ các mô hình kinh doanh và đánh giá toàn diện ưu nhược điểm.",
      isGraded: true,
    },
    {
      id: '4',
      questionNumber: 14,
      questionText: "Trình bày quy trình phát triển sản phẩm MVP (Minimum Viable Product) cho startup",
      answerTemplate: "Quy trình phát triển MVP: 1) Xác định vấn đề cần giải quyết, 2) Nghiên cứu thị trường và đối thủ, 3) Thiết kế giải pháp tối giản, 4) Phát triển prototype, 5) Test với người dùng thực tế, 6) Thu thập feedback và cải tiến, 7) Ra mắt và theo dõi metrics",
      score: "2",
      maxScore: "3",
      feedback: "Quy trình rõ ràng và logic. Cần bổ sung thêm về cách đo lường thành công của MVP.",
      isGraded: true,
    },
    {
      id: '5',
      questionNumber: 15,
      questionText: "Phân tích các nguồn tài chính cho startup và điều kiện để tiếp cận từng nguồn",
      answerTemplate: "Các nguồn tài chính: 1) Bootstrapping - tự tài trợ, 2) Angel investors - cá nhân giàu có, 3) Venture Capital - quỹ đầu tư mạo hiểm, 4) Crowdfunding - gọi vốn cộng đồng, 5) Bank loans - vay ngân hàng. Điều kiện: có ý tưởng rõ ràng, đội ngũ mạnh, thị trường tiềm năng, mô hình kinh doanh khả thi",
      score: "__",
      maxScore: "3",
      feedback: "Cần phân tích sâu hơn về ưu nhược điểm và rủi ro của từng nguồn tài chính.",
      isGraded: false,
    },
    {
      id: '6',
      questionNumber: 16,
      questionText: "Trình bày chiến lược marketing và xây dựng thương hiệu cho startup trong giai đoạn đầu",
      answerTemplate: "Chiến lược marketing: 1) Xác định target audience, 2) Phát triển value proposition, 3) Chọn kênh marketing phù hợp (social media, content marketing, SEO), 4) Xây dựng cộng đồng người dùng, 5) Đo lường và tối ưu hóa. Xây dựng thương hiệu: tạo story, thiết kế nhận diện, duy trì consistency",
      score: "2",
      maxScore: "3",
      feedback: "Chiến lược marketing toàn diện. Cần bổ sung thêm về cách đo lường ROI và hiệu quả marketing.",
      isGraded: true,
    }
  ]
};
