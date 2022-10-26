const { getBreedsApi } = require("./index");
const { Temperament } = require("../db.js");

async function setTemperamentsToDB() {
  try {
    const temperament = await Temperament.findAll();
    if (!temperament.length) {
      const { data } = await getBreedsApi();
      const temperaments = Array.from(
        new Set(
          data
            .map((element) => {
              return element.temperament
                ?.split(",")
                .map((element) => element.trimStart());
            })
            .flat()
            .filter((temp) => temp)
        )
      ).map((element) => {
        return { name: element };
      });

      Temperament.bulkCreate(temperaments);
    }
  } catch (error) {
    throw error.message;
  }
}

async function getAllData() {
  try {
    const { data } = await getBreedsApi();
    const dogs = data.map((element) => {
      let up = element?.weight?.imperial;
      if (up.includes("up")) up = up.split("-")[1];
      else up = false;

      return {
        id: element.id,
        name: element.name,
        temperaments: element?.temperament
          ?.split(",")
          .map((element) => element.trimStart()),
        weight: up ? up : element?.weight?.imperial,

        image: element.image?.url,
      };
    });
    return dogs;
  } catch (error) {
    throw error.message;
  }
}

async function getDataByQuery(name) {
  if (!name) return [];
  try {
    const data = await getAllData();
    const dogs = data.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase())
    );
    if (!dogs.length) return [];

    return dogs;
  } catch (error) {
    throw error.message;
  }
}

async function getDataById(id) {
  try {
    const { data } = await getBreedsApi();
    const dog = data.filter((element) => element.id === id)[0];
    if (!dog?.id) return {};

    const dogFound = {
      id: dog.id,
      name: dog.name,
      weight: dog.weight?.imperial,
      height: dog?.height.metric,
      life_span: dog.life_span,
      image: dog?.image?.url,
      origin: dog.origin,
      temperaments: dog?.temperament
        ?.split(",")
        .map((element) => element.trimStart()),
    };
    return dogFound;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  setTemperamentsToDB,
  getAllData,
  getDataByQuery,
  getDataById,
};
