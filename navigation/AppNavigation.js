import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from '../screens/Home'
import Profile from '../screens/Profile'

const AppNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile },
  },
  {
    initialRouteName: 'Home',
  }
)

export default AppNavigation
