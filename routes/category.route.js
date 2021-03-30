const express = require("express");
const router = express.Router();
const categoriesModel = require("../models/category.model");
const dateFormat = require("dateformat");
router.get("/", async function (req, res) {
  try {
    const categories = await categoriesModel.all();
    res.json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const category = await categoriesModel.single(id);
    if (category === null) {
      return res.status(204).json({ msg: "Film is not existence" });
    }

    res.json(category);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error!");
  }
});

const categorySchema = require("../schemas/category.json");
router.post(
  "/",
  require("../middlewares/validate.mdw")(categorySchema),
  async function (req, res) {
    const { name } = req.body;
    try {
      const newCat = {
        name,
        last_update: dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
      };
      const ids = await categoriesModel.add(newCat);
      newCat.id = ids[0];
      res.json(newCat);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
