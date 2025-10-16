import { getScaleFactor } from '@/utils/scaling';
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
    <View
      style={{
        gap: col === 4 ? getScaleFactor() * 16 : getScaleFactor() * 20,
        marginVertical: getScaleFactor() * 30
      }}
      className="flex-row flex-nowrap justify-center"
    >
      {tabs.map((tab) => (
        <View key={tab.id} style={{ width: `${100 / col}%`, flex: 1 }}>
          <Pressable
            onPress={() => !tab.isActive && onTabPress?.(tab.id)}
            onPressIn={() => !tab.isActive && setPressedTab(tab.id)}
            onPressOut={() => !tab.isActive && setPressedTab(null)}
            disabled={tab.isActive}
            style={{ minHeight: col === 4 ? getScaleFactor() * 55 : getScaleFactor() * 65 }}
            className={`rounded-[100px] border-2 justify-center items-center transform transition-transform ${pressedTab === tab.id && !tab.isActive ? 'scale-95' : 'scale-100'
              } ${tab.isActive
                ? 'bg-blue-500 border-blue-500'
                : 'bg-transparent border-zinc-500'
              }`}
          >
            <Text
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
              className={`font-semibold text-nowrap ${tab.isActive ? 'text-white' : 'text-zinc-500'
                } ${col === 4 ? 'text-xs' : 'text-sm'}`}>
              {tab.label}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
