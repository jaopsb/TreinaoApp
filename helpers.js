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
export const bannerFreeConfig = 'ca-app-pub-2940304467930014/8437647351'
export const interBannerFreeUnitId = 'ca-app-pub-2940304467930014/4136755947'

//tests
export const testeBannerUID = 'ca-app-pub-3940256099942544/6300978111'
export const testeInterBannerUnitId = 'ca-app-pub-3940256099942544/1033173712'

export const week = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]

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

export const emptyTracker = {
  dom: {
    id: 0,
    name: "Domingo",
    train: []
  },
  seg: {
    id: 1,
    name: "Segunda",
    train: []
  },
  ter: {
    id: 2,
    name: "Terça",
    train: []
  },
  qua: {
    id: 3,
    name: "Quarta",
    train: []
  },
  qui: {
    id: 4,
    name: "Quinta",
    train: []
  },
  sex: {
    id: 5,
    name: "Sexta",
    train: []
  },
  sab: {
    id: 6,
    name: "Sabado",
    train: []
  }
}

export const emptyConfig = {
  theme: 0
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

export const checkPropertyState = (data) => {
  return (
    data.hasOwnProperty('config') &&
    data.hasOwnProperty('tracker') &&
    data.hasOwnProperty('treinos')
  )
}

export const setDefaultStateValue = () => ({ config: emptyConfig, tracker: emptyTracker, treinos: [] })

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

export const filterTrackerByTrain = (tracker, train) => {
  //console.log('filterTrackerByTrain tracker', tracker)
  //console.log('filterTrackerByTrain train', train)

  if (tracker.length === 0) return
  //seleciona os trackers que tem pelo menos um treino
  const chave = Object.keys(tracker).filter(key => tracker[key].train.length > 0)

  //nao sao nulos
  //console.log('filterTrackerByTrain chave', chave)

  //filtra se dentro dos trackers que tem um treino,existe o treino procurado
  //se sim, salva ele no array e devolve
  const result = chave.filter(ch => tracker[ch].train.includes(train))
  //console.log('filterTrackerByTrain result', result)
  return result
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

export const testTracker = (treinos, tracker) => {
  treinos.map(tr => {
    const chave = Object.keys(tracker)
    //filtra o tracker para buscar todos os dias que tem o treino 
    // console.log('testTracker tracker', tracker)
    // console.log('testTracker chave', chave)
    tr.day = chave
      .filter(ch => tracker[ch].train !== null &&
        tracker[ch].train
          .find(name => Object.keys(tr)[0] === name))
      .map(day => ({ day, id: tracker[day].id }))
    // console.log('testTracker  tr', tr)
    return tr
  })
}