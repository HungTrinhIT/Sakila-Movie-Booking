const db = require("../utils/db");
const DB_NAME = "actor";
module.exports = {
  all() {
    return db(DB_NAME);
  },

  async single(id) {
    const actors = await db(DB_NAME).where("actor_id", id);

    if (actors.length === 0) {
      return null;
    }

    return actors[0];
  },

  add(actor) {
    return db(DB_NAME).insert(actor);
  },

  delete(id) {
    return db(DB_NAME).del().where("actor_id", id);
  },
};
