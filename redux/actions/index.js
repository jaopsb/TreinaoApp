import API from "../../API";

export const RECEIVE_EXECS = 'RECEIVE_EXECS'
export const ADD_EXEC = 'ADD_EXEC'
export const EDIT_EXEC = 'EDIT_EXEC'
export const ADD_EXECS = 'ADD_EXECS'
export const DEL_EXEC = 'DEL_EXEC'

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

export const delExec = (id) =>({
  type:DEL_EXEC,
  id
})

export const handleInitalData = () => {
  return function (dispatch) {
    return API.getExecs()
      .then(data => dispatch(receiveExecs(data)))
  }
}

export const handleInitalDummyData = () => {
  return function (dispatch) {
    return API.setDummyExecs()
      .then(API.getExecs()
        .then(data => dispatch(receiveExecs(data)))
      )
  }
}

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