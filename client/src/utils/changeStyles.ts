export const divTime=(id:string,add:string,remove:string,time:number)=>{
    let div = document.getElementById(id)
    div?.classList.remove(remove)
    div?.classList.add(add)

    setTimeout(()=>{
        div?.classList.remove(add)
        div?.classList.add(remove)
    },time)
}

export const seeDiv=(id:string,add:string,remove:string,see:boolean)=>{
    let div = document.getElementById(id)
    
    if (see) {
        div?.classList.remove(remove)
        div?.classList.add(add)
    }else{
        div?.classList.remove(add)
        div?.classList.add(remove)
    }
}