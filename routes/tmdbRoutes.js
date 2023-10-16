const { Router } = require("express");

const tmdbController = require("../controller/tmdbController");

const router = Router();

router.get("/", tmdbController.searchSerie);
router.get("/popular", tmdbController.popularSeries);
router.get("/top", tmdbController.topRatedSeries);
router.get("/account", tmdbController.accountDetails);
router.get("/configuration", tmdbController.getConfiguration);
router.get("/:seriesId", tmdbController.getSerieDetailsById);
router.get("/:seriesId/:seasonNumber", tmdbController.getSeasonBySeasonNumber);
router.get(
  "/:seriesId/:seasonNumber/:episodeNumber",
  tmdbController.getEpisodeDetailsByEpisodeNumber
);

module.exports = router;
