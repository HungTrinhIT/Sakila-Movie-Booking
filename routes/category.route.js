const express = require("express");
const router = express.Router();
const categoriesModel = require("../models/category.model");
const dateFormat = require("dateformat");
router.get("/", async function (req, res) {
  const categories = await categoriesModel.all();
  res.json(categories);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const category = await categoriesModel.single(id);
  if (category === null) {
    return res.status(204).json({ msg: "Film is not existence" });
  }

  res.json(category);
});

const categorySchema = require("../schemas/category.json");
router.post(
  "/",
  require("../middlewares/validate.mdw")(categorySchema),
  async function (req, res) {
    const { name } = req.body;
    const newCat = {
      name,
      last_update: dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
    };
    const ids = await categoriesModel.add(newCat);
    newCat.id = ids[0];
    res.status(201).json(newCat);
  }
);

router.delete("/:id", async function (req, res) {
  const id = req.params.id;

  const singleCategory = await categoriesModel.single(id);
  if (!singleCategory) {
    return res.status(204).json({ msg: "Category not found" });
  }

  await categoriesModel.delete(id);
  res.status(204).json({ msg: "Delete successfully" });
});

router.put("/:id", async function (req, res) {
  const currentID = req.params.id;
  const { name } = req.body;
  let categoryFields = {};

  if (name) categoryFields.name = name;
  categoryFields.last_update = dateFormat(new Date(), "yyyy:mm:dd hh:MM:ss");

  const singleCategory = await categoriesModel.single(currentID);
  if (!singleCategory) return res.json({ msg: "Category not found" });

  const ids = await categoriesModel.update(categoryFields, currentID);
  categoryFields.category_id = ids[0];

  res.json(categoryFields);
});
module.exports = router;
