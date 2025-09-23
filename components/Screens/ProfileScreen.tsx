import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Components
import Avatar from "@/components/Common/Avatar";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

// Data
import { mockUser } from "@/data/mockData";

interface ProfileScreenProps {
  // Header đã được move lên root level
}

// Mock profile data
const profileStats = {
  coursesCompleted: 12,
  coursesInProgress: 3,
  totalStudyHours: 48,
  certificates: 8,
  averageScore: 87,
  streak: 15
};

const menuItems = [
  {
    id: "edit-profile",
    title: "Chỉnh sửa hồ sơ",
    icon: require('../../assets/icons/user.png'),
    hasArrow: true
  },
  {
    id: "certificates",
    title: "Chứng chỉ của tôi",
    icon: require('../../assets/icons/book-saved.png'),
    hasArrow: true,
    badge: profileStats.certificates
  },
  {
    id: "settings",
    title: "Cài đặt",
    icon: require('../../assets/icons/setting.png'),
    hasArrow: true
  },
  {
    id: "help",
    title: "Trợ giúp & Hỗ trợ",
    icon: require('../../assets/icons/bell.png'),
    hasArrow: true
  },
  {
    id: "logout",
    title: "Đăng xuất",
    icon: require('../../assets/icons/logout.png'),
    hasArrow: false,
    isDestructive: true
  }
];

export default function ProfileScreen({}: ProfileScreenProps) {
  const [isLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleMenuPress = (itemId: string) => {
    if (itemId === "logout") {
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const StatCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => (
    <View className="flex-1 items-center p-4 bg-white rounded-xl">
      <Text style={{ fontSize: 20 }} className="font-bold text-blue-600">{value}</Text>
      <Text style={{ fontSize: 16 }} className="text-center text-gray-600">{title}</Text>
      {subtitle && <Text style={{ fontSize: 16 }} className="mt-1 text-center text-gray-500">{subtitle}</Text>}
    </View>
  );

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity
      onPress={() => handleMenuPress(item.id)}
      className="flex-row items-center p-4 mb-3 bg-white rounded-xl"
    >
      <View className="justify-center items-center mr-3 w-10 h-10 bg-gray-100 rounded-lg">
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isDestructive ? '#ef4444' : '#6b7280'
          }}
          resizeMode="contain"
        />
      </View>
      
      <View className="flex-1">
        <Text style={{ fontSize: 16 }} className={`font-medium ${item.isDestructive ? 'text-red-600' : 'text-gray-900'}`}>
          {item.title}
        </Text>
      </View>
      
      <View className="flex-row items-center">
        {item.badge && (
          <View className="px-2 py-1 mr-2 bg-blue-100 rounded-full">
            <Text style={{ fontSize: 16 }} className="font-medium text-blue-800">{item.badge}</Text>
          </View>
        )}
        {item.hasArrow && (
          <Image
            source={require('../../assets/icons/chevron-right.png')}
            style={{
              width: 16,
              height: 16,
              tintColor: '#9ca3af'
            }}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 pt-[66px]">
      {/* Header */}
      <View className="fixed top-0 right-0 left-0 z-50">
        <View className="flex relative flex-row px-6 justify-between items-center h-[102px] bg-[#1877F2]">
          <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 32
          }}
          className="font-medium text-white">
            Profile
          </Text>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <LoadingSpinner size="large" />
          </View>
        ) : (
          <View className="px-6">
            {/* Profile Header */}
            <View className="items-center p-6 mb-6 bg-white rounded-xl">
              <View className="mb-4">
                <Avatar 
                  source={mockUser.avatar}
                  size="large"
                />
              </View>
              <Text style={{ fontSize: 20 }} className="mb-1 font-bold text-gray-900">
                {mockUser.name}
              </Text>
              <Text style={{ fontSize: 16 }} className="mb-4 text-gray-600">
                student@example.com
              </Text>
              
              <TouchableOpacity className="px-6 py-2 bg-blue-600 rounded-lg">
                <Text style={{ fontSize: 16 }} className="font-medium text-white">Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <View className="mb-6">
              <Text style={{ fontSize: 20 }} className="mb-3 font-semibold text-gray-900">Thống kê học tập</Text>
              <View className="flex-row mb-3 space-x-3">
                <StatCard title="Hoàn thành" value={profileStats.coursesCompleted} subtitle="khóa học" />
                <StatCard title="Đang học" value={profileStats.coursesInProgress} subtitle="khóa học" />
              </View>
              <View className="flex-row space-x-3">
                <StatCard title="Thời gian học" value={`${profileStats.totalStudyHours}h`} />
                <StatCard title="Điểm trung bình" value={`${profileStats.averageScore}%`} />
                <StatCard title="Streak" value={`${profileStats.streak} ngày`} />
              </View>
            </View>

            {/* Menu Items */}
            <View className="mb-6">
              <Text style={{ fontSize: 20 }} className="mb-3 font-semibold text-gray-900">Tài khoản</Text>
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>

            {/* App Info */}
            <View className="p-4 mb-6 bg-white rounded-xl">
              <Text style={{ fontSize: 16 }} className="text-center text-gray-500">
                Phiên bản ứng dụng 1.0.0
              </Text>
              <Text style={{ fontSize: 16 }} className="mt-1 text-center text-gray-400">
                © 2024 Learning App. Tất cả quyền được bảo lưu.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
