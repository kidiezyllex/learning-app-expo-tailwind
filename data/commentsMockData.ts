export interface Comment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes?: number;
}

export const commentsMockData: Comment[] = [
  {
    id: '1',
    username: 'Quang Nam',
    avatar: 'https://placehold.co/50x50',
    content: 'Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.',
    timeAgo: '1 hours ago',
    likes: 12
  },
  {
    id: '2',
    username: 'Lan Ngọc',
    avatar: 'https://placehold.co/50x50',
    content: 'Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.',
    timeAgo: '20 hours ago',
    likes: 8
  },
  {
    id: '3',
    username: 'Thomas Đặng',
    avatar: 'https://placehold.co/50x50',
    content: 'Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.',
    timeAgo: '1 days ago',
    likes: 15
  },
  {
    id: '4',
    username: 'Huy123',
    avatar: 'https://placehold.co/50x50',
    content: 'Video cực kỳ dễ hiểu. Nhờ bạn mà mình nắm chắc kiến thức hơn hẳn, cảm ơn bạn nhiều!',
    timeAgo: '4 days ago',
    likes: 23
  },
  {
    id: '5',
    username: 'Thomas Đặng',
    avatar: 'https://placehold.co/50x50',
    content: 'Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.Công tác bay kiểm tra, hiệu chuẩn tại sân bay 16 tỷ USD lớn nhất Việt Nam sắp diễn ra.',
    timeAgo: '4 days ago',
    likes: 7
  }
];
