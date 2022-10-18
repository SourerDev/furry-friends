import { DogPost } from '../interfaces/interfaces';
import {instance} from './api/baseApi';

const dogs = 'dogs'
const temperaments ='temperaments'

export const dogsApi = {
    getDogs: function (name:string|null = '') {
        return instance.get(`${dogs}?name=${name}`)
    },
    getDog: function (id: string|number){
        return instance.get(`${dogs}/${id}`)
    },
    getTemperaments: function(){
        return instance.get(`${temperaments}`)
    },
    postDog: function (dog:DogPost) {
        return instance.post(`${dogs}`,dog)
    }
}