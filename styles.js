
import { StyleSheet } from 'react-native'
import { backGround, darkGrayBrown, detail, white, darkBackGround } from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGround,
    flexDirection: 'column'
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  label: {
    width: '100%',
    textAlign: 'center',
    left: 5,
    fontSize: 20,
    color: 'black',
    top: 0,
  },
  configBtn: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  icon: {
    position: 'absolute',
    bottom: 60,//60,
    right: 10,
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
  treinoContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    padding: 5,
    backgroundColor: darkGrayBrown,
    borderColor: darkGrayBrown,
    borderWidth: 3,
    borderRadius: 5
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
  },
  submitButton: {
    margin: 30,
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: detail,
    borderRadius: 5
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline'
  },
  textThanksContainer: {
    padding: 5,
    backgroundColor: darkBackGround
  },
  textThanks: {
    fontSize: 20,
    color: white,
    padding: 10,
  },
  delButton: {
    margin: 2,
    textAlign: 'center',
    fontSize: 20,
    color: 'red'
  }
})