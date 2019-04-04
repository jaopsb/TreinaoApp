import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { white, backGround } from '../colors'
import TreinoInfo from './TreinoInfo'
import NewExec from './NewExec'
import EditTrenio from './EditTreino'
import NewTreino from './NewTreino'
import ConfigTreino from './ConfigTreino'
import Config from './Config'
import PrivacyPolicy from './PrivacyPolicy'

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
    },
    ConfigTreino: {
      screen: ConfigTreino,
      navigationOptions: {
        title: "Treino"
      }
    },
    Config: {
      screen: Config,
      navigationOptions: {
        title: "Configurações"
      }
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: "Política de Privacidade",
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold'
        }
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