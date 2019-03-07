import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'

const RootNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarTitle: 'Home'
    }
  }
})

export default createAppContainer(RootNavigator) 