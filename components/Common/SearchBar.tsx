import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

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
    <View className="bg-white rounded-[26px] h-12 flex-row items-center px-6">
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={require('../../assets/icons/search.png')}
          style={{ width: 34, height: 34 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={{ fontSize: 20 }}
        className="flex-1 ml-3 h-12 min-h-12 text-zinc-400"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
    </View>
  );
}
