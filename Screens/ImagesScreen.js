import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import * as FileSystem from "expo-file-system";

export default function ImagesScreen() {
  const [localImagesUrls, setLocalImagesUrls] = useState([]);
  useEffect(() => {
    (async () => {
      let files = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "Camera"
      );
      setLocalImagesUrls(files);
    })();
  }, []);

  return (
    <>
      <FlatList
        data={localImagesUrls}
        keyExtractor={(el) => el}
        renderItem={(item) => {
          return (
            <Image
              source={{
                uri: FileSystem.cacheDirectory + "Camera/" + item.item,
              }}
              key={item}
              style={{
                resizeMode: "contain",
                height: 400,
              }}
            />
          );
        }}
      />
    </>
  );
}
