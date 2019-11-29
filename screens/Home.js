import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import useUser from '../hooks/useUser'

function Home(props) {
  const { error, loading, user } = useUser(props.firebase.currentUser().uid)

  if (user) {
    console.log('usuaro', user.data())
  }

  const handleSignout = async () => {
    try {
      await props.firebase.signOut()
      props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Text>{user && user.snapshot}</Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'montserrat-regular',
  },
})

export default withFirebaseHOC(Home)
