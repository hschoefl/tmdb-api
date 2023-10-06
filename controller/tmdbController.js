const asyncHandler = require("express-async-handler");

const searchSerie = asyncHandler(async (req, res) => {
  // const response = await fetch(``)

  res.send("searchSerie touched");
});

const popularSeries = asyncHandler(async (req, res) => {
  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.TMDB_API_URL_TV}/popular?language=de&api_key=${process.env.TMDB_API_KEY}`
  );

  const data = await response.json();

  // just return 10 results
  if (data.results.length > 10) data.results.length = 10;

  res.json(data.results);
});

const topRatedSeries = asyncHandler(async (req, res) => {
  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.TMDB_API_URL_TV}/top_rated?language=de&api_key=${process.env.TMDB_API_KEY}`
  );

  const data = await response.json();
  // just return 10 results
  if (data.results.length > 10) data.results.length = 10;

  res.json(data.results);
});

// geht anscheinend nur über Bearer Token und nicht über api_key
const accountDetails = asyncHandler(async (req, res) => {
  const response = await fetch(
    // eslint-disable-next-line no-undef
    `https://api.themoviedb.org/3/account/${process.env.TMDB_ACCOUNT_ID}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${process.env.TMDB_API_BEARER_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  res.json(data);
});

const getConfiguration = asyncHandler(async (req, res) => {
  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.TMDB_API_URL_CONFIGURATION}?api_key=${process.env.TMDB_API_KEY}`
  );

  const data = await response.json();

  res.json(data);
});

module.exports = {
  searchSerie,
  popularSeries,
  topRatedSeries,
  accountDetails,
  getConfiguration,
};
