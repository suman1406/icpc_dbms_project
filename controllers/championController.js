const pool = require('../db'); // Import the database connection

// Controller methods for champion routes
const getChampions = async (req, res) => {
    let q = 'SELECT * FROM champion';
    try {
        const [data, fields] = await pool.query(q);
        res.render('basic/champions', { champions: data });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

// Add other controller methods as needed...

module.exports = {
    getChampions,
    // Add other exported methods as needed...
};
