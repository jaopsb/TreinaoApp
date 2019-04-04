import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { privacy_policy } from '../helpers'
import styles from '../styles'

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.treinoContainer}>
          <Markdown>{privacy_policy}</Markdown>
        </ScrollView>
      </View>
    )
  }
}

export default PrivacyPolicy