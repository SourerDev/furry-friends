import { ActionTypes } from "./actionTypes";
import { Dispatch } from "redux";
import { Action } from "./index";
import {Dog,Dogs,Temperament} from "../../interfaces/interfaces";
import { dogsApi } from "../../services/index";

let start = true;

export const getAllDogs=()=>{
    return async (dispatch:Dispatch<Action>)=>{
        const response = await dogsApi.getDogs()
        const value:Array<Dogs> = response.data
        dispatch({
            type: ActionTypes.GET_ALL_DOGS,
            payload: value
        })

        if (start) {
            dispatch({
                type: ActionTypes.SET_DOGS,
                payload: value
            })
           start = false
        }
    }
}

export const getOneDog =(id:string|number)=>{
    return async (dispatch:Dispatch<Action>)=>{
        const response = await dogsApi.getDog(id);
        const value:Dog = response.data
        dispatch({
            type: ActionTypes.GET_ONE_DOG,
            payload: value
        })
    }
}

export const getAllTemperaments = ()=>{
    return async (dispatch:Dispatch<Action>)=>{
        const response = await dogsApi.getTemperaments()
        const value:Array<Temperament> = response.data
        dispatch({
            type: ActionTypes.GET_ALL_TEMPERAMENTS,
            payload: value
        })
    }   
}

export const setDogs=(dogs:Array<Dogs>)=>{
    return (dispatch:Dispatch<Action>)=>{
        dispatch({
            type: ActionTypes.SET_DOGS,
            payload:dogs
        })
    }
}

export const setPage = (page:number) => {
    return (dispatch:Dispatch<Action>)=>{
        dispatch({
            type: ActionTypes.SET_PAGE,
            payload: page
        })
    }
}