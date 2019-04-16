import API from "../../API";
import { checkPropertyState, setDefaultStateValue } from "../../helpers";

//execs
export const RECEIVE_EXECS = 'RECEIVE_EXECS'
export const ADD_EXEC = 'ADD_EXEC'
export const EDIT_EXEC = 'EDIT_EXEC'
export const ADD_EXECS = 'ADD_EXECS'
export const DEL_EXEC = 'DEL_EXEC'
//execs

//tracker
export const DEFAULT_VALUES = 'DEFAULT_VALUES'
export const ADD_TRACKER = 'ADD_TRACKERS'
export const ADD_TRAIN = 'ADD_TRAIN'
export const DEL_TRAIN = 'DEL_TRAIN'
//tracker

//config
export const DEFAULT_CONFIG = 'DEFAULT_CONFIG'
export const ADD_CONFIG = 'ADD_CONFIG'
//config

//execs
export const receiveExecs = (execs) => ({
  type: RECEIVE_EXECS,
  execs
})

export const addExec = (exec) => ({
  type: ADD_EXEC,
  exec
})

export const addExecs = (execs) => ({
  type: ADD_EXECS,
  execs
})

export const editExec = (exec) => ({
  type: EDIT_EXEC,
  exec
})

export const delExec = (id) => ({
  type: DEL_EXEC,
  id
})
//execs

//shared
export const handleInitalData = () => {
  return function (dispatch) {
    return API.getExecs()
      .then((data) => {
        if (!checkPropertyState(data)) {
          const { tracker, config } = setDefaultStateValue()

          dispatch(receiveExecs(data)) // se nao tem as propriedades,so existe treinos
          dispatch(addTraker(tracker))
          dispatch(addConfig(config))
        } else {
          const { treinos, tracker, config } = data

          dispatch(receiveExecs(treinos))
          dispatch(addTraker(tracker))
          dispatch(addConfig(config))

        }
      })
  }
}

export const handleInitalDummyData = () => {
  return function (dispatch) {
    return API.setDummyExecs()
      .then(
        API.getExecs()
          .then((data) => {
            if (!checkPropertyState(data)) {
              const { tracker, config } = setDefaultStateValue()

              dispatch(receiveExecs(data)) // se nao tem as propriedades,so existe treinos
              dispatch(addTraker(tracker))
              dispatch(addConfig(config))
            } else {
              const { treinos, tracker, config } = data

              dispatch(receiveExecs(treinos))
              dispatch(addTraker(tracker))
              dispatch(addConfig(config))

            }

          })
      )
  }
}
//shared

//execs
export const handleAddExecs = (execs) => {
  return function (dispatch) {
    return API.setExecs(execs)
      .then(() => dispatch(addExecs(execs)))
  }
}

export const handleAddExec = (exec) => {
  return function (dispatch) {
    return API.setExec(exec)
      .then(() => dispatch(addExec(exec)))
  }
}

export const handleEditExec = (exec) => {
  return function (dispatch) {
    return dispatch(editExec(exec))
      .then(() => exec)
  }
}
//execs

//tracker
export const defaultValues = () => ({
  type: DEFAULT_VALUES
})

export const addTrain = (day, train) => ({
  type: ADD_TRAIN,
  day,
  train
})

export const addTraker = (tracker) => ({
  type: ADD_TRACKER,
  tracker
})

export const delTrain = (day, train) => ({
  type: DEL_TRAIN,
  day,
  train
})
//tracker

//config
export const defaultConfig = () => ({
  type: DEFAULT_CONFIG
})

export const addConfig = (config) => ({
  type: ADD_CONFIG,
  config
})
//config


