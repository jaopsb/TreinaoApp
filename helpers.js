//const for NEWTREINO
export const CHARGE = 'CHARGE'
export const NAME = 'NAME'
export const REP = 'REP'
export const SERIE = 'SERIE'
export const TYPE = 'TYPE'
export const TRAIN = 'TRAIN'
export const DESC = 'DESC'

export const bannerUid = 'ca-app-pub-2940304467930014/5618424231'//antigo
export const bannerFreeUnitId = 'ca-app-pub-2940304467930014/7961941572'
export const interBannerFreeUnitId = 'ca-app-pub-2940304467930014/4136755947'

//tests
export const testeBannerUID = 'ca-app-pub-3940256099942544/6300978111'
export const testeInterBannerUnitId = 'ca-app-pub-3940256099942544/1033173712'

export const gruposMusc = [
  'Ombros',
  'Biceps',
  'Dorsais',
  'Abdominais/Lombar',
  'Peitorais',
  'Membros Inferiores',
  'Triceps'
]

export const emptyExercicio = {
  name: '',
  charge: '',
  rep: '',
  description: '',
  serie: 0,
  type: '',
  train: '',
  _id: '',
  owner: ''
}

export const execNameKeys = {
  "rep": 'Repetições',
  "charge": 'Carga',
  "description": "Descrição",
  "name": "Nome do Exercicio",
  "serie": "Serie",
  "type": 'Grupo Muscular'
}

/* log mais facil de achar no terminal*/
export const logInfo = (title, info) => {
  console.group(title)
  console.log(info)
  console.groupEnd()
}

const VALID_EMAIL = new RegExp(/\b[\w-]+@[\w-]+\.\w{2,4}\b/gi)

export const VALID_SPACE = new RegExp(/^\s*$/)

const isEmail = (email) => email.match(VALID_EMAIL)

/* exporta validacao de email por RegExp*/
export const validaEmail = (email) => isEmail(email)

/* valida se todos os campos obrigatorios do usuario estao preenchidos*/
export const validaUser = (user) => {
  return Object.keys(user).filter(key => key !== '_id' && user[key] === '')
}

/* valida se todos os campos obrigatorios do exercicio estao preenchidos */
//TODO:  RETIRAR VALIDACAO DE _ID E DE OWNER,TEM QUE ESTAR PREENCHIDAS
export const validaExec = (exec) => {
  return Object.keys(exec).filter(key => exec[key] === "" && key !== 'description' && key !== 'owner' && key !== '_id')
}

/*GetTrains - busca todos os treinos (train) ques estao na lista */
export const getTrains = (exercicios) => {
  let aux = exercicios.map(exec => exec.train)
  return aux.filter((item, index) => aux.indexOf(item) >= index)
}

/*GetTypes - busca todos os grupos musculares (type)*/
export const getTypes = (treino) => {
  let aux = treino.map(exec => exec.type)
  return aux.filter((item, index) => aux.indexOf(item) >= index)
}

/*GetTitles - busca o nome de todos os exercicios de um treino especifico */
export const getTitles = (treino, train) => {
  return treino.map(exec =>
    exec.train === train ?
      exec.name :
      null
  ).filter(exec => exec !== null)
}

/* filterExecsByTrain - filtra os exercicios pelo nome do treino*/
export const filterExecsByTrain = (exercicios, train) => {
  return exercicios.filter(exec => exec.train === train)
}
/* getListTrainAndTypes - cria uma lista com listas de cada treino */
export const getListTrainAndTypes = (treinos) =>
  getTrains(treinos).map(treino => ({
    [treino]:
      getTypes(filterExecsByTrain(treinos, treino))
  }))



export const privacy_policy = `## Privacy Policy

João Pedro de Salles Braga built the Treinão App app as an Ad Supported app. This SERVICE is provided by João Pedro de Salles Braga at no cost and is intended for use as is.

This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.

If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Treinão App unless otherwise defined in this Privacy Policy.

**Information Collection and Use**

For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Android Advertising ID.The service (AdMob) uses the ID to provide advertisement for the app.  The information that I request will be retained on your device and is not collected by me in any way.

The app does use third party services that may collect information used to identify you.

Link to privacy policy of third party service providers used by the app

*   [Google Play Services](https://www.google.com/policies/privacy/)

**Log Data**

I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.

**Cookies**

Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.

**Service Providers**

I may employ third-party companies and individuals due to the following reasons:

*   To facilitate our Service;
*   To provide the Service on our behalf;
*   To perform Service-related services; or
*   To assist us in analyzing how our Service is used.

I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

**Security**

I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.

**Links to Other Sites**

This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

**Children’s Privacy**

These Services do not address anyone under the age of 13\. I do not knowingly collect personally identifiable information from children under 13\. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.

**Changes to This Privacy Policy**

I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.

**Contact Us**

If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at treinaoapp@gmail.com.
`