import React, { useEffect, useState } from 'react'
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
  return (
    <FirebaseProvider value={Firebase}>
      <UserProvider initialState={initialUserState} reducer={userReducer}>
        <AppContainer />
      </UserProvider>
    </FirebaseProvider>
  )
}
