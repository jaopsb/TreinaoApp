import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';

class Treinar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => this.props.navigation.openDrawer()}>
          <Ionicons name='md-menu' color={"black"} size={40} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>EM BREVE</Text>
      </View>
    )
  }
}

export default Treinar