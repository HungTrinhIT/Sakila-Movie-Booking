const db = require("../utils/db");
const DB_NAME = "country";
module.exports = {
  all() {
    return db(DB_NAME);
  },

  async single(id) {
    const countries = await db(DB_NAME).where("country_id", id);

    if (countries.length === 0) {
      return null;
    }

    return countries[0];
  },

  add(country) {
    return db(DB_NAME).insert(country);
  },

  delete(id) {
    return db(DB_NAME).del().where("country_id", id);
  },

  update(country, id) {
    return db(DB_NAME).where("country_id", id).update(country);
  },
};
