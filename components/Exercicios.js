import React from 'react'
import { ScrollView, TouchableOpacity, View, FlatList, Text } from 'react-native'
import { Card } from 'react-native-material-ui'
import styles from '../styles'
import { icon } from '../colors'
import { Feather } from '@expo/vector-icons'

class Exercicios extends React.Component {

  keyExtractor = (item, index) => item._id

  renderItem = (item, handleEdit) => {
    const { _id, rep, serie, type, name, charge, description } = item
    return (
      <View key={_id} style={{ flex: 1 }}>
        <Card >
          <Text style={styles.cardTitle}>{name}</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Carga: {charge}</Text>
            <Text style={styles.cardText}>Repetições: {rep}</Text>
            <Text style={styles.cardText}>Series: {serie}</Text>
            <Text style={styles.cardText}>Descrição: {description}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Grupo Muscular: {type}</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => handleEdit(_id)}>
              <Feather name='edit' size={30} color={icon} />
            </TouchableOpacity>
          </View>
        </Card >
      </View>
    )
  }
  render() {
    const { handleEdit, exercicios } = this.props
    return (
      <ScrollView>
        <FlatList
          data={exercicios}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => this.renderItem(item, handleEdit)}
        />
      </ScrollView>
    )
  }
}

export default Exercicios