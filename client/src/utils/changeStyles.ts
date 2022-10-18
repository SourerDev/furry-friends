export const divTime=(id:string,add:string,remove:string,time:number)=>{
    let div = document.getElementById(id)
    div?.classList.remove(remove)
    div?.classList.add(add)

    setTimeout(()=>{
        div?.classList.remove(add)
        div?.classList.add(remove)
    },time)
}