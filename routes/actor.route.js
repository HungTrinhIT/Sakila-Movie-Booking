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
  try {
    console.log("Hello");
    const id = req.params.id;
    const actor = await actorModel.single(id);
    if (actor === null) {
      res.status(204).send("No data");
    }

    await actorModel.del(id);
    res.json({ msg: "actor removed" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error!");
  }
});

module.exports = router;
