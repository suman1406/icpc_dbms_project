const pool = require('../db');

// Controller methods for achievement routes
const getAchievements = (req, res) => {
    let q = 'SELECT * FROM award where isActive = 1';
    try {
        pool.query(q, (err, data) => {
            if (err) throw err;
            res.render('basic/achieve.ejs', { achievements: data });
        });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

const renderAddAchievement = (req, res) => {
    res.render('crud/Achievement/add-achievement.ejs');
};

const addAchievement = (req, res) => {
    // Extract data from the form
    const { awardname, yearreceived } = req.body;

    // Create SQL query to insert the new achievement
    const insertQuery = 'INSERT INTO award (awardname, yearreceived) VALUES (?, ?)';

    // Execute the query with data
    pool.query(insertQuery, [awardname, yearreceived], (error, results) => {
        if (error) {
            console.error('Error adding achievement:', error);
            res.send('Error adding achievement');
        } else {
            console.log('Achievement added successfully!');
            res.redirect('/achievements');
        }
    });
};

const renderUpdateAchievement = (req, res) => {
    res.render('crud/Achievement/update-achievement.ejs');
};

const updateAchievement = (req, res) => {
    // Extract data from the form
    const { awardname, yearreceived } = req.body;

    // Check if the awardname exists and is active
    const checkExistenceQuery = 'SELECT * FROM award WHERE awardname = ? AND isActive = 1';

    pool.query(checkExistenceQuery, [awardname], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking existence of the award:', checkError);
            return res.send('Error updating achievement');
        }

        // Check if the awardname exists
        if (checkResults.length === 0) {
            console.log('Award not found or inactive:', awardname);
            return res.send('Award not found or inactive');
        }

        // Award exists and is active, proceed with the update
        const updateQuery = 'UPDATE award SET yearreceived = ? WHERE awardname = ?';

        // Execute the update query with data
        pool.query(updateQuery, [yearreceived, awardname], (updateError, updateResults) => {
            if (updateError) {
                console.error('Error updating achievement:', updateError);
                res.send('Error updating achievement');
            } else {
                console.log('Achievement updated successfully!');
                res.redirect('/achievements'); // Redirect to the achievements page
            }
        });
    });
};

const renderDeleteAchievement = (req, res) => {
    res.render('crud/Achievement/delete-achievement.ejs');
};

const deleteAchievement = (req, res) => {
    const awardnameToDelete = req.body.awardname;

    // Begin a transaction to ensure atomicity
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.send('Error deleting achievement');
        }
        // Delete the achievement
        const deleteAchievementQuery = 'Update award set isActive = 0 WHERE awardname = ?';
        connection.query(deleteAchievementQuery, [awardnameToDelete], (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    connection.release();
                    console.error('Error deleting achievement:', error);
                    res.send('Error deleting achievement');
                });
            }

            // Commit the transaction
            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        console.error('Error committing transaction:', err);
                        res.send('Error deleting achievement');
                    });
                }

                console.log('Achievement and associated contributions deleted successfully!');
                res.redirect('/achievements');
                connection.release();
            });
        });
    });
};

module.exports = {
    getAchievements,
    renderAddAchievement,
    addAchievement,
    renderUpdateAchievement,
    updateAchievement,
    renderDeleteAchievement,
    deleteAchievement,
};
