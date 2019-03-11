import React from 'react'
import { connect } from 'react-redux'
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
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
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/Logo.png')}
          />
        </View>
        {
          !carregando ?
            <Treinos />
            :
            <View style={styles.treinoContainer}>
              <Text style={styles.treinoTitle}>carregando: {`${carregando}`}</Text>
            </View>
        }

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('New')}>
          <Text
            style={styles.newTreinoBtn}>
            Criar Treino
           </Text>
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
  logoContainer: {
    alignItems: 'center',
    margin: 5
  },
  logo: {
    width: 100,
    height: 100
  },
  newTreinoBtn: {
    textAlign: 'center',
    color: white,
    fontSize: 35,
    borderColor: gold,
    borderWidth: 1
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