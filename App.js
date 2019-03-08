import React from 'react';
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import { View, StatusBar } from 'react-native';

import configureStore from './redux/store'

import RootNavigator from './views/Navigator';
import { purple } from './colors'


const store = configureStore()

const TreinaoStatusBar = (props) => {
  const { backgroundColor } = props
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <TreinaoStatusBar backgroundColor={purple} />
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}
