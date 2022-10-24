const { Router } = require("express");
const { Op } = require("sequelize");
const { Temperament, Dog } = require("../db.js");
const {
  getAllData,
  getDataById,
  getDataByQuery,
} = require("../services/dataOfApi");
const {getNecessaryData} = require('../utils/index')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/dogs", async (req, res) => {
  const { name } = req.query;

  if (name?.length) {
    try {
      const dataApi = await getDataByQuery(name);

      const dataDB = getNecessaryData(await Dog.findAll({
        where: { name: { [Op.iLike]: '%'+ name + '%' } },
        attributes: ["id", "name", "image", "weight"],
        include: [
          {
            model: Temperament,
          },
        ],
      }));

      if(dataApi.length || dataDB.length) res.send([...dataApi,...dataDB]);
      else res.status(404).send({msg:'NO Found'})

    } catch (error) {
      res.status(502).json({ msg: error.message });
    }
  } else {
    try {
      const dataApi = await getAllData();
      const dataDB = getNecessaryData(await Dog.findAll({
        attributes: ["id", "name", "image", "weight"],
        include: [
          {
            model: Temperament,
          },
        ],
      }));
      res.send([...dataApi, ...dataDB]);
    } catch (error) {
      res.status(502).json({ msg: error.message });
    }
  }
});

router.get("/dogs/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  if (idRaza.length < 4) {
    try {
        const dataApi = await getDataById(parseInt(idRaza))
        if(dataApi.id) return res.send(dataApi)
    } catch (error) {
      res.status(502).json({ msg: error.message });
    }
  }else if(idRaza.length >=36){
    const dataDB = await Dog.findOne({
        where: {id: idRaza},
        include: [
          {
            model: Temperament,
          },
        ],
      });
      if (dataDB) return res.send({
        id: dataDB.id,
        name: dataDB.name,
        weight: dataDB.weight,
        height: dataDB.height,
        life_span: dataDB.life_span,
        image: dataDB.image,
        temperaments: dataDB.temperaments.map((ele) => ele.name)
      })
  }
  res.status(404).json({msg:'NO Found'})
});

router.get("/temperaments", async (req, res) => {
  try {
    const temperaments = await Temperament.findAll();
    if (!temperaments.length)
      return res.status(404).json({ msg: "Without data" });
    res.send(temperaments);
  } catch (error) {
    res.status(502).json({ msg: error.message });
  }
});

router.post("/dogs", async (req, res) => {
  const { name, height, weight, life_span, image, description, temperaments } =
    req.body;
  if (!name || !height || !weight) {
    res.status(400).json({ msg: "Missing Data" });
  } else {
    try {
      let dog = await Dog.create({
        name,
        height,
        weight,
        life_span: life_span ? life_span : null,
        image: image ? image : null,
        description: description ? description : null,
      });
      if (temperaments.length) {
        dog.addTemperaments([...temperaments]);
      }
      res.status(201).send({ msg: "Created Successful" });
    } catch (error) {
      res.status(502).json({ msg: error.message });
    }
  }
});

router.delete('/dog/:id',async(req,res)=>{
  const {id} = req.params

  try {
    await Dog.destroy({
      where: {id: id}
    })

    res.status(200).send({msg:'Correctly Eliminated'})
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router;
