
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
    backgroundColor: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: '80%'
  },
  modalTitle: {
    color: detail,
    fontSize: 40,
    justifyContent: 'center',
  },
  modalText: {
    margin: 10,
    fontSize: 20,
    color: 'blue',
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
    alignItems: 'flex-end',
    top: 10,
    right: 10,
  },
  badge: {
    top: 1,
    marginBottom: 5,
    width: '100%',
  },
  badgeTrackerContainer: {
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'flex-end',
  },
  badgeTracker: {
    textAlign: 'center',
    padding: 3,
    margin: 1,
    minWidth: 30,
    color: 'white',
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
  },
  badgeTrackerEmpty: {
    textAlign: 'center',
    padding: 3,
    minWidth: 30,
    color: 'black',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
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
    fontSize: 30,
    backgroundColor: 'yellow',
    color: detail
  },
  cardRow: {
    flexDirection: 'column',
    margin: 5,
  },
  cardText: {
    fontSize: 20,
    color: detail
  },
  editIcon: {
    alignItems: 'flex-end',
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
  logoContainer: {
    flexDirection: 'row',
    // backgroundColor: darkGrayBrown,
    justifyContent: 'center',
    padding: 5,
    margin: 10
  },
  logo: {
    margin: 5,
    width: 80,
    height: 80
  },
  logoTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  menu: {
    margin: 15
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
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 3,
  },
  gridCol: {
    flex: 1,
    flexDirection: 'column',
    margin: 3,
  },
  trackerContainer: {
    justifyContent: 'space-around',
    margin: 10,
    flexDirection: 'row'
  },
  treinoContainer: {
    padding: 10,
    margin: 1,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1
  },
  newTreinoTitle: {
    fontSize: 40,
    color: title,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  treinoTitle: {
    width: '20%',
    fontSize: 30,
    justifyContent: 'flex-start',
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
    margin: 10,
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
  sideMenuContainer: {
    margin: 10,
  },
  sideMenuText: {
    fontSize: 20,
    fontWeight: 'bold'
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