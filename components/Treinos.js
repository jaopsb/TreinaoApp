import React from 'react'
import dummy from '../Dummy.json'
import { connect } from 'react-redux'
import { Card } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import { ScrollView, FlatList, View, Text, TouchableOpacity } from 'react-native'
import { getListTrainAndTypes } from '../helpers';
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
        {
          item.day &&
          <View style={styles.badgeTrackerContainer}>
            {
              item.day.map((d, index) =>
                <Text key={`${key}_${d}_${index}`} style={styles.badgeTracker}>{d}</Text>
              )
            }
          </View>
        }
        <Text style={styles.treinoTitle}>{key}</Text>
        <View style={{ margin: 10 }}>
          {
            item[key].map(type => (
              <Text key={type + key}
                style={styles.typeText}>{type}</Text>
            ))
          }
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { treinos, tracker } = this.props

    const treinosComTracker = treinos.map(tr => {
      const chave = Object.keys(tracker)
      //filtra o tracker para buscar todos os dias que tem o treino 
      tr.day = chave
        .filter(ch => tracker[ch].train !== null
          && tracker[ch].train.find(name => Object.keys(tr)[0] === name))
      return tr
    })

    return (
      <ScrollView>
        {
          treinos.length > 0 ?
            < FlatList
              style={{ flex: 1, padding: 14 }}
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