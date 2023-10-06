require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const tmdbRouter = require("./routes/tmdb");
const { errorHandler } = require("./middlewares/errorHandler");

// server initilization
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// enable morgan for console logging
app.use(morgan("tiny"));

// enable access for public
app.use(cors());

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/tmdb", tmdbRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express Server started on port ${PORT}...`);
});
