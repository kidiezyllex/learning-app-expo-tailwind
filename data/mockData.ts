export interface Course {
  id: string;
  title: string;
  userName: string;
  userAvatar: string;
  completedTests: number;
  completionRate: number;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  groupName: string;
  notificationCount: number;
}

export interface NavigationTab {
  id: string;
  label: string;
  icon: any; // Local image asset from require()
  isActive: boolean;
  size: number;
}

export const mockUser: User = {
  id: "1",
  name: "User Name",
  avatar: "https://placehold.co/69x69",
  groupName: "Nhóm 1",
  notificationCount: 3
};

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Tạo thiết kế Figma bằng AI",
    userName: "user name",
    userAvatar: "https://placehold.co/45x45",
    completedTests: 3,
    completionRate: 35,
    isActive: true
  },
  {
    id: "2", 
    title: "Tạo thiết kế Figma bằng AI",
    userName: "user name",
    userAvatar: "https://placehold.co/45x45",
    completedTests: 3,
    completionRate: 20,
    isActive: false
  },
  {
    id: "3",
    title: "Tạo thiết kế Figma bằng AI", 
    userName: "user name",
    userAvatar: "https://placehold.co/45x45",
    completedTests: 0,
    completionRate: 0,
    isActive: false
  }
];
