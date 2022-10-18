function  getNecessaryData(data) {
 return data?.map(element=>{
    return {
        id: element.id,
        name: element.name,
        weight: element.weight,
        image: element.image,
        temperaments: element.temperaments.map((ele) => ele.name),
      };
 })
}

module.exports={
    getNecessaryData,
}