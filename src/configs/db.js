const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'possap'
});

connection.connect((err) => {
    if (err) console.log(`Error MYSQL ${err}`);
    

});

module.exports = connection;