import React from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, View, FlatList, Text } from 'react-native'
import { darkGrayBrown, white, icon } from '../colors';
import { Feather } from '@expo/vector-icons'

class Exercicios extends React.Component {

  keyExtractor = (item, index) => item._id

  renderItem = (item, handleEdit) => {
    const { _id, rep, serie, type, name, charge, description } = item
    return (
      <View key={_id} style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
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
        </View>
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

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: darkGrayBrown,
    borderColor: darkGrayBrown,
    borderWidth: 5,
    borderRadius: 5
  },
  cardTitle: {
    fontSize: 30,
    color: white
  },
  cardRow: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 2
  },
  cardText: {
    margin: 2,
    fontSize: 15,
    color: white
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 3
  },
})

export default Exercicios