import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import dummy from '../Dummy.json'

import Treinos from '../components/Treinos'
import { receiveExecs } from '../redux/actions';
import { gold, deepPurple, green, blue, purple, white } from '../colors'


class HomeScreen extends React.Component {
  state = {
    carregando: true
  }

  componentDidMount() {
    this.props.setInitialDummyData()
  }

  componentWillReceiveProps(nextProps) {
    const { carregando } = nextProps
    this.setState({ carregando })
  }

  render() {
    const { carregando } = this.state

    return (
      <View style={styles.container}>
        {
          !carregando ?
            <Treinos />
            :
            <View style={styles.treinoContainer}>
              <Text style={styles.treinoTitle}>carregando: {`${carregando}`}</Text>
            </View>
        }
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate('New')}>
          <Feather name='plus-circle' size={50} color={gold} />
        </TouchableOpacity>
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
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  treinoContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: blue,
    borderColor: deepPurple,
    borderWidth: 3,
    borderRadius: 10
  }
})

const mapStateToProps = (state) => ({
  carregando: state.length === 0
})

const mapDispatchToProps = (dispatch) => ({
  setInitialDummyData: () => dispatch(receiveExecs(dummy))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)