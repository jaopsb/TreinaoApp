import { createBottomTabNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { white, backGround, backGroundHeader } from '../colors'
import TreinoInfo from './TreinoInfo'
import NewExec from './NewExec'
import EditTrenio from './EditTreino'
import NewTreino from './NewTreino'
import ConfigTreino from './ConfigTreino'
import Config from './Config'
import Treinar from './Treniar';
import SideMenu from '../components/SideMenu';

const Tabs = createDrawerNavigator(
  {
    Treinos: {
      screen: HomeScreen
    },
    Treinar: {
      screen: Treinar
    },
    Configuracoes: {
      screen: Config
    }
  },
  {
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    contentComponent: SideMenu,
  }
)

const RootNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
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
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: backGroundHeader,
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 35,
      },
    }
  }
)

export default createAppContainer(RootNavigator) 