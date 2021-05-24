const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db');

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
apiRouter.get('/minions', (req, res) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions) {
        res.send(allMinions);
    } else {
        res.status(404).send('Minions not found!');
    } 
});

// POST /api/minions to create a new minion and save it to the database.
apiRouter.post('/minions', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
apiRouter.get('/minions/:minionId', (req, res) => {
    res.send(req.minion);
})

// PUT /api/minions/:minionId to update a single minion by id.
apiRouter.put('/minions/:minionId', (req, res) => {
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
apiRouter.delete('/minions/:minionId', (req, res) => {
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send();
});


// IDEAS
// DRY Idea existence check
apiRouter.use('/ideas/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea not found!');
    } 
});

// GET /api/ideas to get an array of all ideas.
apiRouter.get('/ideas', (req, res) => {
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
        res.send(ideas);
    } else {
        res.status(404).status('No ideas found!');
    }
});

// POST /api/ideas to create a new idea and save it to the database.
apiRouter.post('/ideas', (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
apiRouter.get('/ideas/:ideaId', (req, res) => {
    res.send(req.idea);
})

// PUT /api/ideas/:ideaId to update a single idea by id.
apiRouter.put('/ideas/:ideaId', (req, res) => {
    const updateIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
apiRouter.delete('/ideas/:ideaId', (req, res) => {
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send();
});


// MEETINGS
// GET /api/meetings to get an array of all meetings.
apiRouter.get('/meetings', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
    } else {
        res.status(404).status('No meetings found!');
    }
});

// POST /api/meetings to create a new meeting and save it to the database.
apiRouter.post('/meetings', (req, res) => {
    const newMeeting = createMeeting();
    const createdMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(createdMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.
apiRouter.delete('/meetings', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});



// ERRORHANDLER
apiRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

module.exports = apiRouter;
