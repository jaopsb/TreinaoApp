import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TouchableOpacity, Alert, TextInput, Text, StyleSheet } from 'react-native'
import { validaExec, execNameKeys } from '../helpers'
import { deepPurple, gold, white, green } from '../colors'
import { editExec, handleEditExec } from '../redux/actions'

class EditTrenio extends React.Component {

  state = {
    exercicio: {
      name: '',
      charge: '',
      rep: '',
      serie: '',
      description: ''
    }
  }

  //popula o estado com o exercicio vindo do redux
  componentDidMount() {
    const { exercicio } = this.props
    this.setState({ exercicio })
  }

  //funcoes de mudanca de estado para cada letra inserida/retirada no input
  onChangeName = (text) => this.setState(prevState => ({
    exercicio: {
      ...prevState.exercicio,
      name: text
    }
  }))

  onChangeRep = (text) => this.setState(prevState => ({
    exercicio: {
      ...prevState.exercicio,
      rep: text
    }
  }))

  onChangeSerie = (text) => this.setState(prevState => ({
    exercicio: {
      ...prevState.exercicio,
      serie: Number(text)
    }
  }))

  onChangeCharge = (text) => this.setState(prevState => ({
    exercicio: {
      ...prevState.exercicio,
      charge: text
    }
  }))

  onChangeDescription = (text) => this.setState(prevState => ({
    exercicio: {
      ...prevState.exercicio,
      description: text
    }
  }))

  //verifica se as condicoes estao satisfeitas, e edita o exercicio
  onSubmit = () => {
    const { exercicio } = this.state
    const { dispatch, navigation } = this.props
    let arrayValida = validaExec(exercicio)

    if (arrayValida.length > 0) {
      //troca a propriedade do objeto pelo nome correto para o usuario
      arrayValida = arrayValida.map(key => execNameKeys[key])

      //alerta o erro
      Alert.alert(
        'Erro',
        arrayValida.length === 1 ?
          `O campo ${arrayValida} nao pode ser vazio` :
          `Os campos ${arrayValida} estão vazios`,
        [
          { text: 'OK', style: 'cancel' }
        ]
      )
    } else {
      dispatch(editExec(exercicio))

      navigation.navigate("TreinoInfo", { treino: exercicio.train })
    }
  }

  render() {
    const { exercicio } = this.state
    console.log(exercicio)
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}>
        <TextInput
          style={styles.input}
          value={exercicio.name}
          placeholder="Nome do Exercicio"
          onChangeText={this.onChangeName} />
        <TextInput
          style={styles.input}
          value={exercicio.rep}
          placeholder="Repetições"
          onChangeText={this.onChangeRep} />
        <TextInput
          style={styles.input}
          value={exercicio.charge}
          placeholder="Carga"
          onChangeText={this.onChangeCharge} />
        <TextInput
          style={styles.input}
          value={`${exercicio.serie}`}
          placeholder="Series"
          onChangeText={this.onChangeSerie} />

        <TextInput
          style={styles.input}
          multiline={true}
          autoCapitalize='sentences'
          value={exercicio.description}
          placeholder="Descrição"
          onChangeText={this.onChangeDescription} />

        <TouchableOpacity
          onPress={this.onSubmit}>
          <Text style={styles.submitButton}>Editar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-around',
    backgroundColor: deepPurple
  },
  wrapper: {
    flex: 1,
    margin: 3,
    marginTop: 10
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  label: {
    left: 5,
    fontSize: 15,
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
    padding: 3
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

const mapStateToProps = (state, { navigation }) => ({
  exercicio: state.find(exec => exec._id === navigation.state.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  editExec: (exec) => dispatch(handleEditExec(exec))
})

export default connect(mapStateToProps)(EditTrenio)