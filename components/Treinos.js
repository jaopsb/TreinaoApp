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
    return (
      Object.keys(item).map(key => (
        <Card key={`${key}`} >
          <TouchableOpacity
            onLongPress={() => showSneakPeek(key)}
            onPress={() => navigation.navigate('TreinoInfo', { treino: key })}>
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
        </Card>
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
              style={{ flex: 1, padding: 14 }}
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

const mapStateToProps = (state) => ({
  treinos: getListTrainAndTypes(state)
})

export default withNavigation(connect(mapStateToProps)(Treinos))