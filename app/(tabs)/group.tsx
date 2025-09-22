import { View } from 'react-native';

import GroupScreen from '@/components/Screens/GroupScreen';

const GroupTab = () => {
  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <GroupScreen />
    </View>
  );
}

export default GroupTab