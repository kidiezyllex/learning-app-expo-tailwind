export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: any; // Changed from string to any to support require()
  rating: number;
  duration: string;
  isNew?: boolean;
  isLive?: boolean;
  isSave?: boolean;
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Financial Statement Analysis for Investment Management",
    description: "Learn how to read and analyze financial statements...",
    thumbnail: require("../../assets/images/home/blog1.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "2",
    title: "Advanced React Native Development Masterclass",
    description: "Master advanced React Native techniques...",
    thumbnail: require("../../assets/images/home/blog2.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: true,
    isSave: true,
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals with Python",
    description: "Introduction to machine learning concepts...",
    thumbnail: require("../../assets/images/home/blog3.png"),
    rating: 4.5,
    duration: "60m",
    isNew: true,
    isLive: true,
  },
  {
    id: "4",
    title: "Cybersecurity and Data Protection Essentials",
    description: "Learn essential cybersecurity practices...",
    thumbnail: require("../../assets/images/home/blog4.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: true,
    isSave: true,
  },
  {
    id: "5",
    title: "Digital Marketing Strategy and Analytics",
    description: "Master digital marketing fundamentals...",
    thumbnail: require("../../assets/images/home/blog5.png"),
    rating: 4.5,
    duration: "60m",
    isNew: true,
    isLive: false,
  },
  {
    id: "6",
    title: "Cloud Computing with AWS and Azure",
    description: "Comprehensive guide to cloud computing...",
    thumbnail: require("../../assets/images/home/blog6.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "7",
    title: "UI/UX Design Principles and Prototyping",
    description: "Learn user interface and user experience...",
    thumbnail: require("../../assets/images/home/blog6.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
];
