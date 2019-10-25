import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'react-navigation-stack'
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Text,
  ScrollView,
  StatusBar
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { TextField } from 'react-native-material-textfield'
import { validaExec, execNameKeys } from '../helpers'
import { handleEditExec, delExec } from '../redux/actions'
import styles from '../styles';
import { AdMobInterstitial } from 'expo-ads-admob';
import { testeInterBannerUnitId, interBannerFreeUnitId } from '../helpers';

AdMobInterstitial.setAdUnitID(interBannerFreeUnitId)
const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + StatusBar.currentHeight;

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

  showAdAsync = async () => {
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
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
    const { editExec, navigation } = this.props
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

      Alert.alert(
        'Confirmar',
        'Você está certo disso?',
        [
          {
            text: 'Sim',
            onPress: () => {
              editExec(exercicio)
              navigation.navigate("TreinoInfo", { treino: exercicio.train })
            }
          },
          {
            text: 'Não', style: 'cancel'
          }
        ]
      )
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

            this.showAdAsync()
              .then(() => {
                navigation.navigate(
                  url,
                  //define parametro se existe mais exercicios no treino, chama a tela de info
                  treinoLenght > 1 ?
                    { treino: exercicio.train } :
                    null
                )
              })
              .catch(() => {
                navigation.navigate(
                  url,
                  //define parametro se existe mais exercicios no treino, chama a tela de info
                  treinoLenght > 1 ?
                    { treino: exercicio.train } :
                    null
                )
              })


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
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        style={styles.container}>
        <TouchableOpacity
          style={styles.delIcon}
          onPress={this.onDelete}>
          <AntDesign name='delete' size={45} color='red' />
        </TouchableOpacity>
        <ScrollView style={{ flex: 1, marginTop: 5 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.inner}>
              <TextField
                style={styles.input}
                containerStyle={styles.inputContainer}
                value={exercicio.name}
                numberOfLines={1}
                multiline={true}
                label="Nome do Exercicio"
                returnKeyType='next'
                onChangeText={this.onChangeName} />

              <TextField
                style={styles.input}
                containerStyle={styles.inputContainer}
                value={exercicio.rep}
                numberOfLines={1}
                multiline={true}
                label="Repetições"
                returnKeyType='next'
                onChangeText={this.onChangeRep} />

              <TextField
                style={styles.input}
                containerStyle={styles.inputContainer}
                value={exercicio.charge}
                numberOfLines={1}
                multiline={true}
                label="Carga"
                returnKeyType='next'
                onChangeText={this.onChangeCharge} />

              <TextField
                style={styles.input}
                containerStyle={styles.inputContainer}
                value={`${exercicio.serie}`}
                numberOfLines={1}
                multiline={true}
                keyboardType='numeric'
                label="Series"
                returnKeyType='next'
                onChangeText={this.onChangeSerie} />

              <TextField
                style={styles.inputDescription}
                containerStyle={styles.inputDescription}
                label='Descrição'
                multiline={true}
                numberOfLines={3}
                autoCapitalize='sentences'
                value={exercicio.description}
                onChangeText={this.onChangeDescription} />

              <TouchableOpacity
                onPress={this.onSubmit}>
                <Text style={styles.submitButton}>Editar</Text>
              </TouchableOpacity>

            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({ treinos }, { navigation }) => ({
  treinoLenght: treinos.length,
  exercicio: treinos.find(exec => exec._id === navigation.state.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  editExec: (exec) => dispatch(handleEditExec(exec))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTrenio)