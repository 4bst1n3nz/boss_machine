const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('../db');

// MEETINGS
// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
    } else {
        res.status(404).status('No meetings found!');
    }
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res) => {
    const newMeeting = createMeeting();
    const createdMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(createdMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;