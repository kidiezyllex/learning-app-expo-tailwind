import React, { useState } from 'react';
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
    <View className="flex flex-row justify-center my-5 space-x-[14px]">
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          onPress={() => onTabPress?.(tab.id)}
          onPressIn={() => setPressedTab(tab.id)}
          onPressOut={() => setPressedTab(null)}
          className={`w-[132px] h-11 rounded-[100px] border-2 justify-center items-center transform transition-transform ${
            pressedTab === tab.id ? 'scale-95' : 'scale-100'
          } ${
            tab.isActive 
              ? 'bg-blue-600 border-blue-600' 
              : 'bg-transparent border-zinc-500'
          }`}
        >
          <Text className={`text-lg font-semibold ${
            tab.isActive ? 'text-white' : 'text-zinc-500'
          }`}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
