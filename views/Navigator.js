import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { white, purple } from '../colors'
import TreinoInfo from './TreinoInfo'

const RootNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Treinao APP',
        headerTitleStyle: {
          textAlign: 'center'
        }
      },
    },
    TreinoInfo: {
      screen: TreinoInfo,
      navigationOptions: {
        title: 'Treino Info',
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: purple,
      },
      headerTintColor: white,
      headerTitleStyle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 40,
      },
    }
  }
)

export default createAppContainer(RootNavigator) 