import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function ProfileForm() {
  return (
    <View style={styles.container}>
      <Text>Hola</Text>
    </View>
  )
}

export default ProfileForm
