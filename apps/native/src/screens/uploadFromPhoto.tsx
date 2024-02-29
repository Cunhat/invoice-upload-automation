import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  PressableProps,
  SafeAreaView,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MainLayout } from "../components/layouts/mainLayout";
import { RefreshCcw, Home, UploadCloud } from "lucide-react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

export const UploadFromPhoto: React.FC<
  NativeStackScreenProps<RootStackParamList, "UploadFromPhoto">
> = ({ navigation }) => {
  // let cameraRef = useRef(null);
  const [photo, setPhoto] = React.useState<CameraCapturedPicture | undefined>(
    undefined
  );
  const [camera, setCamera] = useState<Camera | null>(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const data = await camera?.takePictureAsync(options);

    setPhoto(data);
  };

  const uploadPhotoToS3 = () => {};

  if (photo) {
    ///// upload image ////

    const fetchImageFromUri = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    };

    const uploadImage = (filename, img) => {
      return Storage.put(filename, img, {
        level: "public",
        contentType: "image/jpeg",
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
        .then((response) => {
          return response.key;
        })
        .catch((error) => {
          console.log(error);
          return error.response;
        });
    };
    ////end upload img ////

    const savePhoto = async () => {
      const img = await fetchImageFromUri(photo.uri);
      const uploadUrl = await uploadImage("demo.jpg", img);
      console.log("uploadUrl", uploadUrl);
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const uploadPhoto = () => {
      savePhoto();
      navigation.navigate("Home");
    };

    return (
      <SafeAreaView className="flex-1 bg-black relative">
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          className="items-stretch flex-1"
        />
        <View className="bg-black/60 h-[200px] z-10 justify-center items-center  mt-auto absolute w-full bottom-0 flex flex-row">
          <Pressable
            key={"goHomeButton"}
            className="bg-white/20 w-[15%] h-[30%] rounded-full flex justify-center items-center"
            onPress={() => navigation.navigate("Home")}
          >
            <Home className="text-white" width={"90%"} height={"50%"} />
          </Pressable>
          <Pressable
            key={"uploadPhoto"}
            className="bg-white w-[20%] h-[40%] rounded-full flex justify-center items-center mx-10"
            onPress={() => uploadPhoto()}
          >
            <UploadCloud className="text-black" width={"90%"} height={"50%"} />
          </Pressable>
          <Pressable
            key={photo.uri}
            className="bg-white/20 w-[15%] h-[30%] rounded-full flex justify-center items-center"
            onPress={() => {
              setPhoto(undefined);
              setDisableButton(!disableButton);
            }}
          >
            <RefreshCcw className="text-white" width={"90%"} height={"50%"} />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (permission === null) {
    <MainLayout>
      <Text className="text-white">Requesting permissions...</Text>
    </MainLayout>;
  }

  if (!permission?.granted) {
    return (
      <MainLayout>
        <Text className="text-white">Permission denied...</Text>
        <Text className="text-white text-center">
          In order to use the device camera you have to grant permission!
        </Text>
      </MainLayout>
    );
  }

  return (
    <Camera className="flex-1" ref={(ref) => setCamera(ref)}>
      <View className="bg-black/60 h-[200px] z-10 justify-center items-center mt-auto">
        <CameraButton
          onPress={() => {
            setDisableButton(!disableButton);
            takePic();
          }}
          disabled={disableButton}
        />
      </View>
    </Camera>
  );
};

export interface ButtonProps extends PressableProps {}

const CameraButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <View className="border-white w-[20%] h-[40%] rounded-full p-[2px] border-4">
      <Pressable className="bg-white w-full h-full rounded-full" {...props} />
    </View>
  );
};
