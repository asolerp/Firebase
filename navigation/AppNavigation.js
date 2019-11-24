import { createBottomTabNavigator } from 'react-navigation-tabs'

import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import ProfileForm from '../screens/ProfileForm'

const ProfileNavigation = createStackNavigator({
  Profile: { screen: Profile },
  ProfileForm: { screen: ProfileForm },
})

const AppNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Profile: ProfileNavigation,
  },
  {
    initialRouteName: 'Home',
  }
)

export default AppNavigation
