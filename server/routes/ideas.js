const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

// IDEAS
// DRY Idea existence check
ideasRouter.use('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea not found!');
    } 
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res) => {
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
        res.send(ideas);
    } else {
        res.status(404).status('No ideas found!');
    }
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.idea);
})

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res) => {
    const updateIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res) => {
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send();
});

module.exports = ideasRouter;