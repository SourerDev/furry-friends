import { combineReducers} from "redux";
import dogReducer  from './dogReducer';
import temperamentReducer from "./temperamentReducer";
import appReducer from "./appReducer";

const reducers = combineReducers({
    dogs: dogReducer,
    temperament: temperamentReducer,
    app: appReducer
})

export type State = ReturnType<typeof reducers>

export default reducers;