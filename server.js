const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Routing
app.use("/api/films", require("./routes/film.route"));
app.use("/api/actors", require("./routes/actor.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/countries", require("./routes/country.route"));
app.use("/api/cities", require("./routes/city.route"));

PORT = 5000;
app.listen(PORT, () => `Server is running at PORT=${PORT}`);
