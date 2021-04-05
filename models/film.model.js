const db = require("../utils/db");
const DB_NAME = "film";
module.exports = {
  all() {
    return db(DB_NAME);
  },

  async single(id) {
    const films = await db(DB_NAME).where("film_id", id);
    if (films.length === 0) {
      return null;
    }

    return films[0];
  },

  add(film) {
    return db(DB_NAME).insert(film);
  },

  delete(id) {
    return db(DB_NAME).del().where("film_id", id);
  },
};
