import { Dog, Dogs, Temperament } from "../../interfaces/interfaces";
import { ActionTypes } from "./actionTypes";

interface allDogs{
    type: ActionTypes.GET_ALL_DOGS,
    payload:Array<Dogs>
}
interface dogs{
    type: ActionTypes.SET_DOGS,
    payload: Array<Dogs>
}
interface oneDog{
    type: ActionTypes.GET_ONE_DOG,
    payload: Dog | null
}

interface allTemperaments{
    type: ActionTypes.GET_ALL_TEMPERAMENTS
    payload: Array<Temperament>
}

interface setPage{
    type: ActionTypes.SET_PAGE
    payload: number
}

export type Action = allDogs | allTemperaments | oneDog | setPage | dogs