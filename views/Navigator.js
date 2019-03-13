import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { white, backGround } from '../colors'
import TreinoInfo from './TreinoInfo'
import NewExec from './NewExec';
import EditTrenio from './EditTreino';

const RootNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      },
    },
    TreinoInfo: {
      screen: TreinoInfo,
      navigationOptions: {
        header: null,
        title: 'Treino Info',
      }
    },
    NewExec: {
      screen: NewExec,
      navigationOptions: {
        title: 'Novo Exercicio'
      }
    },
    NewTreino: {
      screen: NewExec,
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
        backgroundColor: backGround,
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