const express = require("express");
const router = express.Router();
const actorModel = require("../models/actor.model");
const actorSchema = require("../schemas/actor.json");
const validator = require("../middlewares/validate.mdw");
const dateFormat = require("dateformat");
const { route } = require("./film.route");
//@route GET api/actors
//@desc Get all actors
//@access public
router.get("/", async function (req, res) {
  const actors = await actorModel.all();
  res.json(actors);
});

//@route GET api/actors
//@desc Get single actor
//@access public
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const actor = await actorModel.single(id);

  if (actor === null)
    return res.status(204).json({ msg: "Actor is not existence!" });

  res.json(actor);
});

//@route POST api/films
//@desc add new actor
//@access private
router.post("/", validator(actorSchema), async function (req, res) {
  const { first_name, last_name } = req.body;
  const newActor = {
    first_name,
    last_name,
    last_update: dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
  };

  const ids = await actorModel.add(newActor);
  newActor.actor_id = ids[0];
  res.status(201).json(newActor);
});

//@route DELETE api/films
//@desc delete a actor
//@access private
router.delete("/:id", async function (req, res) {
  const id = req.params.id;

  const singleActor = await actorModel.single(id);
  if (!singleActor) {
    res.status(204).json({ msg: "Actor not found" });
  }

  await actorModel.delete(id);
  return res.status(204).json({ msg: "Delete succesfully" });
});

//@route PUT api/films
//@desc update a actor
//@access private
router.put("/:id", async function (req, res) {
  const { first_name, last_name } = req.body;
  const currentID = req.params.id;

  let actorFields = {};
  if (first_name) actorFields.first_name = first_name;
  if (last_name) actorFields.last_name = last_name;
  actorFields.last_update = dateFormat(new Date(), "yyyy:mm:dd hh:MM:ss");

  const singleActor = await actorModel.single(currentID);
  if (!singleActor) return res.json({ msg: "Actor not found!" });

  const ids = await actorModel.update(actorFields, currentID);
  actorFields.actor_id = ids[0];
  res.json(actorFields);
});

module.exports = router;
