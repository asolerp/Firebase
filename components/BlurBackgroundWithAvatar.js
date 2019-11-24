import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topBackgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 63, 63, .6)',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
  },
})

function BlurBackgroundWithAvatar(props) {
  return (
    <ImageBackground
      source={{
        uri: props.backgroundUrl,
      }}
      blurRadius={4}
      style={styles.container}
    >
      <View style={styles.topBackgroundImage}>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: props.avatarUrl,
          }}
        />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </ImageBackground>
  )
}

export default BlurBackgroundWithAvatar
