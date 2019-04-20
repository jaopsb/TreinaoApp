import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modalbox'
import { detail, icon } from '../colors';
import styles from '../styles'
import { ScrollView, Alert, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { filterExecsByTrain, filterTrackerByTrain } from '../helpers'
import { Feather, Ionicons } from '@expo/vector-icons'
import { addTrain, delTrain } from '../redux/actions';

const week = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]
class TreinoInfo extends React.Component {
  state = {
    description: '',
    toggleDescription: false,
    isDisabled: false,
    tracker: []
  }

  componentDidMount() {
    const { tracker } = this.props
    this.setState({ tracker })
  }

  componentWillReceiveProps(newProps) {
    const { tracker } = newProps
    this.setState({ tracker })
  }

  toggleTracker = (day) => {
    const { treino } = this.props.navigation.state.params
    const { tracker } = this.state

    if (tracker.includes(day)) {
      this.props.dispatch(delTrain(day, treino))
    } else {
      this.props.dispatch(addTrain(day, treino))
    }
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

  toggleTracker = (day) => {
    const { treino } = this.props.navigation.state.params
    const { tracker } = this.state

    if (tracker.includes(day)) {
      this.props.dispatch(delTrain(day, treino))
    } else {
      this.props.dispatch(addTrain(day, treino))
    }
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
      <View key={_id} style={styles.treinoContainer}>
        <TouchableOpacity
          onPress={() => this.openModal(description)}>
          <Text style={styles.cardTitle}>{name}</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Carga: {charge}</Text>
            <Text style={styles.cardText}>Repetições: {rep}</Text>
            <Text style={styles.cardText}>Series: {serie}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Grupo Muscular: {type}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => this.props.navigation.navigate('Edit', { id: _id })}>
          <Feather name='edit' size={45} color={icon} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { treino } = this.props.navigation.state.params
    const { treinos, navigation } = this.props
    const { tracker } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeTitle}>{treino}</Text>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Home')}>
          <Ionicons name='md-arrow-round-back' color={detail} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.configBtn}
          onPress={() => navigation.navigate('ConfigTreino', { treino })}>
          <Ionicons name='md-settings' color={"black"} size={40} />
        </TouchableOpacity>

        <View style={styles.trackerContainer}>
          {
            //verifica se algum dia da semana existe no tracker
            //se existe, o treino esta marcado para esse dia
            week.map(day =>
              <TouchableOpacity
                key={day}
                onPress={() => { this.toggleTracker(day) }}>
                <Text
                  style={
                    tracker.includes(day) ?
                      styles.badgeTracker :
                      styles.badgeTrackerEmpty
                  }
                >{day}</Text>
              </TouchableOpacity>
            )
          }
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
            style={{ flex: 1, margin: 10 }}
            data={treinos}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewExec', { treino, eMassa: false, veioDeNovoTreino: false })}        >
          <Text style={styles.submitButton}>Novo Exercicio</Text>
        </TouchableOpacity>

      </View>
    )
  }
}


const mapStateToProps = ({ treinos, tracker }, { navigation }) => ({
  tracker: filterTrackerByTrain(tracker, navigation.state.params.treino),
  treinos: filterExecsByTrain(treinos, navigation.state.params.treino)
})
export default connect(mapStateToProps)(TreinoInfo)
