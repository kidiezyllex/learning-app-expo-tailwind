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
    title: "Understanding Unity's physics system",
    description: "Unity helps you simulate physics in your Project to ensure that the objects correctly accelerate and respond to collisions, gravity, and various other forces.",
    thumbnail: "https://placehold.co/309x225",
    price: 9.99,
    currency: "$",
    rating: 4.5,
    maxRating: 5,
    instructor: {
      name: "John Doe 1234567891011121314",
      id: "john_doe_123",
      avatar: "https://placehold.co/30x30"
    },
    duration: "60m",
    progress: 50,
    isPurchased: false,
    longDescription: "Unity helps you simulate physics in your Project to ensure that the objects correctly accelerate and respond to collisions, gravity, and various other forces. Unity provides different physics engine implementations which you can use according to your Project needs: 3D, 2D, object-oriented, or data-oriented. This page provides the links to their documentation.\n\nYou can achieve some basic physics goals with the user interface, but for more control over the simulation, you need some familiarity with C#. To develop your C# skills, see the Unity Learn Junior Programmer course.",
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
        comment: "Good experience",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: "2",
    title: "Advanced React Native Development",
    description: "Learn advanced techniques for building high-performance React Native applications with modern tools and best practices.",
    thumbnail: "https://placehold.co/309x225",
    price: 19.99,
    currency: "$",
    rating: 4.8,
    maxRating: 5,
    instructor: {
      name: "Jane Smith",
      id: "jane_smith",
      avatar: "https://placehold.co/30x30"
    },
    duration: "120m",
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
        comment: "Excellent course with practical examples",
        date: "2024-01-20"
      }
    ]
  }
];

export const getCourseDetailById = (id: string): CourseDetail | undefined => {
  return courseDetailsMockData.find(course => course.id === id);
};
