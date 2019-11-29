import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import AppContainer from './navigation'
import Firebase, { FirebaseProvider } from './config/Firebase'
import { UserProvider } from './config/User/UserContextManagement'

const initialUserState = {
  user: {
    name: 'alberto :)',
  },
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'updateProfile':
      return {
        ...state,
        user: action.userProfile,
      }
    default:
      return state
  }
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  useEffect(async () => {
    await Font.loadAsync({
      montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
      'montserrat-light': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    })
    setFontLoaded(true)
  }, [])

  return (
    <FirebaseProvider value={Firebase}>
      <UserProvider initialState={initialUserState} reducer={userReducer}>
        {fontLoaded && <AppContainer />}
      </UserProvider>
    </FirebaseProvider>
  )
}
