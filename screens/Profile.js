import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { withFirebaseHOC } from "../config/Firebase";
import BlurBackgroundWithAvatar from "../components/BlurBackgroundWithAvatar";

const backgroundUrl =
  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg";
const avatarUrl =
  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  topWrapper: {
    flex: 1,
    width: "100%"
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

function Profile(props) {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${props.firebase.currentUser().uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        {value && (
          <BlurBackgroundWithAvatar
            backgroundUrl={value.data().imageProfile}
            avatarUrl={value.data().imageProfile}
            title={value.data().name}
            subtitle={value.data().position}
          />
        )}
      </View>
      <View style={styles.bottomWrapper}>
        <Button
          onPress={() => props.navigation.navigate("ProfileForm")}
          title="Editar Perfil"
          type="outline"
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
}

export default withFirebaseHOC(Profile);
