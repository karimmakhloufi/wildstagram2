import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, Button } from "react-native";
import axios from "axios";

export default function ImagesScreen() {
  const [imagesURI, setImagesURI] = useState([]);
  useEffect(() => {
    (async () => {
      images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setImagesURI(images);
    })();
  }, []);
  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  FileSystem.cacheDirectory +
                  "ImageManipulator/" +
                  itemData.item,
              }}
            />
            <Button
              title="upload"
              onPress={async () => {
                const data = new FormData();
                data.append("fileData", {
                  uri:
                    FileSystem.cacheDirectory +
                    "ImageManipulator/" +
                    itemData.item,
                  name: itemData.item,
                });
                let serverResponse;
                try {
                  serverResponse = await axios({
                    method: "post",
                    url: "https://wildstagram.nausicaa.wilders.dev/upload",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  if (serverResponse.status === 200) {
                    alert("Uploaded");
                  }
                } catch (err) {
                  console.log(err);
                  alert("Error");
                }
              }}
            />
          </>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 500,
  },
});
