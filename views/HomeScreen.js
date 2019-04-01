import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modalbox'
import { Feather } from '@expo/vector-icons'
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { AdMobBanner } from 'expo'
import { getTitles, testeBannerUID, bannerUid, bannerFreeUnitId } from '../helpers.js'
import Treinos from '../components/Treinos'
import { handleInitalData, handleInitalDummyData } from '../redux/actions'
import { white, gold, blue, backGround, goldBrown, detail, darkBackGround } from '../colors'

class HomeScreen extends React.Component {
  state = {
    description: '',
    toggleDescription: false,
    carregando: true,
    isDisabled: false,
    titles: []
  }

  componentDidMount() {

    this.props.getInitialData()
  }

  componentWillReceiveProps(nextProps) {
    const { carregando } = nextProps
    this.setState({ carregando })
  }

  sneakPeek = (treino) => {
    const { treinos } = this.props

    this.setState({
      titles: getTitles(treinos, treino),
      isDisabled: false
    })
    this.refs.modal3.open()
  }

  closeModal = () => this.refs.modal3.close()

  render() {
    const { carregando, titles } = this.state
    const { treinos } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/dumbell.png')}
          />
          <Text style={styles.logoTitle}>Treinão App</Text>
        </View>

        <Modal style={styles.modal} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
          <Text style={styles.modalTitle}>Exercicios</Text>
          {
            titles.length > 0 ?
              titles.map(title => <Text key={title} style={styles.modalText}>{title}</Text>) : null
          }
          <TouchableOpacity
            onPress={this.closeModal}
            style={styles.btn}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </Modal>
        {
          !carregando && typeof (treinos) !== 'Object' ?
            <Treinos showSneakPeek={this.sneakPeek} />
            :
            <Text style={styles.noTreino}>{`Não há treinos!!\nClique no icone + para criar!`}</Text>
        }

        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate('NewTreino', { treino: '' })}>
          <Feather name='plus-circle' size={50} color={goldBrown} />
        </TouchableOpacity>

        <AdMobBanner
          bannerSize="smartBannerLandscape"
          style={styles.bottomBanner}
          adUnitID={bannerFreeUnitId} // Test ID, Replace with your-admob-unit-id
          testDevices={[AdMobBanner.simulatorId]}
          didFailToReceiveAdWithError={this.bannerError} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGround,
    flexDirection: 'column'
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  icon: {
    position: 'absolute',
    bottom: 60,//60,
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
  logoTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  newTreinoBtn: {
    textAlign: 'center',
    color: white,
    fontSize: 35,
    borderColor: gold,
    borderWidth: 1
  },
  modal: {
    flexDirection: 'column',
    backgroundColor: darkBackGround,
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: '80%'
  },
  modalTitle: {
    color: detail,
    fontSize: 40,
    justifyContent: 'center',
  },
  modalText: {
    margin: 5,
    fontSize: 20,
    color: white,
  },
  btn: {
    bottom: 3,
    margin: 10,
  },
  btnText: {
    fontSize: 25,
    color: 'red',
  },
  treinoContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: blue,
    borderColor: backGround,
    borderWidth: 3,
    borderRadius: 10
  },
  noTreino: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'red'
  },

})

const mapStateToProps = (state) => ({
  carregando: state.length === 0,
  treinos: state.filter(exec => exec.deleted === false)
})

const mapDispatchToProps = (dispatch) => ({
  getInitialData: () => dispatch(handleInitalDummyData())

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)