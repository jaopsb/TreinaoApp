import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View, Alert, TextInput, Text, StyleSheet } from 'react-native'
import { validaExec, execNameKeys } from '../helpers';
import { deepPurple, gold, white, green } from '../colors';

class EditTrenio extends React.Component {

  state = {
    exercicio: {
      name: '',
      charge: '',
      rep: '',
      serie: '',
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

  //verifica se as condicoes estao satisfeitas, e edita o exercicio
  onSubmit = () => {
    const { exercicio } = this.state
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
    }
  }

  render() {
    const { exercicio } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Exercicio</Text>
            <TextInput
              style={styles.input}
              value={exercicio.name}
              placeholder="Nome do Exercicio"
              onChangeText={this.onChangeName} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Repetições</Text>
            <TextInput
              style={styles.input}
              value={exercicio.rep}
              placeholder="Repetições"
              onChangeText={this.onChangeRep} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Carga</Text>
            <TextInput
              style={styles.input}
              value={exercicio.charge}
              placeholder="Carga"
              onChangeText={this.onChangeCharge} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Series</Text>
            <TextInput
              style={styles.input}
              value={`${exercicio.serie}`}
              placeholder="Series"
              onChangeText={this.onChangeSerie} />
          </View>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={this.onSubmit}>
            <Text style={styles.submitButton}>Editar</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepPurple
  },
  wrapper: {
    margin: 3,
    marginTop: 10
  },
  inputWrapper: {
    flexDirection: 'column'
  },
  label: {
    left: 5,
    fontSize: 15,
    color: gold,
    top: 0,
  },
  input: {
    fontSize: 30,
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

export default connect(mapStateToProps)(EditTrenio)