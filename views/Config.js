import React from 'React'
import Modal from 'react-native-modalbox'
import { Image, View, Text, TouchableOpacity, Linking } from 'react-native'
import styles from '../styles'
import { withNavigation } from 'react-navigation'
import Ionicons from '@expo/vector-icons/Ionicons';

class Config extends React.Component {
  showContact = () => {
    this.refs.modal3.open()
  }
  closeModal = () => this.refs.modal3.close()
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => this.props.navigation.openDrawer()}>
          <Ionicons name='md-menu' color={"black"} size={40} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/dumbell.png')}
          />
          <Text style={styles.logoTitle}>Treinão App</Text>
        </View>
        <TouchableOpacity
          onPress={this.showContact}>
          <Text style={styles.privacy}>Contato</Text>
        </TouchableOpacity>
        <Modal style={styles.modal} position={"center"} ref={"modal3"} isDisabled={false}>
          <Text style={styles.modalTitle}>Contato</Text>
          <Text style={styles.textThanks}>
            {`Este aplicativo é um projeto de estudo meu em React Native e o código é aberto e está disponível `}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://github.com/jaopsb/treinaoapp.git')}>aqui</Text>
            {` (Sharing is caring :)). Se você é um desenvolvedor(a), sinta-se a vontade para dar opiniões sobre como está o código! Eu agradeço muito e preciso para melhorar minhas habilidades.
Qualquer dúvida sobre o aplicativo ou sugestões de melhorias e críticas serão alegremente recebidas e atendidas o mais rápido possível pelo email `}
            <Text style={styles.link} onPress={() => Linking.openURL('mailto:treinaoapp@gmail.com')}>treinaoapp@gmail.com</Text>
            {`.
Muito obrigado por usar este aplicativo,
te vejo por ai :),
João Pedro de Salles Braga.`
            }
          </Text>
          <TouchableOpacity
            onPress={this.closeModal}
            style={styles.btn}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
          }}
          onPress={() => Linking.openURL('https://sites.google.com/view/treinaoapp/privacy-policy')}>
          <Text style={styles.privacy}>Política de Privacidade</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default withNavigation(Config)