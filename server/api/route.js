// apiRoutes/model.js
const router = require('express').Router();

// matches GET requests to /api/model/
router.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/model/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/model/:modelId
router.put('/:modelId', function (req, res, next) { /* etc */});
// matches DELETE requests to /api/model/:modelId
router.delete('/:modelId', function (req, res, next) { /* etc */});

module.exports = router;