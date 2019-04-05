import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-native-material-ui'
import Modal from 'react-native-modalbox'
import { white, detail, green, backGround, icon, title, darkGrayBrown, } from '../colors';
import styles from '../styles'
import { ScrollView, Alert, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { filterExecsByTrain } from '../helpers'
import { Feather, Ionicons } from '@expo/vector-icons'

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
          <Card style={styles.cardContainer}>
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
                <Feather name='edit' size={30} color={icon} />
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { treino } = this.props.navigation.state.params
    const { treinos, navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeTitle}>{treino}</Text>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Home')}>
          <Ionicons name='md-arrow-round-back' color={white} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.configBtn}
          onPress={() => navigation.navigate('ConfigTreino', { treino })}>
          <Ionicons name='md-settings' color={"black"} size={40} />
        </TouchableOpacity>

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

        <TouchableOpacity
          onPress={() => navigation.navigate('NewExec', { treino, eMassa: false, veioDeNovoTreino: false })}        >
          <Text style={styles.submitButton}>Novo Exercicio</Text>
        </TouchableOpacity>

      </View>
    )
  }
}


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