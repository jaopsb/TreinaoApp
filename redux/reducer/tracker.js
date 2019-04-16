import { DEFAULT_VALUES, ADD_TRACKER, ADD_TRAIN, DEL_TRAIN } from "../actions";
import { emptyTracker } from "../../helpers";

export default (state = emptyTracker, action) => {
  switch (action.type) {
    case DEFAULT_VALUES:
      return emptyTracker
    case ADD_TRACKER:
      return action.tracker

    case ADD_TRAIN:
      return {
        ...state,
        [action.day]: {
          ...state[action.day],
          train: [
            ...state[action.day].train,
            action.train
          ]
        }
      }

    case DEL_TRAIN:
      return {
        ...state,
        [action.day]: {
          ...state[action.day],
          train: state[action.day].train
            .filter(tr => tr !== action.train)
        }
      }
    default:
      return state
  }
}