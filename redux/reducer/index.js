import { RECEIVE_EXECS, ADD_EXEC, EDIT_EXEC } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EXECS:
      return action.execs
    case ADD_EXEC:
      return [
        ...state,
        ...action.exec
      ]
    case EDIT_EXEC:
      return [
        ...state.map(exec => (
          exec._id === action.exec._id ?
            action.exec :
            exec
        ))
      ]
    default:
      return state
  }
}