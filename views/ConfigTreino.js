import React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'react-native-material-textfield'
import { Alert, View, TouchableOpacity, Text } from 'react-native'
import styles from '../styles'
import { delExec, editExec } from '../redux/actions';
import { AdMobInterstitial } from 'expo-ads-admob';
import { testeInterBannerUnitId, interBannerFreeUnitId } from '../helpers';

AdMobInterstitial.setAdUnitID(interBannerFreeUnitId)

class ConfigTreino extends React.Component {
  state = {
    treino: ''
  }

  componentWillReceiveProps(nextProps) {
    const { treinoAntigo } = nextProps
    this.setState({ treino: treinoAntigo })
  }

  componentDidMount() {
    const { treinoAntigo } = this.props
    this.setState({ treino: treinoAntigo })
  }

  handleChangeName = (text) => {
    this.setState({
      treino: text
    })
  }

  showAdAsync = async () => {
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();

  }

  changeTrainName = () => {
    const { treino } = this.state
    const { treinos, treinoAntigo, dispatch, navigation } = this.props

    if (treino === '' || treino.match(/^ *$/) !== null)
      return Alert.alert(
        'Erro',
        'O treino não pode ficar sem nome!!!!',
        [
          { text: 'Ok, me desculpe', style: 'cancel' }
        ]
      )

    Alert.alert(
      "Confirmar",
      `Deseja trocar o nome ${treinoAntigo} para ${treino}?`,
      [
        { text: "Não", style: 'cancel' },
        {
          text: "Sim",
          onPress: () => {
            treinos.map(exec => {
              dispatch(editExec({
                ...exec,
                train: treino
              }))
            })

            navigation.navigate('TreinoInfo', { treino })
          }
        }
      ]
    )
  }

  deleteTrain = () => {
    const { treino } = this.state
    const { treinos, dispatch, navigation } = this.props
    Alert.alert(
      "Deletar",
      `Deseja deletar o treino ${treino}?`,
      [
        { text: "Não", style: 'cancel' },
        {
          text: "Sim",
          onPress: () => {
            treinos.map(exec => {
              dispatch(delExec(exec._id))
            })

            this.showAdAsync()
              .then(() => navigation.navigate('Home'))
              .catch(() => navigation.navigate('Home'))
          }
        }
      ]
    )
  }

  render() {
    const { treino } = this.state
    return (
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
          <TextField
            style={styles.input}
            label='Nome do Treino'
            value={treino}
            numberOfLines={1}
            multiline={true}
            returnKeyType='default'
            onChangeText={this.handleChangeName} />

          <TouchableOpacity
            onPress={this.changeTrainName}>
            <Text style={styles.submitButton}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.deleteTrain}>
            <Text style={styles.delButton}>Excluir Treino</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ treinos }, props) => {
  const treinoAntigo = props.navigation.state.params.treino
  return ({
    treinoAntigo,
    treinos: treinos.filter(exec => exec.train === treinoAntigo)
  })
}

export default connect(mapStateToProps)(ConfigTreino)