import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
import useUser from '../hooks/useUser'

function Home(props) {
  const { error, loading, user } = useUser(props.firebase.currentUser().uid)
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
      <Text>Home</Text>
      <Text>{user && user.data().name}</Text>
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
})

export default withFirebaseHOC(Home)
