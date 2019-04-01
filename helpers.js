//const for NEWTREINO
export const CHARGE = 'CHARGE'
export const NAME = 'NAME'
export const REP = 'REP'
export const SERIE = 'SERIE'
export const TYPE = 'TYPE'
export const TRAIN = 'TRAIN'
export const DESC = 'DESC'

export const bannerUid = 'ca-app-pub-2940304467930014/5618424231'//treinao pago
export const bannerUidFree = 'ca-app-pub-2940304467930014/7961941572'//treinao free
export const appIdFree = 'ca-app-pub-2940304467930014~3352489018'//treinao free
export const interBannerUid = 'ca-app-pub-2940304467930014/4274031900'
export const testeBannerUID = 'ca-app-pub-3940256099942544/6300978111'

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
