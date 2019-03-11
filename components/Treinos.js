import React from 'react'
import dummy from '../Dummy.json'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { ScrollView, FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { deepPurple, green, blue, white, gold } from '../colors'
import { getListTrainAndTypes } from '../helpers';

class Treinos extends React.Component {

  keyExtractor = (item, index) => `${index}`

  renderItem = ({ item }) => {
    const { navigation } = this.props
    return (
      Object.keys(item).map(key => (
        <TouchableOpacity key={`${key}`}
          onPress={() => navigation.navigate('TreinoInfo', { treino: key })}>
          <View style={styles.treinoContainer}>
            <Text style={styles.treinoTitle}>{key}</Text>
            {
              item[key].map(type => (
                <Text key={type + key}
                  style={styles.typeText}>{type}</Text>
              ))
            }
          </View >
        </TouchableOpacity>
      ))
    )
  }

  render() {
    const { treinos } = this.props
    return (
      <ScrollView>
        {
          treinos.length > 0 ?
            < FlatList
              style={{ flex: 1 }}
              data={treinos}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem} />
            :
            <Text style={styles.treinoTitle}>Não há treinos!</Text>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  treinoContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderColor: gold,
    borderBottomWidth: 3,
  },
  treinoTitle: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: green
  },
  typeContainer: {
    flexDirection: 'row'
  },
  typeText: {
    color: white,
    fontSize: 35
  }
})

const mapStateToProps = (state) => ({
  treinos: getListTrainAndTypes(state)
})

export default withNavigation(connect(mapStateToProps)(Treinos))