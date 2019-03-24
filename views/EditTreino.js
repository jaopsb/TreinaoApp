import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TouchableOpacity, Alert, TextInput, Text, StyleSheet } from 'react-native'
import { validaExec, execNameKeys } from '../helpers'
import { gold, styleText, green, backGround, detail, white, darkGrayBrown } from '../colors'
import { editExec, handleEditExec, delExec } from '../redux/actions'

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


  onDelete = () => {
    const { exercicio } = this.state
    const { dispatch, navigation, treinoLenght } = this.props

    //definindo qual rota tomar, se nao tem mais nenhum exercicio no treino,vai para home, senao chama a tela de info
    const url = treinoLenght > 1 ? "TreinoInfo" : "Home"

    const msg = "Deseja deletar o exercício \"" + exercicio.name + "\"?\n " + (treinoLenght === 1 ?
      'Lembrando que o treino só contém este exercicio, se o apagar você terá que criar um novo treino' : '')

    Alert.alert(
      "Apagar",
      msg,
      [
        {
          text: "Sim",
          onPress: () => {
            dispatch(delExec(exercicio._id))
            navigation.navigate(
              url,
              //define parametro se existe mais exercicios no treino, chama a tela de info
              treinoLenght > 1 ?
                { treino: exercicio.train } :
                null
            )
          }
        },
        {
          text: "Não",
          style: 'cancel'
        }
      ]
    )

  }

  render() {
    const { exercicio } = this.state
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
          style={[styles.input, { padding: 3 }]}
          multiline={true}
          autoCapitalize='sentences'
          value={exercicio.description}
          placeholder="Descrição"
          onChangeText={this.onChangeDescription} />

        <TouchableOpacity
          onPress={this.onSubmit}>
          <Text style={styles.submitButton}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onDelete}>
          <Text style={styles.delButton}>Deletar exercicio</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: backGround
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
    color: detail,
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
    padding: 3
  },
  submitButton: {
    margin: 30,
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: detail,
    borderRadius: 5
  },
  delButton: {
    margin: 2,
    textAlign: 'center',
    fontSize: 20,
    color: 'red'
  }
})

const mapStateToProps = (state, { navigation }) => ({
  treinoLenght: state.length,
  exercicio: state.find(exec => exec._id === navigation.state.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  editExec: (exec) => dispatch(handleEditExec(exec))
})

export default connect(mapStateToProps)(EditTrenio)