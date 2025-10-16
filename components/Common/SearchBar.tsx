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
      <View style={{ height: 48 }} className="bg-white rounded-[26px] flex-row items-center px-4">
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={icons.search}
            style={{ width: 34, height: 34 }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={{ fontSize: 20, height: 48, minHeight: 48 }}
          className="flex-1 ml-3 text-zinc-400"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
