import { Dogs } from "../interfaces/interfaces";

export const filter = (array: Array<Dogs> | null,value:string,exists:boolean)=>{
    if(!array) return
    let newarray = array
    
    if(value.length) newarray = newarray.filter(element=> element.temperaments?.find(e => e === value)  ? true : false)
    if(exists) newarray = newarray.filter(element=>typeof element.id !== "number")

    return newarray
}

export const orderBy = (array: Array<Dogs> | null, order: number) => {
    let newarray = array;
    if(!array) return
    switch (order) {
        case 1:
            return newarray?.sort((a,b)=>a.name.localeCompare(b.name))
        case 2:
            return newarray?.sort((a,b)=>a.name.localeCompare(b.name)).reverse()
        case 3:
            return newarray?.sort((a,b)=>(parseInt(b.weight?.split('-')[0])) -(parseInt(a.weight?.split('-')[0]))).reverse()
        case 4:
            return  newarray?.sort((a,b)=>(parseInt(b.weight?.split('-')[0])) -(parseInt(a.weight?.split('-')[0]))) 

        default:
            return newarray
    }
}