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
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Là quá trình giao tiếp, trao...",
    thumbnail: require("../../assets/images/home/blog1.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "2",
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Khóa học này giúp mọi người,",
    thumbnail: require("../../assets/images/home/blog2.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: true,
    isSave: true,
  },
  {
    id: "3",
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Khóa học này giúp mọi người,",
    thumbnail: require("../../assets/images/home/blog3.png"),
    rating: 4.5,
    duration: "60m",
    isNew: true,
    isLive: true,
  },
  {
    id: "4",
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Môn học Đảm bảo an toàn...",
    thumbnail: require("../../assets/images/home/blog4.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: true,
    isSave: true,
  },
  {
    id: "5",
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Là quá trình giao tiếp, trao...",
    thumbnail: require("../../assets/images/home/blog5.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "6",
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Là quá trình giao tiếp, trao...",
    thumbnail: require("../../assets/images/home/blog6.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
  {
    id: "7",
    title: "Cách đọc báo cáo tài chính để quản lý đầu tư hiệu quả",
    description: "Là quá trình giao tiếp, trao...",
    thumbnail: require("../../assets/images/home/blog6.png"),
    rating: 4.5,
    duration: "60m",
    isNew: false,
    isLive: false,
  },
];
