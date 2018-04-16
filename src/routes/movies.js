const express  = require('express')
const logger  = require('../logger');

router = express.Router();

const movieService = require('../services/movies');

const serverError = {
  status: 500,
  message: 'server error',
};

router.get('/', (req, res) => {
  movieService.getMovies()
    .then((movies) => {
      res.send(movies);
    })
    .catch(err => {
      logger.error(err.stack)
      res.status(500).send(serverError);
    })
});

router.get('/:id/characters', (req, res) => {
  movieService.getMovieCharacters(req.params.id)
    .then(characters => {
      if (!characters) {
        return res.status(404).send({
          message: 'movie not found'
        })
      }
      res.send(characters)
    })
    .catch(err => {
      logger.error(err.stack)
      res.status(500).send(serverError);
    })
});

module.exports = router;
