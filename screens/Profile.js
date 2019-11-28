import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { withFirebaseHOC } from '../config/Firebase'
import BlurBackgroundWithAvatar from '../components/BlurBackgroundWithAvatar'
import useUser from '../hooks/useUser'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWrapper: {
    flex: 1,
    width: '100%',
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

function Profile(props) {
  const { error, loading, user } = useUser(props.firebase.currentUser().uid)

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        {user && (
          <BlurBackgroundWithAvatar
            backgroundUrl={user.data().imgProfile}
            avatarUrl={user.data().imgProfile}
            title={user.data().name}
            subtitle={user.data().position}
          />
        )}
      </View>
      <View style={styles.bottomWrapper}>
        <Button
          onPress={() => props.navigation.navigate('ProfileForm')}
          title="Editar Perfil"
          type="outline"
        />
      </View>
    </View>
  )
}

export default withFirebaseHOC(Profile)
