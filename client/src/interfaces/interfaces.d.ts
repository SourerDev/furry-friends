export interface Dogs{
    id: number | string
    name: string
    image: string
    temperaments: Array<string>
    weight: string,
}

export interface Dog{
    id: number | string
    name: string
    image: string
    weight: string
    height: string
    temperaments?: Array<string>
    life_span?: string
    origin?: string
}
export interface DogPost{
    name: string
    image: string
    weight: string
    height: string
    temperaments?: Array<number>
    life_span?: string
    origin?: string
}

export interface Temperament{
    id: number
    name: string
}

export interface FormState{
    name:string,
    height:string,
    weight:string,
    life:string,
    image:string,
    temperament:string,
    temperaments:Array<number>,
}