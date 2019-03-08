import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { white, purple } from '../colors'
import TreinoInfo from './TreinoInfo'
import NewTreino from './NewTreino';
import EditTrenio from './EditTreino';

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
    },
    New: {
      screen: NewTreino,
      navigationOptions: {
        title: 'Novo Treino'
      }
    },
    Edit: {
      screen: EditTrenio,
      navigationOptions: {
        title: "Editar Exercicio"
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