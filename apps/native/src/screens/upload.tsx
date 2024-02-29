import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export const Upload: React.FC = () => {
  return (
    <View className="bg-black h-screen">
      <Text className="text-pink-500">Upload</Text>
      <StatusBar style="auto" />
    </View>
  );
};
