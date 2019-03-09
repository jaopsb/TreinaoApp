import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native'
import { handleAddExecs } from '../redux/actions';
import { gold, deepPurple, green, white } from '../colors'
import { getTrains, getTypes } from '../helpers';

class NewTreino extends React.Component {
  state = {
    exercicio: {
      name: '',
      charge: '',
      rep: '',
      serie: 0,
      type: '',
      train: '',
      _id: '',
      owner: ''
    }
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

  handlePickType = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      exercicio: {
        ...prevState.exercicio,
        type: itemValue
      }
    }))
  }

  render() {
    const { treinos, gruposMusc } = this.props
    const { exercicio } = this.state
    return (
      <View style={styles.container}>
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
          onChangeText={this.handleChangeName} />
        <Picker
          selectedValue={exercicio.type}
          style={{ height: 50, width: 100 }}
          onValueChange={this.handlePickType}>
          {
            treinos.map(tr => (
              <Picker.Item key={tr} label={tr} value={tr} />
            ))
          }
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepPurple,
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


const mapStateToProps = (state) => ({
  treinos: getTrains(state),
  gruposMusc: getTypes(state)
})

const mapDispatchToProps = (dispatch) => ({
  addTreino: (treino) => dispatch(handleAddExecs(treino))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTreino)