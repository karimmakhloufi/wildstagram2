import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Button } from "react-native";
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
  return (
    <ScrollView>
      {imagesURI.map((el) => (
        <React.Fragment key={el}>
          <Image
            style={{
              flex: 1,
              resizeMode: "cover",
              height: 500,
            }}
            source={{
              uri: FileSystem.cacheDirectory + "ImageManipulator/" + el,
            }}
          />
          <Button
            title="upload"
            onPress={async () => {
              const data = new FormData();
              data.append("fileData", {
                uri: FileSystem.cacheDirectory + "ImageManipulator/" + el,
                name: el,
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
        </React.Fragment>
      ))}
    </ScrollView>
  );
}
