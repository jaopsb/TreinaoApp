import { DEFAULT_VALUES, ADD_TRACKER, ADD_TRAIN, DEL_TRAIN } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case DEFAULT_VALUES:
      return {
        dom: {
          name: 'Domingo',
          train: null
        },
        seg: {
          name: 'Segunda',
          train: null
        },
        ter: {
          name: 'Terça',
          train: null
        },
        qua: {
          name: 'Quarta',
          train: null
        },
        qui: {
          name: 'Quinta',
          train: null
        },
        sex: {
          name: 'Sexa',
          train: null
        },
        sab: {
          name: 'Sabado',
          train: null
        },

      }

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
          train: state[action.day].filter(tr => tr !== action.train)
        }
      }
    default:
      return state
  }
}