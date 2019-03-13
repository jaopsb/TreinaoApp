import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native'
import { white, backGround, detail, darkGrayBrown } from '../colors'
import { getTrains, getTypes, validaExec } from '../helpers';

class NewExec extends React.Component {
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

  componentDidMount() {
    const { navigation } = this.props

    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        train: navigation.state.params.treino
      }
    }))
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


  handleChangeSerie = (text) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        serie: Number(text)
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

    let arrayValida = validaExec(exercicio)

    if (arrayValida.length > 2) {

      arrayValida = arrayValida.map(key => execNameKeys[key])
      Alert.alert(
        'Erro!',
        arrayValida.length === 0 ?
          `O campo ${arrayValida} esta vazio` :
          `Os campos ${arrayValida} estão vazios`,
        [
          { text: 'OK', style: 'cancel' }
        ]
      )
    } else {
      exercicio._id = uuid()
      Alert.alert(
        'Confirmar Treino',
        'Confirmar criação de Treino?',
        [
          {
            text: 'Sim', onPress: () => {
              this.props.addTreino(exercicio)
              this.props.navigation.navigate('TreinoInfo', { treino: exercicio.train })
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
          onChangeText={this.handleChangeCharge} />
        <TextInput
          style={styles.input}
          placeholder='Serie'
          keyboardType='number-pad'
          value={`${exercicio.serie}`}
          onChangeText={this.handleChangeSerie} />
        <TextInput
          style={styles.input}
          placeholder='Descrição'
          multiline={true}
          numberOfLines={3}
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
          selectedValue={exercicio.type === '' ? '0' : exercicio.type}
          onValueChange={this.handlePickType}>
          <Picker.Item key={'00'} label={'Escolha um Grupo'} value={'0'} />

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

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGround,
    flexDirection: 'column'
  },
  label: {
    width: '100%',
    textAlign: 'center',
    left: 5,
    fontSize: 20,
    color: 'black',
    top: 0,
  },
  input: {
    fontSize: 25,
    backgroundColor: darkGrayBrown,
    borderColor: darkGrayBrown,
    borderWidth: 3,
    borderRadius: 5,
    color: white,
    margin: 5,
    padding: 10
  },
  picker: {
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: '100%',
    backgroundColor: backGround
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
    backgroundColor: detail,
    borderRadius: 5
  }
})


const mapStateToProps = (state) => ({
  treinos: getTrains(state),
  gruposMusc: getTypes(state)
})

const mapDispatchToProps = (dispatch) => ({
  addTreino: (treino) => dispatch(addExec(treino))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewExec)