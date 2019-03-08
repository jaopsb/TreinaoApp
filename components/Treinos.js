import React from 'react'
import dummy from '../Dummy.json'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { ScrollView, FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { deepPurple, green, blue, white } from '../colors'
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
        < FlatList
          style={{ flex: 1 }}
          data={treinos}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepPurple,
    flexDirection: 'column'
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  treinoContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: blue,
    borderColor: deepPurple,
    borderWidth: 3,
    borderRadius: 10
  },
  treinoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: green
  },
  typeText: {
    color: white,
    fontSize: 15
  }
})

const mapStateToProps = (state) => ({
  treinos: getListTrainAndTypes(state)
})

export default withNavigation(connect(mapStateToProps)(Treinos))