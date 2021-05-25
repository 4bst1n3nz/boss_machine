const express = require('express');
const workRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('../db');

// WORK
// GET /api/minions/:minionId/work to get an array of all work for the specified minion.
workRouter.get('/:minionId/work', (req, res) => {
    const allWork = getAllFromDatabase('work', req.params.minionId);
    const minionsWork = allWork.filter(element => element.minionId === req.params.minionId);
    if (minionsWork) {
        res.send(minionsWork);
    } else {
        res.status(400).send(minionsWork);
    } 
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
workRouter.post('/:minionId/work', (req, res) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
console.log(newWork);
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
workRouter.put('/:minionId/work/:workId', (req, res) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (!minion) {
        res.status(400).send();
    } else {
        const updateWork = updateInstanceInDatabase('work', req.body);
        res.send(updateWork);
    }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workRouter.delete('/:minionId/work/:workId', (req, res) => {
        if(deleteFromDatabasebyId('work', req.params.workId)) {
            // console.log("DELETE " + req.params.workId + " SUCCESSFUL!")
            res.status(204).send();
        } else {
            // console.log("DELETE " + req.params.workId + " NOT SUCCESSFUL!")
            res.status(404).send();
        }
});


module.exports = workRouter;