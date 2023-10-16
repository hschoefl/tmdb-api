const asyncHandler = require("express-async-handler");

const searchSerie = asyncHandler(async (req, res) => {
  const { language = "de", query } = req.query;
  console.log(language, query);

  // eslint-disable-next-line no-undef
  const url = `${process.env.TMDB_API_URL_SEARCH_TV}?language=${language}&query=${query}&api_key=${process.env.TMDB_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  res.send({
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  });
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

const getSerieDetailsById = asyncHandler(async (req, res) => {
  const { seriesId } = req.params;

  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.TMDB_API_URL_TV}/${seriesId}?api_key=${process.env.TMDB_API_KEY}&language=de`
  );

  const data = await response.json();
  res.json(data);
});

const getSeasonBySeasonNumber = asyncHandler(async (req, res) => {
  const { seriesId, seasonNumber } = req.params;

  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.TMDB_API_URL_TV}/${seriesId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}&language=de`
  );

  const data = await response.json();

  res.json(data);
});

// https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}

const getEpisodeDetailsByEpisodeNumber = asyncHandler(async (req, res) => {
  const { seriesId, seasonNumber, episodeNumber } = req.params;

  const response = await fetch(
    // eslint-disable-next-line no-undef
    `${process.env.TMDB_API_URL_TV}/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.TMDB_API_KEY}&language=de`
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
  getSerieDetailsById,
  getSeasonBySeasonNumber,
  getEpisodeDetailsByEpisodeNumber,
};
