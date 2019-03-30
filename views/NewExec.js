import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import { Alert, KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native'
import { white, backGround, detail, darkGrayBrown } from '../colors'
import { getTrains, validaExec, emptyExercicio, gruposMusc, execNameKeys } from '../helpers';
import Exercicios from '../components/Exercicios';
import { handleAddExecs, handleAddExec, addExec, addExecs } from '../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';

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
      owner: '',
      deleted: false
    },
    emMassa: false,
    veioDeNovoTreino: false,
    editando: false,
    exerciciosSalvos: []
  }

  componentDidMount() {
    const { navigation } = this.props
    const { treino, emMassa, veioDeNovoTreino } = navigation.state.params

    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        train: treino,
      },
      emMassa,
      veioDeNovoTreino
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
    let { exercicio } = this.state
    const { treino } = this.props.navigation.state.params

    exercicio.train = treino

    let arrayValida = validaExec(exercicio)

    if (arrayValida.length) {

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

              this.props.addExercicio(exercicio)
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

  handleSaveNext = () => {
    let { exercicio } = this.state
    const { treino } = this.props.navigation.state.params

    exercicio.train = treino

    let arrayValida = validaExec(exercicio)

    if (arrayValida.length) {
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
      //hack
      exercicio._id = uuid()

      if (exercicio.description === '') exercicio.description = 'Sem descrição'

      this.setState(prevState => (
        {
          exercicio: emptyExercicio,
          exerciciosSalvos: [
            ...prevState.exerciciosSalvos,
            exercicio
          ]
        })
      )
    }
  }

  saveAll = () => {
    const { exerciciosSalvos } = this.state
    const { treino } = this.props.navigation.state.params

    if (exerciciosSalvos.length === 0)
      return Alert.alert(
        'NAAAAO',
        'Você tem que salvar pelo menos um exercicio!',
        [{ text: 'OK', style: 'cancel' }]
      )

    Alert.alert(
      'Salvar Treino',
      'Deseja salvar esse treino?',
      [
        {
          text: 'SIM',
          onPress: () => {
            this.props.addTreino(exerciciosSalvos)
            this.props.navigation.navigate('TreinoInfo', { treino })
          }
        },
        {
          text: 'Não', style: 'cancel'
        }
      ]
    )
  }

  handleEdit = (_id) => {
    const { exerciciosSalvos } = this.state

    this.setState({
      exercicio: exerciciosSalvos.find(exec => exec._id === _id),
      editando: true
    })
  }

  handleSaveEdit = () => {
    const { exercicio } = this.state

    this.setState(prevState => ({
      exercicio: emptyExercicio,
      editando: false,
      exercicios: [
        ...prevState.exerciciosSalvos.map(exec =>
          exec._id === exercicio._id ?
            exercicio :
            exec
        )
      ]
    }))

  }

  render() {
    const { treinos } = this.props
    const { treino } = this.props.navigation.state.params
    const { exercicio, emMassa, veioDeNovoTreino, editando } = this.state

    console.log('state', this.state)

    return (
      <ScrollView
        style={styles.container}>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={Header.HEIGHT + 10}>
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
          <Text style={[styles.input, { textAlign: 'center' }]}>{treino}</Text>

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

          {
            emMassa ?
              <View>

                <TouchableOpacity
                  onPress={this.handleSaveNext}>
                  <Text style={styles.buttonNewExec}>Salvar Exercicio e Criar mais </Text>
                </TouchableOpacity>
                {editando ?
                  <TouchableOpacity
                    onPress={this.handleSaveEdit}>
                    <Text style={styles.buttonNewExec}>Editar Exercicio</Text>
                  </TouchableOpacity> :
                  this.state.exerciciosSalvos.length > 0 &&
                  <TouchableOpacity
                    onPress={veioDeNovoTreino ? this.saveAll : this.saveOne}>
                    <Text style={styles.buttonNewExec}>Salvar Exercicios</Text>
                  </TouchableOpacity>

                }
              </View>
              :
              <TouchableOpacity
                onPress={this.handleSubmit}>
                <Text style={styles.submitButton}>Criar Exercicio</Text>
              </TouchableOpacity>
          }
          {
            emMassa ?
              <Text>Lista de exercicios ja feitos</Text> &&
              <Exercicios
                exercicios={this.state.exerciciosSalvos}
                handleEdit={this.handleEdit}
              />
              : null
          }

        </KeyboardAvoidingView>
      </ScrollView>
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
  },
  buttonNewExec: {
    margin: 5,
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

const mapDispatchToProps = (dispatch) => ({
  addExercicio: (treino) => dispatch(addExec(treino)),
  addTreino: (treino) => dispatch(addExecs(treino))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewExec)