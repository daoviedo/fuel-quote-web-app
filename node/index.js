const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAll = 'SELECT * FROM sys.user';

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'coogs123',
    database: 'sys'
});

connection.connect(err => {
    if(err) {
        console.log(err);
        return err;
    } else {
        console.log("Success");
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

app.get('/users/adduser', (req, res) => {
    const { username, pass, fname, lname, ad1, ad2, city, st, zip, priv } = req.query;
    const insertQuery = `INSERT INTO sys.user (username, password, firstname, lastname, ad1, ad2, city, st, zip, priv) VALUES('${username}','${pass}','${fname}','${lname}','${ad1}','${ad2}','${city}','${st}','${zip}','${priv}')`;
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

app.get('/users/check', (req, res) => {
    const { username } = req.query;
    const lookQuery = `SELECT username FROM sys.user WHERE username='${username}'`;
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

app.get('/users/fuelrequestinfo', (req, res) => {
    const { username } = req.query;
    const addressQuery = `SELECT DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip FROM sys.history WHERE username='${username}'`;
    connection.query(addressQuery, (err, results) => {
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

app.get('/users/history', (req, res) => {
    const { username } = req.query;
    const findHistory = `SELECT * FROM sys.history WHERE username='${username}'`;
    connection.query(findHistory, (err, results) => {
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

app.get('/users/addRequest', (req, res) => {
    var date= new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
    const { UserName, GallonsRequested, PricePerGallon } = req.query;
    const insertQuery = `INSERT INTO sys.history (username, GallonsRequested, PricePerGallon, TotalPrice, DateOfRequest) 
                        VALUES('${UserName}','${GallonsRequested}','${PricePerGallon}','${PricePerGallon*GallonsRequested}','${date}')`;
    connection.query(insertQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send('Successfully Added History')
        }
    });
});


app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});