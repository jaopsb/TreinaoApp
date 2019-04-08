
import { StyleSheet } from 'react-native'
import { backGround, darkGrayBrown, detail, white, darkBackGround, colorInput, backGroundInput, title } from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGround,
    flexDirection: 'column'
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  btn: {
    bottom: 3,
    margin: 10,
  },
  btnText: {
    fontSize: 25,
    color: 'red',
  },
  label: {
    width: '100%',
    textAlign: 'center',
    left: 5,
    fontSize: 20,
    color: 'black',
    top: 0,
  },
  modal: {
    flexDirection: 'column',
    backgroundColor: darkBackGround,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
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
  delIcon: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  badge: {
    top: 1,
    marginBottom: 5,
    width: '100%',
  },
  badgeTrackerContainer: {
    position: 'absolute',
    top: 2,
    right: 10,
  },
  badgeTracker: {
    textAlign: 'center',
    margin: 1,
    padding: 3,
    color: 'white',
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
  },
  badgeTitle: {
    color: title,
    fontWeight: 'bold',
    fontSize: 50,
    alignSelf: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 13,
    left: 10
  },
  cardContainer: {
    backgroundColor: darkGrayBrown,
    borderColor: darkGrayBrown,
    borderWidth: 5,
    borderRadius: 10
  },
  cardTitle: {
    marginLeft: 10,
    fontSize: 30,
    color: detail
  },
  cardRow: {
    flexDirection: 'row',
    paddingTop: 2,
    margin: 10,
    paddingBottom: 2
  },
  cardText: {
    margin: 2,
    fontSize: 15,
    color: detail
  },
  editIcon: {
    position: 'absolute',
    right: 7,
    top: 5
  },
  input: {
    margin: 5,
    padding: 10
  },
  inputContainer: {
    padding: 10,
    margin: 5
  },
  inputDescription: {
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
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    borderColor: detail,
    borderBottomWidth: 3,
    backgroundColor: backGround,
  },
  treinoTitle: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: title
  },
  typeContainer: {
    flexDirection: 'row'
  },
  typeText: {
    textAlign: 'center',
    color: detail,
    fontSize: 20,
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
  },
  privacy: {
    fontSize: 15,
    color: detail,
    textAlign: 'center',
    margin: 15
  }
})