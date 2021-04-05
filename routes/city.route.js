const express = require("express");
const router = express.Router();
const cityModel = require("../models/city.model");
const validator = require("../middlewares/validate.mdw");
const dateFormat = require("dateformat");
const citySchema = require("../schemas/city.json");
router.get("/", async function (req, res) {
  const cities = await cityModel.all();
  res.json(cities);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;

  const singleCity = await cityModel.single(id);
  if (!singleCity) {
    return res.status(204).json({ msg: "City not found" });
  }
  res.json(singleCity);
});

router.post("/", validator(citySchema), async function (req, res) {
  const { city, country_id } = req.body;

  const newCity = {
    city,
    country_id,
    last_update: dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
  };

  const ids = await cityModel.add(newCity);
  newCity.city_id = ids[0];
  res.status(201).json(newCity);
});
router.put("/:id", async function (req, res) {
  res.send("Put");
});
router.delete("/:id", async function (req, res) {
  const id = await req.params.id;

  const singleCity = await cityModel.single(id);
  if (!singleCity) {
    return res.json({ msg: "City not found" });
  }

  await cityModel.delete(id);
  res.json({ msg: "Delete succesfully" });
});

module.exports = router;
