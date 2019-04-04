import React from 'React'
import { View, Text, TouchableOpacity, ScrollView, Linking, Button } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import styles from '../styles'
import { withNavigation } from 'react-navigation'

class Config extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.treinoContainer}>
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
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.submitButton}>Política de Privacidade</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default withNavigation(Config)