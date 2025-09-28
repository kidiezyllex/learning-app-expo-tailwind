export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: any;
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
    description: "Learn how to read and analyze financial statements to make informed investment decisions and evaluate company performance.",
    thumbnail: require("../../assets/images/home/blog1.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "2",
    title: "Advanced React Native Development Masterclass",
    description: "Master advanced React Native techniques including performance optimization, native modules, and state management with Redux.",
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
    description: "Introduction to machine learning concepts and algorithms. Learn how to implement machine learning algorithms using Python and popular ML libraries.",
    thumbnail: require("../../assets/images/home/blog3.png"),
    rating: 4.5,
    duration: "60m",
    isNew: true,
    isLive: true,
  },
  {
    id: "4",
    title: "Cybersecurity and Data Protection Essentials",
    description: "Learn essential cybersecurity practices and data protection strategies. Understand how to secure sensitive information in enterprise environments.",
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
    description: "Master digital marketing fundamentals including SEO, social media marketing, content strategy, and performance analytics.",
    thumbnail: require("../../assets/images/home/blog5.png"),
    rating: 4.5,
    duration: "60m",
    isNew: true,
    isLive: false,
  },
  {
    id: "6",
    title: "Cloud Computing with AWS and Azure",
    description: "Comprehensive guide to cloud computing with AWS and Azure. Learn how to deploy and manage cloud services.",
    thumbnail: require("../../assets/images/home/blog6.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "7",
    title: "UI/UX Design Principles and Prototyping",
    description: "Learn user interface and user experience design principles, wireframing, prototyping, and usability testing methodologies.",
    thumbnail: require("../../assets/images/home/blog6.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
];
