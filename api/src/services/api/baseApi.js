const axios = require('axios')

const BASE_URL = 'https://api.thedogapi.com/v1/'

/*    
    GET https://api.thedogapi.com/v1/breeds
    GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

*/

module.exports={
    instance: axios.create({
        baseURL: BASE_URL,
    })
}
