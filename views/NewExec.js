import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import styles from '../styles'
import { TextField } from 'react-native-material-textfield'
import { Alert, ScrollView, KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native'
import { white, backGround, detail, darkGrayBrown } from '../colors'
import { getTrains, validaExec, emptyExercicio, gruposMusc, execNameKeys, VALID_SPACE } from '../helpers';
import Exercicios from '../components/Exercicios';
import { addExec, addExecs } from '../redux/actions';

class NewExec extends React.Component {
  state = {
    exercicio: {
      name: '',
      charge: '',
      rep: '',
      serie: 0,
      description: '',
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

    if (exercicio.name.match(VALID_SPACE).length > 0)
      arrayValida.concat('name')

    if (arrayValida.length) {

      arrayValida = arrayValida.map(key => execNameKeys[key])

      Alert.alert(
        'Erro!',
        arrayValida.length > 1 ?
          `Os campos ${arrayValida} estão vazios` :
          `O campo ${arrayValida} esta vazio`,
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

    if (exercicio.name.match(VALID_SPACE))
      arrayValida.push('name')

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

      if (exercicio.description === ' ')
        exercicio.description = 'Sem descrição'

      this.setState(prevState => (
        {
          exerciciosSalvos: [
            ...prevState.exerciciosSalvos,
            exercicio
          ],
          exercicio: emptyExercicio,
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
      editando: false,
      exercicios: [
        ...prevState.exerciciosSalvos.map(exec =>
          exec._id === exercicio._id ?
            exercicio :
            exec
        )
      ],
      exercicio: emptyExercicio
    }))

  }

  render() {
    const { treino } = this.props.navigation.state.params
    const { exercicio, emMassa, veioDeNovoTreino, editando } = this.state

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 30}>
        <ScrollView
          style={{ margin: 10 }}>
          <Text style={styles.newTreinoTitle}>Treino: {treino}</Text>
          <Text style={{ fontSize: 15 }}>Crie pelo menos um exercicio para salvar o treino</Text>
          <TextField
            style={styles.input}
            label='Exercicio'
            multiline={true}
            numberOfLines={1}
            value={exercicio.name}
            onChangeText={this.handleChangeName} />
          <TextField
            style={styles.input}
            label='Repetições'
            multiline={true}
            numberOfLines={1}
            value={exercicio.rep}
            onChangeText={this.handleChangeRep} />
          <TextField
            style={styles.input}
            label='Carga'
            multiline={true}
            numberOfLines={1}
            value={exercicio.charge}
            onChangeText={this.handleChangeCharge} />
          <TextField
            style={styles.input}
            label='Serie'
            keyboardType='number-pad'
            multiline={true}
            numberOfLines={1}
            value={`${exercicio.serie}`}
            onChangeText={this.handleChangeSerie} />
          <TextField
            style={styles.input}
            label='Descrição (Opcional)'
            multiline={true}
            numberOfLines={1}
            multiline={true}
            numberOfLines={3}
            autoCapitalize='sentences'
            value={exercicio.description}
            onChangeText={this.handleChangeDescription} />

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
                  <Text style={styles.buttonNewExec}>Salvar Exercicio </Text>
                </TouchableOpacity>
                {
                  editando ?
                    <TouchableOpacity
                      onPress={this.handleSaveEdit}>
                      <Text style={styles.buttonNewExec}>Editar Exercicio</Text>
                    </TouchableOpacity> :
                    this.state.exerciciosSalvos.length > 0 &&
                    <TouchableOpacity
                      onPress={veioDeNovoTreino ? this.saveAll : this.saveOne}>
                      <Text style={styles.buttonNewExec}>Salvar Treino</Text>
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
              <View>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>Exercicios Criados</Text>
                <Exercicios
                  exercicios={this.state.exerciciosSalvos}
                  handleEdit={this.handleEdit}
                />
              </View>
              : null
          }

        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({ treinos }) => ({
  treinos: getTrains(treinos)
})

const mapDispatchToProps = (dispatch) => ({
  addExercicio: (treino) => dispatch(addExec(treino)),
  addTreino: (treino) => dispatch(addExecs(treino))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewExec)