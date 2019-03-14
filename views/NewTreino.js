import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import { Alert, View, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native'
import { white, backGround, detail, darkGrayBrown } from '../colors'
import { getTrains, getTypes, validaExec } from '../helpers';

class NewTreino extends React.Component {
  state = {
    treino: ''
  }

  changeTreino = (text) => this.setState({ treino: text })

  handleSubmit = () => {
    const { treino } = this.state
    const { treinos, navigation } = this.props
    if (treino === '') {
      return Alert.alert(
        'NAAAAO',
        'O nome do treino nao pode ser vazio!!',
        [{ text: 'OK', style: 'cancel' }]
      )
    }

    if (treinos.includes(treino)) {
      return Alert.alert(
        'NAAAAO',
        'Esse nome ja tem!!',
        [{ text: 'OK', style: 'cancel' }]
      )
    }

    navigation.navigate('NewExec', { treino, veioDeNovoTreino: true, emMassa: true })
  }

  render() {
    const { treino } = this.state
    return (
      <View style={styles.container}>
        <View style={{ top: 100, justifyContent: 'center' }}>

          <Text style={styles.title}>Nome do Treino</Text>
          <TextInput
            style={styles.input}
            placeholder=''
            value={treino}
            onChangeText={this.changeTreino} />

          <TouchableOpacity
            onPress={this.handleSubmit}>
            <Text style={styles.submitButton}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGround,
    flexDirection: 'column'
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    color: white
  },
  input: {
    fontSize: 25,
    backgroundColor: darkGrayBrown,
    borderColor: darkGrayBrown,
    borderWidth: 3,
    borderRadius: 5,
    color: white,
    margin: 10,
    padding: 10
  },
  submitButton: {
    margin: 30,
    textAlign: 'center',
    fontSize: 30,
    color: white,
    backgroundColor: detail,
    borderRadius: 5
  }
})

const mapStateToProps = (state) => ({
  treinos: getTrains(state)
})

export default connect(mapStateToProps)(NewTreino)