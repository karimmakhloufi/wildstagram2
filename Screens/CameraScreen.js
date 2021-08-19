import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button
        title="Take a picture"
        onPress={async () => {
          if (cameraRef) {
            const photoData = await cameraRef.current.takePictureAsync({
              quality: 0,
            });
            console.log("photo data", photoData);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
