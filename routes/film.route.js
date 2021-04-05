const express = require("express");
const filmModel = require("../models/film.model");
const router = express.Router();

//@route GET api/films
//@desc Get all films
//access public
router.get("/", async function (req, res) {
  const films = await filmModel.all();
  res.json(films);
});

//@route GET api/films:id
//@desc Get single film
//access Public
router.get("/:id", async function (req, res) {
  const filmID = req.params.id;

  const film = await filmModel.single(filmID);
  if (film === null) {
    return res.status(204).json({ msg: "Film is not existence" });
  }

  res.json(film);
});

//@route POST api/films
//@desc Add new film
//access Private
const schema = require("../schemas/film.json");
router.post(
  "/",
  require("../middlewares/validate.mdw")(schema),
  async function (req, res) {
    const film = req.body;
    const ids = await filmModel.add(film);
    film.film_id = ids[0];
    res.status(201).json(film);
  }
);

//@route POST api/films
//@desc Add new film
//access Private
router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const singleFilm = await filmModel.single(id);

  if (!singleFilm) {
    return res.status(204).json({ msg: "Film is not exsit" });
  }

  await filmModel.delete(id);

  res.status(204).json({ msg: "Delete Succesfully" });
});

//@route POST api/films
//@desc Add new film
//access Private
router.put("/");

module.exports = router;
