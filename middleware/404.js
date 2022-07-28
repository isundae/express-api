module.exports =
  (msg = '') =>
  (req, res, next) => {
    res.status(404).send('404 Not Found.' + msg)
  }
