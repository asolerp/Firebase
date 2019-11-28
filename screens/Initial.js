/* eslint react/prop-types: 0 */

import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { withFirebaseHOC } from '../config/Firebase'
import { useStateValue } from '../config/User/UserContextManagement'

function Initial(props) {
  const [isAssetsLoadingComplete, setIsAssetsLoadingComplete] = useState(false)
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    async function checkStatusAuth() {
      try {
        // previously
        loadLocalAsync()

        await props.firebase.checkUserAuth(async user => {
          if (user) {
            const userProfile = await props.firebase.getUserProfile(user.uid)
            dispatch({
              type: 'updateProfile',
              userProfile: userProfile.data(),
            })
            if (userProfile.data().firstLogin) {
              // if first logged in
              props.navigation.navigate('ProfileForm')
            } else {
              // if the user has previously logged in
              props.navigation.navigate('App')
            }
          } else {
            // if the user has previously signed out from the app
            props.navigation.navigate('Auth')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    checkStatusAuth()
  }, [])

  const loadLocalAsync = async () => {
    await Promise.all([
      Asset.loadAsync([require('../assets/panama.png'), require('../assets/icon.png')]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
      }),
    ])
  }

  const handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  const handleFinishLoading = () => {
    setIsAssetsLoadingComplete(true)
  }

  return (
    <AppLoading
      startAsync={loadLocalAsync}
      onFinish={handleFinishLoading}
      onError={handleLoadingError}
    />
  )
}

export default withFirebaseHOC(Initial)
