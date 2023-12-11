// Import the database connection
const pool = require('../db');

// Get contributions
exports.getContributions = async (req, res) => {
    try {
        const query = 'SELECT * FROM contribution';
        const [contributions, fields] = await pool.query(query);
        res.render('basic/contributions', { contributions });
    } catch (error) {
        console.error('Error fetching contributions:', error);
        res.status(500).send('Internal Server Error');
    }
};
