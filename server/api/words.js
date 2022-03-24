const express = require('express');
const router = express.Router();
const { models: { Answer } } = require('../db');

/* mounted on /api/wordle */

//WRITE ADMIN ROUTE TO ACCOMPANY THIS
router.get('/answer', async (req, res, next) => {
    try {
        const randomPK = Math.floor(Math.random() * 12500)
        const getRandomWord = await Answer.findByPk(randomPK);
        res.json(getRandomWord);
    } catch (error) {
        next(error);
    }
});

