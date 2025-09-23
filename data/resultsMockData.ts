// Mock data for Results Screen

export interface WeekData {
  day: string;
  hours: number;
}

export interface EfficiencyData {
  id: string;
  title: string;
  value: string;
  icon: string;
  color: string;
}

export interface ExerciseResult {
  id: string;
  title: string;
  userName: string;
  score: string;
  avatar: string;
}

// Week chart data (7 days)
export const weekChartData: WeekData[] = [
  { day: "CN", hours: 2.5 },
  { day: "T2", hours: 4.0 },
  { day: "T3", hours: 3.5 },
  { day: "T4", hours: 3.5 },
  { day: "T5", hours: 2.0 },
  { day: "T6", hours: 3.0 },
  { day: "T7", hours: 1.5 }
];

// Efficiency statistics data
export const efficiencyData: EfficiencyData[] = [
  {
    id: "1",
    title: "Tổng thời gian xem",
    value: "45 Giờ",
    icon: "clock",
    color: "blue"
  },
  {
    id: "2", 
    title: "Bài tập của tôi",
    value: "12 bài",
    icon: "book",
    color: "black"
  },
  {
    id: "3",
    title: "Trung bình ngày",
    value: "4.5 hour",
    icon: "chart",
    color: "black"
  }
];

// Exercise results data
export const exerciseResults: ExerciseResult[] = [
  {
    id: "1",
    title: "Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người",
    userName: "User Name",
    score: "93/100",
    avatar: "https://placehold.co/40x40"
  },
  {
    id: "2",
    title: "Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người",
    userName: "User Name", 
    score: "99/100",
    avatar: "https://placehold.co/40x40"
  },
  {
    id: "3",
    title: "Nữ ca sĩ vừa có thông báo mới nhất trên trang cá khiến người",
    userName: "User Name",
    score: "93/100", 
    avatar: "https://placehold.co/40x40"
  }
];
