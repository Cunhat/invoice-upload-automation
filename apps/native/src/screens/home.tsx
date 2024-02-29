import React from "react";

import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { Button } from "../components/ui/button";
import { MainLayout } from "../components/layouts/mainLayout";

export const Home: React.FC<
  NativeStackScreenProps<RootStackParamList, "Home">
> = ({ navigation }) => {
  return (
    <MainLayout>
      <Text className="text-indigo-500 font-bold text-3xl pb-10">
        Invoice Upload
      </Text>
      <Text className="text-white text-base text-center pb-8">
        Choose from where you want to upload your invoice
      </Text>
      <View className="w-full flex flex-col gap-4 justify-center items-center">
        <Button
          variant={"primary"}
          size={"full"}
          onPress={() => navigation.navigate("UploadFromPhoto")}
          text="Take a photo"
        />
        <Button
          variant={"secondary"}
          size={"full"}
          onPress={() => navigation.navigate("UploadFromGallery")}
          text="Upload from gallery"
        />
      </View>
    </MainLayout>
  );
};
