const pool = require('../db'); // Import the database connection

exports.getContributions = (req, res) => {
    let q = 'SELECT * FROM contribution';
    try {
        pool.query(q, (err, data) => {
            if (err) throw err;
            res.render('basic/contributions', { contributions: data });
        });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};
