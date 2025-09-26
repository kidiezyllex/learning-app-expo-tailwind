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
  col?: number;
}

export default function TabSelector({ tabs, onTabPress, col = 3 }: TabSelectorProps) {
  const [pressedTab, setPressedTab] = useState<string | null>(null);

  return (
    <View style={{ gap: 20, marginVertical: 30}} className="flex-row flex-wrap justify-center">
      {tabs.map((tab) => (
        <View key={tab.id} style={{ flex: 1, maxWidth: `${100/col}%` }}>
          <Pressable
            onPress={() => !tab.isActive && onTabPress?.(tab.id)}
            onPressIn={() => !tab.isActive && setPressedTab(tab.id)}
            onPressOut={() => !tab.isActive && setPressedTab(null)}
            disabled={tab.isActive}
            style={{ minHeight: col === 4 ? 55 : 65 }}
            className={`rounded-[100px] border-2 justify-center items-center transform transition-transform ${
              pressedTab === tab.id && !tab.isActive ? 'scale-95' : 'scale-100'
            } ${
              tab.isActive
                ? 'bg-blue-500 border-blue-500'
                : 'bg-transparent border-zinc-500'
            }`}
          >
            <Text 
              className={`font-semibold ${
                tab.isActive ? 'text-white' : 'text-zinc-500'
              }`}
              style={{ fontSize: col === 4 ? 16 : 20 }}
            >
              {tab.label}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
