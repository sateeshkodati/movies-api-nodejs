const axios = require('axios');

const moviesUrl = 'https://swapi.co/api/films/';

const  moviesCache = {}

/**
 * sortMoviesbyDirectorCompare - sort compare fn
 * @param {Object} a
 * @param {Object} b
 */
function sortMoviesbyDirectorCompare(a,b) {
  aDirector = a.director.toUpperCase();
  bDirector = b.director.toUpperCase();

  let comparison = 0;
  if (aDirector !== bDirector) {
    comparison = aDirector > bDirector ? 1 : -1
  }

  return comparison;
}


/**
 * fetch Movies
 */
function fetchMovies() {
  return new Promise((resolve, reject) => {
    if (moviesCache && Object.keys(moviesCache).length > 0) {
      console.log('movies from cache : ')
      return resolve(moviesCache);
    } else {
      axios.get(moviesUrl)
        .then(({ data }) => {
          movies = [ ...(data && data.results || [])]

          // sort movies by director
          movies.sort(sortMoviesbyDirectorCompare);

          if (Array.isArray(movies)){
            // add movies to cache to reuse
            for (movie of movies) {
              moviesCache[movie.episode_id] =  {
                id: movie.episode_id, name: movie.title,
                director: movie.director,
                characterResources: movie.characters
              };
            }
            return resolve (moviesCache);
          }
          return resolve({});
        });
    }
  });
}


/**
 * getMovies
 */
function getMovies() {
  return fetchMovies()
    .then((movies) => {
      return Object.keys(movies).map(key => {
        const movie = movies[key];
        return {
          id: movie.id,
          name: movie.name,
          director: movie.director
        };
      });
    })
}


// fetch movie charactors
function fetchMovieCharacters(movie) {
  return new Promise((resolve, reject) => {
    if (movie.characters) {
      return resolve(movie.characters);
    } else {
      const characterPromises = [];
      for (characterResourceUrl of movie.characterResources || []) {
        characterPromises.push(axios.get(characterResourceUrl))
      }
      Promise.all(characterPromises)
        .then((allCharacters) => {
          const characters = allCharacters.map( res=> res.data.name);
          moviesCache[movie.id].characters = characters
          return resolve(characters)
        })
    }
  })
}

/**
 * getMovieCharacters
 * @param {String|number} movieId
 */
function getMovieCharacters(movieId) {
  return fetchMovies()
    .then(movies => {
      return movies[movieId]
    })
    .then(movie => {
      if (!movie) {
        return null
      }
      return fetchMovieCharacters(movie)
    });
}


module.exports = {
  getMovies,
  getMovieCharacters
}
