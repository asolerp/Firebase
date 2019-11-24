import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'react-native-elements'

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
  },
  leftTitle: {
    color: '#D21033',
    marginRight: 10,
    fontSize: 30,
  },
  rightTitle: {
    color: '#005293',
    fontSize: 30,
  },
})

const AppLogo = () => (
  <View>
    <Image source={require('../assets/panama.png')} style={{ width: 200, height: 300 }} />
    <View style={styles.titleContainer}>
      <Text style={styles.leftTitle}>Panama</Text>
      <Text style={styles.rightTitle}>Manager</Text>
    </View>
  </View>
)

export default AppLogo
