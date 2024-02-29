import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screens/home";
import { Upload } from "./src/screens/upload";
import { UploadFromPhoto } from "./src/screens/uploadFromPhoto";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: {};
  Upload: undefined;
  UploadFromPhoto: {};
  UploadFromGallery: {};
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="UploadFromPhoto" component={UploadFromPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
