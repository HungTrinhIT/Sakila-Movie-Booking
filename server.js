const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("express-async-errors");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routing
app.use("/api/films", require("./routes/film.route"));
app.use("/api/actors", require("./routes/actor.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/countries", require("./routes/country.route"));
app.use("/api/cities", require("./routes/city.route"));

// Error Handling
app.use(function (req, res, next) {
  res.status(404).json({
    error_message: "Endpoint not found",
  });
});

// Default error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error_message: "Something broke!",
  });
});

PORT = 5000;
app.listen(PORT, () => `Server is running at PORT=${PORT}`);
