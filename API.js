import { AsyncStorage } from 'react-native'
import Dummy from './Dummy.json'
export const TREINO_KEY = 'TREINAO_APP'

export default {
  getExecs: () => (
    AsyncStorage.getItem(TREINO_KEY)
      .then(data =>data? JSON.parse(data) : [])
  ),
  setExec: (exec) => (
    AsyncStorage.mergeItem(TREINO_KEY, JSON.stringify(exec))
      .then(JSON.parse)
      .then(data => data)
  ),
  setExecs: (execs) => (
    AsyncStorage.setItem(TREINO_KEY, JSON.stringify(execs))
      .then(JSON.parse)
      .then(data => data)
  ),
  setDummyExecs: () => (
    AsyncStorage.setItem(TREINO_KEY, JSON.stringify(Dummy))
      .then(JSON.parse)
      .then(data => data)
  )
}