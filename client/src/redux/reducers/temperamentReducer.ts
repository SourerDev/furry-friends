import { Action } from "../actions"
import { ActionTypes } from "../actions/actionTypes";

const initialState = {
    temperaments: []
}

const reducer = (state:object = initialState, action:Action)=>{
    switch (action.type) {
        case ActionTypes.GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }
    
        default:
            return {...state}
    }
}

export default reducer