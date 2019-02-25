const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAll = 'SELECT * FROM sys.user';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Coogs123',
    database: 'sys'
});

connection.connect(err => {
    if (err) {
        return err;
    } else {
        console.log('Connected to the MySQL server');
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello From servers')
});

app.get('/users/add', (req, res) => {
    const { username, pass } = req.query;
    const insertQuery = `INSERT INTO sys.user (username, password) VALUES('${username}','${pass}')`;
    connection.query(insertQuery, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('Successfully Added User')
        }
    });
});

app.get('/users', (req, res) => {
    connection.query(selectAll, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});