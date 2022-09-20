const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  const data = await getAllPlanets();
  return res.status(200).json(data);
}

module.exports = { httpGetAllPlanets };
