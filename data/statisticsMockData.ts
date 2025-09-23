// Mock data for Statistics Screen

export interface LearningTimeData {
  totalTime: string;
  averageTime: string;
  topLearner: string;
}

export interface UserLearningData {
  id: string;
  rank: number;
  totalTime: string;
  averageTime: string;
  name: string;
  avatar: string;
}

export interface CourseStatistics {
  id: string;
  title: string;
  description: string;
  thumbnail: any;
  rating: number;
  duration: string;
  completionRate: number;
  isNew?: boolean;
  isLive?: boolean;
  isSave?: boolean;
}

// Learning time statistics
export const learningTimeData: LearningTimeData = {
  totalTime: "32 hrs 16 min",
  averageTime: "3 hrs 6 min (per day)",
  topLearner: "John..."
};

// User learning data for leaderboard
export const userLearningData: UserLearningData[] = [
  {
    id: "1",
    rank: 1,
    totalTime: "8hrs 4min",
    averageTime: "1hrs 4min",
    name: "Long name 123456767",
    avatar: "https://placehold.co/24x24"
  },
  {
    id: "2",
    rank: 2,
    totalTime: "6hrs 43min",
    averageTime: "2hrs 1min",
    name: "Long name 123456767",
    avatar: "https://placehold.co/24x24"
  },
  {
    id: "3",
    rank: 3,
    totalTime: "5hrs 1min",
    averageTime: "0hrs 15min",
    name: "Long name 123456767",
    avatar: "https://placehold.co/24x24"
  }
];

// Course statistics data
export const courseStatistics: CourseStatistics[] = [
  {
    id: "1",
    title: "Advanced course on artificial intelligence and machine learning",
    description: "Comprehensive course covering AI fundamentals...",
    thumbnail: require("../assets/images/courses/course-thumbnail.png"),
    rating: 4.8,
    duration: "120m",
    completionRate: 75,
    isNew: true,
    isLive: false,
    isSave: false
  },
  {
    id: "2",
    title: "Data Science and Analytics Masterclass",
    description: "Learn data analysis, visualization, and statistical modeling...",
    thumbnail: require("../assets/images/courses/course-thumbnail.png"),
    rating: 4.6,
    duration: "90m",
    completionRate: 45,
    isNew: false,
    isLive: true,
    isSave: true
  },
  {
    id: "3",
    title: "Web Development with React and Node.js",
    description: "Full-stack development course for modern web applications...",
    thumbnail: require("../assets/images/courses/course-thumbnail.png"),
    rating: 4.7,
    duration: "150m",
    completionRate: 20,
    isNew: false,
    isLive: false,
    isSave: false
  }
];
