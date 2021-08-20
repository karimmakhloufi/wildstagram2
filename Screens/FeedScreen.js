import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, Image } from "react-native";
import axios from "axios";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const filesUrl = await axios.get(
        "https://wildstagram.nausicaa.wilders.dev/list"
      );
      console.log("filesurls", filesUrl.data);
      setServerImagesUrls(filesUrl.data);
    })();
  }, [isFocused]);
  return (
    <FlatList
      style={{ padding: 10 }}
      data={serverImagesUrls}
      keyExtractor={(el) => el}
      renderItem={(item) => {
        return (
          <>
            <Image
              source={{
                uri:
                  "https://wildstagram.nausicaa.wilders.dev/files/" + item.item,
              }}
              key={item}
              style={{
                flex: 1,
                resizeMode: "cover",
                height: 400,
                padding: 50,
                marginBottom: 20,
              }}
            />
          </>
        );
      }}
    />
  );
}
