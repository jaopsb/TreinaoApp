import { emptyConfig } from "../../helpers";
import { DEFAULT_CONFIG, ADD_CONFIG } from "../actions";

export default (state = emptyConfig, action) => {
  switch (action.type) {
    case DEFAULT_CONFIG:
      return emptyCofig
    case ADD_CONFIG:
      return action.config
    default:
      return state
  }
}