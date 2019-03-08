//const for NEWTREINO
export const CHARGE = 'CHARGE'
export const NAME = 'NAME'
export const REP = 'REP'
export const SERIE = 'SERIE'
export const TYPE = 'TYPE'
export const TRAIN = 'TRAIN'
export const DESC = 'DESC'

/* log mais facil de achar no terminal*/
export const logInfo = (title, info) => {
  console.group(title)
  console.log(info)
  console.groupEnd()
}

const VALID_EMAIL = new RegExp(/\b[\w-]+@[\w-]+\.\w{2,4}\b/gi)

const isEmail = (email) => email.match(VALID_EMAIL)

/* exporta validacao de email por RegExp*/
export const validaEmail = (email) => isEmail(email)

/* valida se todos os campos obrigatorios do usuario estao preenchidos*/
export const validaUser = (user) => {
  return Object.keys(user).filter(key => key !== '_id' && user[key] === '')
}

/* valida se todos os campos obrigatorios do exercicio estao preenchidos */
export const validaExec = (exec) => {
  return Object.keys(exec).filter(key => key !== 'description' && exec[key] === '')
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
