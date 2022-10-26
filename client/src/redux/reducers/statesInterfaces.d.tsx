import { Dog, Dogs } from "../../interfaces/interfaces"

export interface AppState{
    page: number
}

export interface DogState{
    allDogs: Array<Dogs>
    Dogs: Array<Dogs>
    oneDog: Dog | null
}