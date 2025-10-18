import Avatar from "@/components/Common/Avatar";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import ScreenHeader from "@/components/Common/ScreenHeader";
import { mockUser } from "@/data/mockData";
import { getScaleFactor } from "@/utils/scaling";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../assets/icons/icons";


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
    icon: icons.user,
    hasArrow: true
  },
  {
    id: "certificates",
    title: "Chứng chỉ của tôi",
    icon: icons.bookSaved,
    hasArrow: true,
    badge: profileStats.certificates
  },
  {
    id: "settings",
    title: "Cài đặt",
    icon: icons.setting,
    hasArrow: true
  },
  {
    id: "help",
    title: "Trợ giúp & Hỗ trợ",
    icon: icons.bell,
    hasArrow: true
  },
  {
    id: "logout",
    title: "Đăng xuất",
    icon: icons.logout,
    hasArrow: false,
    isDestructive: true
  }
];

export default function ProfileScreen() {
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
      <Text className="text-xl font-bold text-blue-600">{value}</Text>
      <Text className="text-sm text-center text-gray-600">{title}</Text>
      {subtitle && <Text className="mt-1 text-sm text-center text-gray-500">{subtitle}</Text>}
    </View>
  );

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity
      onPress={() => handleMenuPress(item.id)}
      className="flex-row items-center p-4 mb-3 bg-white rounded-xl"
    >
      <View className="justify-center items-center mr-3 w-12 h-12 bg-gray-100 rounded-lg">
        <Image
          source={item.icon}
          style={{
            width: getScaleFactor() * 28,
            height: getScaleFactor() * 28,
            tintColor: item.isDestructive ? '#ef4444' : '#6b7280'
          }}
          resizeMode="contain"
        />
      </View>
      
      <View className="flex-1">
        <Text className={`text-base font-medium ${item.isDestructive ? 'text-red-600' : 'text-gray-900'}`}>
          {item.title}
        </Text>
      </View>
      
      <View className="flex-row items-center">
        {item.badge && (
          <View 
          style={{width: getScaleFactor() * 40, height: getScaleFactor() * 40}}
          className="flex justify-center items-center mr-1 bg-blue-100 rounded-full">
            <Text className="text-sm font-medium text-blue-800">{item.badge}</Text>
          </View>
        )}
        {item.hasArrow && (
          <Image
            source={icons.chevronRight}
            style={{
              width: getScaleFactor() * 24,
              height: getScaleFactor() * 24,
              tintColor: '#9ca3af'
            }}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <ScreenHeader 
        title="Profile"
      />
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getScaleFactor() * 180 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center" style={{ paddingVertical: getScaleFactor() * 80 }}>
            <LoadingSpinner size="large" />
          </View>
        ) : (
          <View className="px-4">
            {/* Profile Header */}
            <View className="items-center p-4 mb-6 bg-white rounded-xl">
              <View className="mb-4">
                <Avatar 
                  source={require('../../assets/images/sample-avatar.png')}
                  size="large"
                />
              </View>
              <Text className="mb-1 text-base font-bold text-gray-900">
                {mockUser.name}
              </Text>
              <Text className="mb-4 text-sm text-gray-600">
                student@example.com
              </Text>
              
              <TouchableOpacity 
                className="bg-blue-600 rounded-[5px] justify-center items-center"
                style={{ height: getScaleFactor() * 60, paddingHorizontal: getScaleFactor() * 70 }}
              >
                <Text
                  className="text-base font-semibold text-white"
                >
                  Chỉnh sửa hồ sơ
                </Text>
              </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <View className="mb-6">
              <Text className="mb-3 text-xl font-semibold text-center text-gray-900">Thống kê học tập</Text>
              <View 
              className="flex-row mb-3"
              style={{ gap: getScaleFactor() * 12 }}
              >
                <StatCard title="Hoàn thành" value={profileStats.coursesCompleted} subtitle="khóa học" />
                <StatCard title="Đang học" value={profileStats.coursesInProgress} subtitle="khóa học" />
              </View>
              <View 
              className="flex-row"
              style={{ gap: getScaleFactor() * 12 }}
              >
                <StatCard title="Thời gian học" value={`${profileStats.totalStudyHours}h`} />
                <StatCard title="Điểm trung bình" value={`${profileStats.averageScore}%`} />
                <StatCard title="Streak" value={`${profileStats.streak} ngày`} />
              </View>
            </View>

            {/* Menu Items */}
            <View className="mb-6">
              <Text className="mb-3 text-xl font-semibold text-center text-gray-900">Tài khoản</Text>
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>

            {/* App Info */}
            <View className="p-4 mb-6 bg-white rounded-xl">
              <Text className="text-sm text-center text-gray-500">
                Phiên bản ứng dụng 1.0.0
              </Text>
              <Text className="mt-1 text-sm text-center text-gray-400">
                © 2024 Learning App. Tất cả quyền được bảo lưu.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
