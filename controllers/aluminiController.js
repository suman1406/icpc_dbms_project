const pool = require('../db'); // Import the database connection

// Controller methods for alumini routes
const getAluminis = async (req, res) => {
    let q = 'SELECT * FROM alumini';
    try {
        const [data, fields] = await pool.query(q);
        res.render('basic/alumini', { aluminis: data });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

// Add other controller methods as needed...

module.exports = {
    getAluminis,
    // Add other exported methods as needed...
};
