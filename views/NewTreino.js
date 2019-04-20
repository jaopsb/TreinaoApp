import React from 'react'
import { connect } from 'react-redux'
import styles from '../styles'
import { TextField } from 'react-native-material-textfield'
import { Alert, View, Text, TouchableOpacity } from 'react-native'
import { getTrains, getTypes, validaExec, VALID_SPACE } from '../helpers';

class NewTreino extends React.Component {
  state = {
    treino: ''
  }

  changeTreino = (text) => this.setState({ treino: text })

  handleSubmit = () => {
    const { treino } = this.state
    const { treinos, navigation } = this.props
    if (treino === '' || treino.match(VALID_SPACE)) {
      return Alert.alert(
        'NAAAAO',
        'O nome do treino nao pode ser vazio!!',
        [{ text: 'OK', style: 'cancel' }]
      )
    }

    if (treinos.includes(treino)) {
      return Alert.alert(
        'NAAAAO',
        'Esse nome ja tem!!',
        [{ text: 'OK', style: 'cancel' }]
      )
    }

    navigation.navigate('NewExec', { treino, veioDeNovoTreino: true, emMassa: true })
  }

  render() {
    const { treino } = this.state
    return (
      <View style={styles.container}>
        <View style={{ top: 50, margin: 10, justifyContent: 'center' }}>
          <TextField
            style={styles.input}
            value={treino}
            numberOfLines={1}
            multiline={true}
            label="Nome do Treino"
            onChangeText={this.changeTreino} />

          <TouchableOpacity
            onPress={this.handleSubmit}>
            <Text style={styles.submitButton}>Proximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ treinos }) => ({
  treinos: getTrains(treinos)
})

export default connect(mapStateToProps)(NewTreino)