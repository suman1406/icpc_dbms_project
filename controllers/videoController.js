const pool = require('../db'); // Import the database connection

exports.getVideos = (req, res) => {
    let q = 'SELECT * FROM video';
    try {
        pool.query(q, (err, videos) => {
            if (err) throw err;
            res.render('basic/watch-videos.ejs', { videos });
        });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};
