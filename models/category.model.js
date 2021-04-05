const db = require("../utils/db");
const DB_NAME = "category";

module.exports = {
  all() {
    return db(DB_NAME);
  },

  async single(id) {
    const categories = await db(DB_NAME).where("category_id", id);

    if (categories.length === 0) {
      return null;
    }

    return categories[0];
  },

  add(category) {
    return db(DB_NAME).insert(category);
  },

  delete(id) {
    return db(DB_NAME).del().where("category_id", id);
  },

  update(category, id) {
    return db(DB_NAME).where("category_id", id).update(category);
  },
};
