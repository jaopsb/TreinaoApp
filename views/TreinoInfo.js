import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modalbox'
import { deepPurple, gold, purple, white, blue } from '../colors';
import { ScrollView, Alert, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { filterExecsByTrain } from '../helpers'
import { Feather } from '@expo/vector-icons'

class TreinoInfo extends React.Component {
  state = {
    description: '',
    toggleDescription: false,
    isDisabled: false
  }

  toggleDescription = (description) => {
    Alert.alert(
      'Descrição do Exercicio',
      description,
      [
        { text: 'ok', style: 'cancel' }
      ]
    )
  }

  openModal = (description) => {

    this.setState({ description })
    this.refs.modal3.open()
  }

  closeModal = () => this.refs.modal3.close()

  keyExtractor = (item, index) => item._id

  renderItem = ({ item }) => {
    const { _id, rep, serie, type, name, charge, description } = item

    return (
      <View key={_id} style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.openModal(description)}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{name}</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>Carga: {charge}</Text>
              <Text style={styles.cardText}>Repetições: {rep}</Text>
              <Text style={styles.cardText}>Series: {serie}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>Grupo Muscular: {type}</Text>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => this.props.navigation.navigate('Edit', { id: _id })}>
                <Feather name='edit' size={30} color={blue} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { treino } = this.props.navigation.state.params
    const { treinos } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeTitle}>{treino}</Text>
        </View>

        <Modal style={styles.modal} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
          <Text style={styles.modalTitle}>Descrição</Text>
          <Text style={styles.modalText}>{this.state.description}</Text>
          <TouchableOpacity
            onPress={this.closeModal}
            style={styles.btn}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </Modal>

        <ScrollView>
          <FlatList
            data={treinos}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepPurple,
  },
  btn: {
    margin: 10,
    justifyContent: 'flex-end'
  },
  btnText: {
    fontSize: 15,
    color: white,
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: deepPurple,
    alignItems: 'center',
    height: 250,
    width: 350
  },
  modalTitle: {
    color: gold,
    fontSize: 40,
    justifyContent: 'center',
  },
  modalText: {
    justifyContent: 'center',
    padding: 10,
    fontSize: 25,
    color: white,
  },
  badge: {
    top: 1,
    margin: 3,
    width: '100%',
    padding: 3,
    borderRadius: 5,
    backgroundColor: purple,
  },
  badgeTitle: {
    color: gold,
    fontSize: 40,
    alignSelf: 'center',
  },
  cardContainer: {
    margin: 5,
    paddingTop: 5,
    paddingLeft: 5,
    borderColor: gold,
    borderBottomWidth: 1,
    borderLeftWidth: 1
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
  descriptionContainer: {
    margin: 10,
    padding: 5,
    borderColor: white,
    borderWidth: 1,
  },
  descriptionText: {
    fontSize: 20,
    color: white
  }
})

const mapStateToProps = (state, { navigation }) => ({
  treinos: filterExecsByTrain(state, navigation.state.params.treino)
})
export default connect(mapStateToProps)(TreinoInfo)


/*
Guardado para depois -> criar modal
{
    toggleDescription && idDescription === _id &&
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  }
  */