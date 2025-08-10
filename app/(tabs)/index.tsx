import "@/global.css";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Placeholder login function
    console.log("Email:", email);
    console.log("Password:", password);
    // Navigate to home after successful login
  };

  return (
    <View  className="flex-1 justify-center items-center bg-white">
      <Text className="text-1 text-primary text-5xl font-bold">welcome</Text>
    </View>
  );
}
