const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('../db');

// MINIONS
// DRY Minion existence check
minionsRouter.use('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion not found!');
    } 
});

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions) {
        res.send(allMinions);
    } else {
        res.status(404).send('Minions not found!');
    } 
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion);
})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res) => {
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res) => {
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send();
});

module.exports = minionsRouter;