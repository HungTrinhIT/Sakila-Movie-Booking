const express = require("express");
const router = express.Router();
const countryModel = require("../models/country.model");
const countrySchema = require("../schemas/country.json");
const validator = require("../middlewares/validate.mdw");
const dateFormat = require("dateformat");
router.get("/", async function (req, res) {
  const countries = await countryModel.all();
  res.json(countries);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const singleCountry = await countryModel.single(id);

  if (!singleCountry) {
    return res.status(204).json({ msg: "Country is not exist" });
  }

  res.json(singleCountry);
});

router.post("/", validator(countrySchema), async function (req, res) {
  const { country } = req.body;
  const dateFormat = require("dateformat");

  const newCountry = {
    country,
    last_update: dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
  };

  const ids = await countryModel.add(newCountry);
  newCountry.country_id = ids[0];
  res.status(201).json(newCountry);
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const conuntry = await countryModel.single(id);
  console.log(conuntry);
  if (!conuntry) {
    return res.json({ msg: "Country is not exist" });
  }

  await countryModel.delete(id);
  res.json({ msg: "Delete succesfully" });
});

router.put("/:id", async function (req, res) {
  const id = req.params.id;
  const { country } = req.body;
  const singleCountry = await countryModel.single(id);
  if (!singleCountry) return res.json({ msg: "Country not found" });

  let countryFields = {};
  if (country) countryFields.country = country;

  countryFields.last_update = dateFormat(new Date(), "yyyy:mm:dd hh:MM:ss");

  const ids = await countryModel.update(countryFields, id);
  res.json(countryFields);
});

module.exports = router;
