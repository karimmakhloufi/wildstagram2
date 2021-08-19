import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Image, FlatList, Button } from "react-native";
import * as FileSystem from "expo-file-system";

export default function ImagesScreen() {
  const [localImagesUrls, setLocalImagesUrls] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      let files = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setLocalImagesUrls(files);
      console.log("updated the files list");
    })();
  }, [isFocused]);

  return (
    <>
      <FlatList
        style={{ padding: 10 }}
        data={localImagesUrls}
        keyExtractor={(el) => el}
        renderItem={(item) => {
          return (
            <>
              <Image
                source={{
                  uri:
                    FileSystem.cacheDirectory + "ImageManipulator/" + item.item,
                }}
                key={item}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  height: 400,
                  padding: 50,
                }}
              />
              <Button title="Upload" />
              <Button
                title="Delete"
                color="red"
                onPress={async () => {
                  await FileSystem.deleteAsync(
                    FileSystem.cacheDirectory + "ImageManipulator/" + item.item
                  );
                  alert("Deleted");
                }}
              />
            </>
          );
        }}
      />
    </>
  );
}
