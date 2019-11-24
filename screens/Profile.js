import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: '100%',
  },
})

function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
      </View>
      <View style={styles.bottomWrapper}>
        <Text>Profile</Text>
      </View>
    </View>
  )
}

export default withFirebaseHOC(Profile)
