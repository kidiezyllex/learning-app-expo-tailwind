import { getScaleFactor } from '@/utils/scaling';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons/icons';
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSearchPress?: () => void;
}

export default function SearchBar({
  placeholder = "Search",
  onSearch,
  onSearchPress
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch?.(searchQuery);
    onSearchPress?.();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ height: getScaleFactor() * 56, borderRadius: getScaleFactor() * 26 }} className="flex-row items-center px-4 bg-white">
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={icons.search}
            style={{ width: getScaleFactor() * 34, height: getScaleFactor() * 34 }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={{ height: getScaleFactor() * 48, minHeight: getScaleFactor() * 48, marginLeft: getScaleFactor() * 12 }}
          className="flex-1 text-sm text-zinc-400"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
