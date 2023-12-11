const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const aluminiController = require('../controllers/aluminiController');
const contestController = require('../controllers/contestController');
const championController = require('../controllers/championController');
const videoController = require('../controllers/videoController');
const pool = require('../db'); // Import the database connection

router.get('/', (req, res) => {
    res.send('Hello');
});

router.get('/home', (req, res) => {
    res.render('basic/index.ejs');
});

// Add other routes as needed...

// Achievement routes
router.get('/achievements', achievementController.getAchievements);
router.get('/add-achievement', achievementController.renderAddAchievement);
router.post('/add-achievement', achievementController.addAchievement);
router.get('/update-achievement', achievementController.renderUpdateAchievement);
router.post('/update-achievement', achievementController.updateAchievement);
router.get('/delete-achievement', achievementController.renderDeleteAchievement);
router.post('/delete-achievement', achievementController.deleteAchievement);

// Alumini routes
router.get('/alumini', aluminiController.getAluminis);

// Contest routes
router.get('/contests', contestController.getContests);

// Champion routes
router.get('/champions', championController.getChampions);

// Contribution routes
router.get('/contributions', contestController.getContests);

// Video Controller
router.get('/watch-video', videoController.getVideos)

// Home route
router.get('/home', (req, res) => {
    res.render('basic/index.ejs');
});

// About route
router.get('/about', (req, res) => {
    res.render('basic/about.ejs');
});

// New route
router.get('/new', (req, res) => {
    res.render('basic/new.ejs');
});

// Learn More route
router.get('/learn-more', (req, res) => {
    res.render('basic/learn-more.ejs');
});

module.exports = router;
