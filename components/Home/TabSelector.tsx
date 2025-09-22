import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface TabOption {
  id: string;
  label: string;
  isActive: boolean;
}

interface TabSelectorProps {
  tabs: TabOption[];
  onTabPress?: (tabId: string) => void;
}

export default function TabSelector({ tabs, onTabPress }: TabSelectorProps) {
  const [pressedTab, setPressedTab] = useState<string | null>(null);

  return (
    <View className="grid grid-cols-3 gap-[14px] my-5">
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          onPress={() => !tab.isActive && onTabPress?.(tab.id)}
          onPressIn={() => !tab.isActive && setPressedTab(tab.id)}
          onPressOut={() => !tab.isActive && setPressedTab(null)}
          disabled={tab.isActive}
          className={`min-h-[65px] rounded-[100px] border-2 justify-center items-center transform transition-transform ${
            pressedTab === tab.id && !tab.isActive ? 'scale-95' : 'scale-100'
          } ${
            tab.isActive
              ? 'bg-blue-500 border-blue-500'
              : 'bg-transparent border-zinc-500'
          }`}
        >
          <Text className={`text-xl font-semibold ${
            tab.isActive ? 'text-white' : 'text-zinc-500'
          }`}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
