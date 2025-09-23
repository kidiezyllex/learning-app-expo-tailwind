export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  currency: string;
  rating: number;
  maxRating: number;
  instructor: {
    name: string;
    id: string;
    avatar: string;
  };
  duration: string;
  progress: number;
  isPurchased: boolean;
  longDescription: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  user: {
    name: string;
    id: string;
    avatar: string;
  };
  rating: number;
  maxRating: number;
  comment: string;
  date: string;
}

export const courseDetailsMockData: CourseDetail[] = [
  {
    id: "1",
    title: "Financial Statement Analysis for Investment Management",
    description: "Learn how to read and analyze financial statements to make informed investment decisions and evaluate company performance.",
    thumbnail: "https://placehold.co/309x225",
    price: 9.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "Michael Thompson",
      id: "michael_thompson_finance",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 50,
    isPurchased: false,
    longDescription: "This comprehensive course will teach you how to read and analyze financial statements to make smart investment decisions. You'll learn to evaluate a company's financial health, identify key performance indicators, and apply these skills in real-world scenarios.",
    reviews: [
      {
        id: "1",
        user: {
          name: "John 12345",
          id: "john_12345",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.5,
        maxRating: 5,
        comment: "Excellent course with practical examples and clear explanations",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: "2",
    title: "Advanced React Native Development Masterclass",
    description: "Master advanced React Native techniques including performance optimization, native modules, and state management with Redux.",
    thumbnail: "https://placehold.co/309x225",
    price: 19.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "Sarah Johnson",
      id: "sarah_johnson_react",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 75,
    isPurchased: true,
    longDescription: "This comprehensive course covers advanced React Native concepts including performance optimization, native module development, state management with Redux, and deployment strategies. You'll learn how to build scalable mobile applications that work seamlessly across iOS and Android platforms.",
    reviews: [
      {
        id: "2",
        user: {
          name: "Alice Johnson",
          id: "alice_j",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.8,
        maxRating: 5,
        comment: "Outstanding course with real-world examples and comprehensive coverage",
        date: "2024-01-20"
      }
    ]
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals with Python",
    description: "Introduction to machine learning concepts, algorithms, and implementation using Python and popular ML libraries.",
    thumbnail: "https://placehold.co/309x225",
    price: 15.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "Dr. Robert Chen",
      id: "robert_chen_ml",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 30,
    isPurchased: false,
    longDescription: "Dive deep into machine learning fundamentals with this comprehensive course. Learn about supervised and unsupervised learning, neural networks, and how to implement ML algorithms using Python and scikit-learn.",
    reviews: [
      {
        id: "3",
        user: {
          name: "Bob Brown",
          id: "bob_brown",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.3,
        maxRating: 5,
        comment: "High-quality content with excellent teaching methodology",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: "4",
    title: "Cybersecurity and Data Protection Essentials",
    description: "Learn essential cybersecurity practices, data protection strategies, and risk management in enterprise environments.",
    thumbnail: "https://placehold.co/309x225",
    price: 12.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "Emily Rodriguez",
      id: "emily_rodriguez_cyber",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 60,
    isPurchased: true,
    longDescription: "This course covers information security and data protection in enterprise environments. You'll learn about various security risks, threat mitigation strategies, and best practices for protecting sensitive information.",
    reviews: [
      {
        id: "4",
        user: {
          name: "Carol White",
          id: "carol_white",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.6,
        maxRating: 5,
        comment: "Very useful for professional development and career advancement",
        date: "2024-01-28"
      }
    ]
  },
  {
    id: "5",
    title: "Digital Marketing Strategy and Analytics",
    description: "Master digital marketing fundamentals including SEO, social media marketing, content strategy, and performance analytics.",
    thumbnail: "https://placehold.co/309x225",
    price: 8.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "James Wilson",
      id: "james_wilson_marketing",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 20,
    isPurchased: false,
    longDescription: "This beginner-friendly course covers digital marketing fundamentals, perfect for those starting their journey in online marketing. Learn about SEO, social media strategies, content creation, and how to measure campaign success.",
    reviews: [
      {
        id: "5",
        user: {
          name: "Emma Green",
          id: "emma_green",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.2,
        maxRating: 5,
        comment: "Perfect for beginners with step-by-step guidance and clear instructions",
        date: "2024-02-01"
      }
    ]
  },
  {
    id: "6",
    title: "Cloud Computing with AWS and Azure",
    description: "Comprehensive guide to cloud computing platforms, services, and deployment strategies using Amazon Web Services and Microsoft Azure.",
    thumbnail: "https://placehold.co/309x225",
    price: 11.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "David Kumar",
      id: "david_kumar_cloud",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 80,
    isPurchased: true,
    longDescription: "This advanced course covers cloud computing fundamentals and advanced concepts, helping you become an expert in cloud architecture, deployment strategies, and cost optimization across major cloud platforms.",
    reviews: [
      {
        id: "6",
        user: {
          name: "Tom Black",
          id: "tom_black",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.7,
        maxRating: 5,
        comment: "In-depth knowledge with practical applications and industry insights",
        date: "2024-02-05"
      }
    ]
  },
  {
    id: "7",
    title: "UI/UX Design Principles and Prototyping",
    description: "Learn user interface and user experience design principles, wireframing, prototyping, and usability testing methodologies.",
    thumbnail: "https://placehold.co/309x225",
    price: 13.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "Lisa Anderson",
      id: "lisa_anderson_design",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 40,
    isPurchased: false,
    longDescription: "This comprehensive course covers UI/UX design principles, combining both theory and practical application. You'll gain a complete understanding of user-centered design, prototyping tools, and usability testing methods.",
    reviews: [
      {
        id: "7",
        user: {
          name: "Grace Park",
          id: "grace_park",
          avatar: "https://placehold.co/31x31"
        },
        rating: 4.4,
        maxRating: 5,
        comment: "Diverse and rich content with creative approaches and modern techniques",
        date: "2024-02-10"
      }
    ]
  }
];

export const getCourseDetailById = (id: string): CourseDetail | undefined => {
  return courseDetailsMockData.find(course => course.id === id);
};
