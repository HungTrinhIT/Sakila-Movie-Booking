const db = require("../utils/db");

module.exports = {
  all() {
    return db("category");
  },

  async single(id) {
    const categories = await db("category").where("category_id", id);

    if (categories.length === 0) {
      return null;
    }

    return categories[0];
  },

  add(category) {
    return db("category").insert(category);
  },
};
