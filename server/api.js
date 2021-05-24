const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// /api/minions
// Minion:
    // id: string
    // name: string
    // title: string
    // salary: number

// MINIONS
// DRY Minion existence check
apiRouter.use('/minions/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion not found!');
    } 
});

// GET /api/minions to get an array of all minions.
apiRouter.get('/minions', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions) {
        res.send(allMinions);
    } else {
        res.status(404).send('Minions not found!');
    } 
});

// POST /api/minions to create a new minion and save it to the database.
apiRouter.post('/minions', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
apiRouter.get('/minions/:minionId', (req, res, next) => {
    res.send(req.minion);
})

// PUT /api/minions/:minionId to update a single minion by id.
apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
apiRouter.delete('/minions/:minionId', (req, res, next) => {
    deleteFromDatabasebyId('minions', req.minion.id);
    res.send('Minion successful deleted');
})



// ERRORHANDLER
apiRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

module.exports = apiRouter;
