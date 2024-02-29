import React, { PropsWithChildren } from "react";
import { View } from "react-native";

export const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <View className="bg-black flex-1 flex flex-col justify-center items-center p-5">
      {children}
    </View>
  );
};
