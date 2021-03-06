import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modalbox'
import { detail, icon } from '../colors';
import styles from '../styles'
import { ScrollView, Alert, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { filterExecsByTrain, filterTrackerByTrain } from '../helpers'
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
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
      'Descriçã',
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
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.cardTitle}>{name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ ...styles.cardText }}>
              {serie}x {rep}
              <MaterialCommunityIcons name='repeat' size={20} color='black' />
              {'\t'}
              {charge}
              <MaterialCommunityIcons name='weight' size={20} color='black' />
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.openModal(description)}>
                <MaterialCommunityIcons style={{ marginRight: 10 }} name='information-outline' color='blue' size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Edit', { id: _id })}>
                <MaterialCommunityIcons name='circle-edit-outline' size={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View >
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
                <Text style={tracker.includes(day) ? styles.badgeTracker : styles.badgeTrackerEmpty}>
                  {day}
                </Text>
              </TouchableOpacity>
            )
          }
        </View>

        <Modal
          style={{
            backgroundColor: '#FFF',
            // flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            height: '40%',
            width: '80%'
          }}
          onPress={this.closeModal}
          position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
          <Text style={{ ...styles.modalTitle, margin: 10 }}>Descrição</Text>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={styles.modalText}>{this.state.description}</Text>
          </View>
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
