import React from 'react'
import { connect } from 'react-redux'
import { Alert, View, TextInput, TouchableOpacity, Text } from 'react-native'



class ConfigTreino extends React.Component {
  state = {
    treino: ''
  }

  componentWillReceiveProps(nextProps) {
    const { treino } = nextProps.navigation.state.params
    this.setState({ treino })
  }

  handleChangeName = (text) => {
    this.setState({
      treino: text
    })
  }

  changeTrain = () => {
    const { treino } = this.state
    const { treinos, treinoAntigo } = this.props

    Alert.alert(
      "Confirmar",
      `Deseja trocar o nome ${treinoAntigo} para ${treino}?`,
      [
        { text: "Não", style: 'cancel' },
        {
          text: "Sim",
          onPress: () => {
            treinos.map(exec => {
              this.props.editExec({
                ...exec,
                train: treino
              })
            })

            this.props.navigation.navigate('TreinoInfo', { treino })
          }
        }
      ]
    )
  }

  render() {
    const { treino } = this.state
    return (
      <View style={styles.container}>
        <Text>Config</Text>
        <TextInput
          style={styles.input}
          placeholder='Nome do Treino'
          value={treino}
          onChangeText={this.handleChangeName} />

        <TouchableOpacity
          onPress={this.changeTrain}>
          <Text>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Excluir Treino</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const treinoAntigo = props.navigation.state.params.treino
  return ({
    treinoAntigo,
    treinos: state.filter(exec => exec.train === treinoAntigo)
  })
}

export default connect(mapStateToProps)(ConfigTreino)