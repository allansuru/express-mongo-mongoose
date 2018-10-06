module.exports =  function(err, req, res, next) {
    // Log de excessão
    res.status(500).send('Error on server!')
  }