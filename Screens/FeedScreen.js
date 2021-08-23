import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, ScrollView } from "react-native";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);
  useEffect(() => {
    (async () => {
      const filesUrl = await axios.get(
        "https://wildstagram.nausicaa.wilders.dev/list"
      );
      console.log("filesurls", filesUrl.data);
      setServerImagesUrls(filesUrl.data);
    })();
  }, []);
  return (
    <ScrollView>
      {serverImagesUrls.map((el) => (
        <React.Fragment key={el}>
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 500,
            }}
            source={{
              uri: "https://wildstagram.nausicaa.wilders.dev/files/" + el,
            }}
          />
        </React.Fragment>
      ))}
    </ScrollView>
  );
}
