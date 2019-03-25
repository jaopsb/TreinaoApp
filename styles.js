
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGround,
    flexDirection: 'column'
  },
  label: {
    width: '100%',
    textAlign: 'center',
    left: 5,
    fontSize: 20,
    color: 'black',
    top: 0,
  },
  input: {
    fontSize: 25,
    backgroundColor: darkGrayBrown,
    borderColor: darkGrayBrown,
    borderWidth: 3,
    borderRadius: 5,
    color: white,
    margin: 5,
    padding: 10
  },
  picker: {
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: '100%',
    backgroundColor: backGround
  },
  pickerItem: {
    fontSize: 15,
    textAlign: 'center',
    color: white
  },
  submitButton: {
    margin: 30,
    textAlign: 'center',
    fontSize: 30,
    color: white,
    backgroundColor: detail,
    borderRadius: 5
  },
  buttonNewExec: {
    margin: 5,
    textAlign: 'center',
    fontSize: 30,
    color: white,
    backgroundColor: detail,
    borderRadius: 5
  }
})