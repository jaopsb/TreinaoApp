import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native'
import { handleAddExecs } from '../redux/actions';
import { gold, deepPurple, green, white } from '../colors'
import { getTrains, getTypes, validaExec } from '../helpers';

class NewTreino extends React.Component {
  state = {
    exercicio: {
      name: '',
      charge: '',
      rep: '',
      serie: 0,
      type: '',
      train: '',
      _id: '',
      owner: ''
    }
  }

  handleChangeName = (text) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        name: text
      }
    }))
  }

  handleChangeRep = (text) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        rep: text
      }
    }))
  }

  handleChangeCharge = (text) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        charge: text
      }
    }))
  }

  handlePickTrain = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        train: itemValue
      }
    }))
  }

  handlePickType = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        type: itemValue
      }
    }))
  }

  handleChangeDescription = (text) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        description: text
      }
    }))
  }

  handleSubmit = () => {
    const { exercicio } = this.state

    const valArray = validaExec(exercicio)

    if (valArray.length > 0) {
      Alert.alert(
        'Erro!',
        valArray.length === 0 ?
          `O campo ${valArray} esta vazio` :
          `Os campos ${valArray} estão vazios`,
        [
          { text: 'OK', style: 'cancel' }
        ]
      )
    } else {
      Alert.alert(
        'Confirmar Treino',
        'Confirmar criação de Treino?',
        [
          {
            text: 'Sim', onPress: () => {
              this.props.addTreino(exercicio)
                .then(() => { this.props.navigation.navigate('Home') })
            }
          },
          {
            text: 'Não', style: 'cancel'
          }
        ]
      )
    }
  }

  render() {
    const { treinos, gruposMusc } = this.props
    const { exercicio } = this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={Header.HEIGHT + 10}
        style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Exercicio'
          value={exercicio.name}
          onChangeText={this.handleChangeName} />
        <TextInput
          style={styles.input}
          placeholder='Repetições'
          value={exercicio.rep}
          onChangeText={this.handleChangeRep} />
        <TextInput
          style={styles.input}
          placeholder='Carga'
          value={exercicio.charge}
          onChangeText={this.handleChangeName} />
        <TextInput
          style={styles.input}
          placeholder='Descrição'
          multiline={true}
          autoCapitalize='sentences'
          value={exercicio.description}
          onChangeText={this.handleChangeDescription} />

        <Text style={styles.label}>Treino</Text>
        <Picker
          selectedValue={exercicio.train}
          style={styles.picker}
          onValueChange={this.handlePickTrain}>
          {
            treinos.map(tr => (
              <Picker.Item key={tr} label={tr} value={tr} />
            ))
          }
        </Picker>

        <Text style={styles.label}>Grupo Muscular</Text>
        <Picker
          selectedValue={exercicio.type}
          onValueChange={this.handlePickType}>
          {
            gruposMusc.map(gr => (
              <Picker.Item key={gr} label={gr} value={gr} />
            ))
          }
        </Picker>

        <TouchableOpacity
          onPress={this.handleSubmit}>
          <Text style={styles.submitButton}>Criar Exercicio</Text>
        </TouchableOpacity>

        {
          //fazer lista de exercicios ja feitos
        }

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepPurple,
    flexDirection: 'column'
  },
  label: {
    width: '100%',
    textAlign: 'center',
    left: 5,
    fontSize: 20,
    color: gold,
    top: 0,
  },
  input: {
    fontSize: 25,
    borderColor: gold,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    color: white,
    margin: 5,
    padding: 10
  },
  picker: {
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: '100%',
    backgroundColor: deepPurple
  },
  pickerItem: {
    fontSize: 15,
    textAlign: 'center',
    color: white
  },
  submitButton: {
    margin: 30,
    textAlign: 'center',
    fontSize: 30,
    color: white,
    backgroundColor: green,
    borderRadius: 5
  }
})


const mapStateToProps = (state) => ({
  treinos: getTrains(state),
  gruposMusc: getTypes(state)
})

const mapDispatchToProps = (dispatch) => ({
  addTreino: (treino) => dispatch(handleAddExecs(treino))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTreino)