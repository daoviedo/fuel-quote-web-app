const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAll = 'SELECT * FROM sys.user';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'coogs123',
    database: 'sys'
});

connection.connect(err => {
    if(err) {
        return err;
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
        if(err){
            return res.send(err)
        }
        else{
            return res.send('Successfully Added User')
        }
    });
});

app.get('/users/remove', (req, res) => {
    const { username, pass } = req.query;
    const removeQuery = `DELETE FROM sys.user WHERE username='${username}' AND password = '${pass}'`;
    connection.query(removeQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send('Successfully Removed User')
        }
    });
});

app.get('/users/lookup', (req, res) => {
    const { username, pass } = req.query;
    const lookQuery = `SELECT * FROM sys.user WHERE username='${username}' AND password = '${pass}'`;
    connection.query(lookQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    });
});

app.get('/users', (req, res) => {
    connection.query(selectAll, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});