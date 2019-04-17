import React from 'react'
import dummy from '../Dummy.json'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { ScrollView, FlatList, View, Text, TouchableOpacity } from 'react-native'
import { getListTrainAndTypes, testTracker } from '../helpers';
import styles from '../styles'

class Treinos extends React.Component {

  keyExtractor = (item, index) => `${index}`

  renderItem = ({ item }) => {
    const { navigation, showSneakPeek } = this.props
    const key = Object.keys(item)[0]//nome do treino
    return (
      <TouchableOpacity
        key={`${key}`} style={styles.treinoContainer}
        onLongPress={() => showSneakPeek(key)}
        onPress={() => navigation.navigate('TreinoInfo', { treino: key })}>
        <View style={
          key.length > 4 ?
            styles.gridCol :
            styles.gridRow
        }>
          <Text style={
            key.length > 4 ?
              {
                ...styles.treinoTitle,
                width: '100%'
              } :
              styles.treinoTitle
          }>{key}</Text>
          <View style={{ flexDirection: 'column', margin: 5 }} >
            {
              item[key]
                .map(type => (
                  <Text
                    key={type + key}
                    style={styles.typeText}>{type}</Text>
                ))}
          </View>
        </View>
        {
          item.day &&
          <View style={styles.badgeTrackerContainer}>
            {
              item.day
                .sort((a, b) => a.id - b.id)
                .map((d, index) =>
                  <Text key={`${key}_${d.name}_${index}`} style={styles.badgeTracker}>{d.day}</Text>
                )
            }
          </View>
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { treinos, tracker } = this.props

    const treinosComTracker = treinos.map(tr => {
      const chave = Object.keys(tracker)
      //filtra o tracker para buscar todos os dias que tem o treino 
      tr.day = chave
        .filter(ch => tracker[ch].train !== null &&
          tracker[ch].train
            .find(name => Object.keys(tr)[0] === name))
        .map(day => ({ day, id: tracker[day].id }))
      return tr
    })

    //testTracker(treinos, tracker)

    return (
      <ScrollView>
        {
          treinos.length > 0 ?
            <FlatList
              style={{ flex: 1, margin: 10 }}
              data={treinosComTracker}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem} />
            :
            <Text style={styles.treinoTitle}>Não há treinos!</Text>
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ treinos, tracker }) => ({
  tracker,
  treinos: getListTrainAndTypes(treinos)
})

export default withNavigation(connect(mapStateToProps)(Treinos))