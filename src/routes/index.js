const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const content = `<h2>Movies api</h2>
    <div>GET - /api/movies   : get all movies </div>
    <div>GET - /api/movies/{id}/characters : get movie characters </div>
  `
  res.send(content);
})

module.exports = router;
