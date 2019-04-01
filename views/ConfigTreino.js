import React from 'react'
import { connect } from 'react-redux'
import { Alert, View, TextInput, TouchableOpacity, Text } from 'react-native'
import styles from '../styles'
import { delExec, editExec } from '../redux/actions';
import { AdMobInterstitial } from 'expo-ads-admob';
import { interBannerUid } from '../helpers';

AdMobInterstitial.setAdUnitID(interBannerUid);
AdMobInterstitial.setTestDeviceID('EMULATOR');
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

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  showInterstitial = async () => {
    await AdMobInterstitial.requestAdAsync()
    await AdMobInterstitial.showAdAsync()
  }


  handleChangeName = (text) => {
    this.setState({
      treino: text
    })
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

            navigation.navigate('Home')
          }
        }
      ]
    )
  }

  render() {
    const { treino } = this.state
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { marginTop: 40 }]}
          placeholder='Nome do Treino'
          value={treino}
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