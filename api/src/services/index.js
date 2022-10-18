const {instance} = require('./api/baseApi.js');

const {API_KEY} = process.env

const breeds = 'breeds';
const query = '/search?q='
const image = 'images/'

module.exports={
    getBreedsApi: function(){
        return instance.get(breeds)
    },
    getBreedsApiQuery: function(raza_perro) {
        return instance.get(`${breeds}${query}${raza_perro}`)
    },
    getImageDog: function(image_id){
        return instance.get(`${image}${image_id}`)
    },
    API_KEY
}