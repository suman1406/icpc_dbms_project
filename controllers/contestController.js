const pool = require('../db'); // Import the database connection

// Controller methods for contest routes
const getContests = async (req, res) => {
    let q = 'SELECT * FROM contest';
    try {
        const [data, fields] = await pool.query(q);
        res.render('basic/contests', { contests: data });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

// Add other controller methods as needed...

module.exports = {
    getContests,
    // Add other exported methods as needed...
};
