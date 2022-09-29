const router = require('express').Router();

router.use('/route', require('./route')); // matches all requests to /api/route/

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;