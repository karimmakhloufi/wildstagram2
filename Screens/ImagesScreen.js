import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Image, FlatList, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function ImagesScreen() {
  const [localImagesUrls, setLocalImagesUrls] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      let files = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setLocalImagesUrls(files);
      console.log("updated the files list");
    })();
  }, [isFocused, lastUpdate]);

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
              <Button
                title="Upload"
                onPress={() => {
                  const data = new FormData();
                  data.append("name", "avatar");
                  data.append("fileData", {
                    uri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      item.item,
                    name: item.item,
                  });
                  axios({
                    method: "post",
                    url: "https://wildstagram.nausicaa.wilders.dev/upload",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                    .then(function (response) {
                      //handle success
                      if (response.status === 200) {
                        alert("uploaded");
                      }
                    })
                    .catch(function (response) {
                      //handle error
                      console.log(response);
                      alert("error");
                    });
                }}
              />
              <Button
                title="Delete"
                color="red"
                onPress={async () => {
                  await FileSystem.deleteAsync(
                    FileSystem.cacheDirectory + "ImageManipulator/" + item.item
                  );
                  setLastUpdate(lastUpdate + 1);
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
