const {getDataById,getDataByQuery} = require('./dataOfApi')

async function prueba(param) {
    const a = await getDataByQuery(param)
    console.log(a);
}
prueba('aff')