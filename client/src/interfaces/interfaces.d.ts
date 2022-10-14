export interface Dogs{
    id: number | string
    name: string
    image: string
    temperaments: Array<string>
    weigth: string,
}

export interface Dog{
    id: number | string
    name: string
    image: string
    weigth: string
    heigth: string
    temperaments?: Array<string>
    life_span?: string
    origin?: string
}

export interface Temperament{
    id: number
    name: string
}