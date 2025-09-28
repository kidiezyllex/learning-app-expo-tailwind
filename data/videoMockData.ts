export interface VideoData {
  id: string;
  title: string;
  duration: string;
  currentTime: string;
  totalTime: string;
  progress: number; 
  isPlaying: boolean;
  volume: number; 
  isMuted: boolean;
  thumbnail: string;
  description: string;
  views: string;
  likes: string;
}

export const videoMockData: VideoData = {
  id: "1",
  title: "Các thành phần chính của báo cáo tài chính",
  duration: "10:30",
  currentTime: "2:30",
  totalTime: "10:30",
  progress: 24, 
  isPlaying: false,
  volume: 70,
  isMuted: false,
  thumbnail: "https://placehold.co/718x411",
  description: "Học về các thành phần chính của báo cáo tài chính trong doanh nghiệp",
  views: "2.5M",
  likes: "300"
};
