# Sample Movies web api

## Technologies
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Axios](https://github.com/mzabriskie/axios) Promise based HTTP client
* [eslint](https://eslint.org/) code linting
* [pm2](http://pm2.keymetrics.io/) Nodejs production process manger

## Prerequisites
  * git
  * node.js >=6.10.0


## Installation and run
```bash
$ export NODE_ENV=developement/qa/production
$ npm install
$ npm start
```
## Run server using pm2 for production
Using pm2 start server with 'cluster' mode
```bash
$ npm run start:prod
```
server will start at http://localhost:3000

# API Design overview
- fetch movies and characters from swapico
    - using https://swapi.co resources to fetch movies and characters from the below resources
        - GET - https://swapi.co/api/films
        - GET -  https://swapi.co/api/people/{id}
    - fetch /films, /people for the first time and store it in the cache (in memory) and from the second time retrieve from the cache, for production ready replace in momery cache with distributed cache


# Web api resources
api resource base path http://localhost:3000/api
- GET /movies : get movies - http://localhost:3000/api/movies
- GET /movies/{id}/characters : get movie characters - http://localhost:3000/api/movies/{id}/characters

- GET /movies
    - response
    ```
        [
            {
                "id", "<movie id>",
                "name": "<movie name/title>", "director": "<director name>"
            },
            { ... },
            { ... },
            { ... }
        ]
    ```
- GET /movies/{id}/characters
    - response
    ```
        [
            "<name of character>",
            ...,
            ...
        ]
    ```

