import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../styles';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, Image, View } from 'react-native';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/dumbell.png')}
          />
          <Text style={styles.logoTitle}>Treinão App</Text>
        </View>
        <ScrollView>
          <View style={styles.sideMenuContainer}>
            <Text style={styles.sideMenuText} onPress={this.navigateToScreen('Treinos')}>
              Treinos
              </Text>
          </View>
          {/* AINDA NAO FOI FEITO
          <View style={styles.sideMenuContainer}>
            <Text style={styles.sideMenuText} onPress={this.navigateToScreen('Treinar')}>
              Treinar
              </Text>
          </View> 
          */}
          <View style={styles.sideMenuContainer}>
            <Text style={styles.sideMenuText} onPress={this.navigateToScreen('Configuracoes')}>
              Configurações
              </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;