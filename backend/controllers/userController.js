const pool = require('../config/database');

const getUsers = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    }
    catch(err){
        console.error('ERROR executing query', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

module.exports = {getUsers};