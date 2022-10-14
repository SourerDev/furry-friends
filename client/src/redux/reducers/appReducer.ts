import { ActionTypes } from "../actions/actionTypes";
import { Action } from "../actions";
import { AppState } from "./statesInterfaces.d";

const initialState:AppState={
    page: 0
}
const reducer = (state:AppState = initialState, action:Action)=>{
    switch (action.type) {
        case ActionTypes.SET_PAGE:            
            return {
                ...state,
                page: state.page + action.payload
            }
    
        default:
            return{...state}
    }    
}

export default reducer;