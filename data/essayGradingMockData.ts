export interface EssayGradingItem {
  id: string;
  studentName: string;
  examTitle: string;
  time: string;
  multipleChoiceScore: string;
  essayScore: string;
  totalScore: string;
  isSelected: boolean;
  isGraded: boolean;
}

export const essayGradingMockData: EssayGradingItem[] = [
  {
    id: '1',
    studentName: 'Phoenix Baker',
    examTitle: 'Một công ty chứng khoán muốn rót gần 1.500 tỷ',
    time: '10:30, 23/09/2025',
    multipleChoiceScore: '30/100',
    essayScore: '50/100',
    totalScore: '36/45',
    isSelected: true,
    isGraded: true,
  },
  {
    id: '2',
    studentName: 'Phoenix Baker',
    examTitle: 'Một công ty chứng khoán muốn rót gần 1.500 tỷ',
    time: '10:30, 23/09/2025',
    multipleChoiceScore: '30/100',
    essayScore: 'Chưa chấm',
    totalScore: '__/45',
    isSelected: false,
    isGraded: false,
  },
  {
    id: '3',
    studentName: 'Phoenix Baker',
    examTitle: 'Một công ty chứng khoán muốn rót gần 1.500 tỷ',
    time: '10:30, 23/09/2025',
    multipleChoiceScore: '30/100',
    essayScore: '50/100',
    totalScore: '36/45',
    isSelected: true,
    isGraded: true,
  },
];
