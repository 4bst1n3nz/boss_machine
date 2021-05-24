const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routes/minions');
const ideasRouter = require('./routes/ideas');
const meetingsRouter = require('./routes/meetings');

// ROUTES
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

// ERRORHANDLER
apiRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

module.exports = apiRouter;