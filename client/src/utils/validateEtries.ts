const expressions = {
    onlyLetters: new RegExp('^[ A-Z]+$','i'),
    onlyNumbers: new RegExp('^[0-9]+$')
}

interface SpecialEntry{
    min: string
    max: string
    vMin : number
    vMax : number
}

enum Msg{
    onlyLetters = `Only letters requires`,
    onlyNumbers = `Only numbers requires`,
    noEmpty = `Field cann't be empty`,
    maxChar = `Max. characters`,
    incorrect = `Incorrect, correct entry : min - max`,
    noBetween = `Values must be between`
}

enum Inputs{
    NAME = 'name',
    HEIGTH = 'height',
    WEIGTH = 'weight',
    LIFE = "life",
    IMAGE ='image',
    TEMPERAMENT = 'temperament',
}

export const validationInputs =(input: string, value:string)=>{
    switch (input) {
        case Inputs.NAME:
            if (!value.length) return{
                res:false,
                msg: Msg.noEmpty
            }
            if(!expressions.onlyLetters.test(value))return {
                res:false,
                msg:Msg.onlyLetters
            }
            return {res: true}

        case Inputs.HEIGTH:{
            if (!value.length) return{
                res:false,
                msg: Msg.noEmpty
            }
            let [min,max] = value.split('-')
            let vMin = 15, vMax =120
            const special = specialEntry({min,max,vMin,vMax})
            
            if(special) return {
                res: special.res,
                msg: special.msg
            }
            
            if (value.length > 9) return{
                res:false,
                msg: Msg.maxChar + ' 9'
            }
            return{res:true}}
            
        case Inputs.WEIGTH:{
            if (!value.length) return{
                res:false,
                msg: Msg.noEmpty
            }
            let [min,max] = value.split('-')
            let vMin = 3, vMax =200
            const special = specialEntry({min,max,vMin,vMax})
            
            if(special) return {
                res: special.res,
                msg: special.msg
            }
            
            if (value.length > 7) return{
                res:false,
                msg: Msg.maxChar + ' 7'
            }
            return{res: true}
        }

        case Inputs.LIFE:
            {
                let [min,max] = value.split('-')
                let vMin = 6, vMax =25
                const special = specialEntry({min,max,vMin,vMax})
                
                if(special) return {
                    res: special.res,
                    msg: special.msg
                }
                
                if (value.length > 7) return{
                    res:false,
                    msg: Msg.maxChar + ' 7'
                }
                return{res: true}
            }
            
            case Inputs.TEMPERAMENT:
            if (!value.length) return{
                res:false,
                msg: Msg.noEmpty
            }
            if(!expressions.onlyLetters.test(value))return {
                res:false,
                msg:Msg.onlyLetters
            }
            return {res: true}
        default:
            return {res:true}
    }
}

function specialEntry(att:SpecialEntry) {
    
    if(!expressions.onlyNumbers.test(att.min.trimEnd()) ||( att.max && att.max.length ? !expressions.onlyNumbers.test(att.max.trimStart().trimEnd()):false))return{
        res:false,
        msg: Msg.onlyNumbers
    }

    if((parseInt(att.min) < att.vMin || parseInt(att.min) > att.vMax) || parseInt(att.max) > att.vMax) return{
        res:false,
        msg: `${Msg.noBetween} ${att.vMin} and ${att.vMax}`
    }

    if(parseInt(att.min) >= parseInt(att.max))
    return{
        res:false,
        msg: Msg.incorrect
    }

    return null
}