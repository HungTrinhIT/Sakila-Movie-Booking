const express = require("express");
const filmModel = require("../models/film.model");
const router = express.Router();
const dateFormat = require("dateformat");
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

//@route DELETE api/films
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
router.put("/:id", async function (req, res) {
  const id = req.params.id;
  const {
    title,
    description,
    release_year,
    language_id,
    original_language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features,
  } = req.body;

  let filmFields = {};
  const singleFilm = await filmModel.single(id);
  if (!singleFilm) return res.json({ msg: "Film not found" });

  if (title) filmFields.title = title;
  if (description) filmFields.description = description;
  if (release_year) filmFields.release_year = release_year;
  if (language_id) filmFields.language_id = language_id;
  if (original_language_id)
    filmFields.original_language_id = original_language_id;
  if (rental_duration) filmFields.rental_duration = rental_duration;
  if (rental_rate) filmFields.rental_rate = rental_rate;
  if (length) filmFields.length = length;
  if (replacement_cost) filmFields.replacement_cost = replacement_cost;
  if (rental_rate) filmFields.rental_rate = rental_rate;

  const ratingSet = ["G", "PG", "PG-13", "R", "NC-17"];
  if (rating && ratingSet.includes(rating)) filmFields.rating = rating;

  const special_featuresSet = [
    "Trailers",
    "Commentaries",
    "Deleted Scenes",
    "Behind the Scenes",
  ];

  if (special_features && special_featuresSet.includes(special_features))
    filmFields.special_features = special_features;

  filmFields.last_update = dateFormat(new Date(), "yyyy:mm:dd hh:MM:ss");

  const ids = await filmModel.update(filmFields, id);
  filmFields.film_id = ids[0];

  res.json(filmFields);
});

module.exports = router;
