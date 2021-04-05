const db = require("../utils/db");
const DB_NAME = "city";
module.exports = {
  all() {
    return db(DB_NAME);
  },

  async single(id) {
    const cities = await db(DB_NAME).where("city_id", id);

    if (cities.length === 0) {
      return null;
    }

    return cities[0];
  },

  add(city) {
    return db(DB_NAME).insert(city);
  },

  delete(id) {
    return db(DB_NAME).del().where("city_id", id);
  },

  update(city, id) {
    return db(DB_NAME).where("city_id", id).update(city);
  },
};
