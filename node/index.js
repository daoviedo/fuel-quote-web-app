const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



app.get('/', (req, res) => {
    res.send('Hello From servers')
});

app.post('/test', (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    const lookQuery = `SELECT * FROM sys.user WHERE username='${username}' AND password = '${password}'`;
    connection.query(lookQuery, (err, results) => {
        if(err){
            return res.json({
                error: err
            })
        }
        else{
            if(results.length===0){
                return res.json({
                    data: {
                        authentication: false
                    }
                    
                });
            }
            else{
                return res.json({
                    data: {
                        authentication: true,
                        username: results[0].username,
                        password: results[0].password,
                        privelege: results[0].priv
                    }
                    
                });
            }
            
        }
    });
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
    bcrypt.hash(pass, saltRounds, function(err, hash) {
        console.log(hash)
        const insertQuery = `INSERT INTO sys.user (username, password, firstname, lastname, ad1, ad2, city, st, zip, priv) VALUES('${username}','${hash}','${fname}','${lname}','${ad1}','${ad2}','${city}','${st}','${zip}','${priv}')`;
        connection.query(insertQuery, (err1, results) => {
            if(err1){
                return res.send(err1)
            }
            else{
                return res.send('Successfully Added User')
            }
        });
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
    const addressQuery = `SELECT ad1, ad2, city, st, zip FROM sys.user WHERE username='${username}'`;
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

app.get('/users/data/:username', (req, res) => {
    const username  = req.params.username;
    const addressQuery = `SELECT firstname, lastname, ad1, ad2, city, st, zip FROM sys.user WHERE username='${username}'`;
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

app.get('/users/update/:username', (req, res) => {
    const username  = req.params.username;
    const { f,l,a1,a2,c,s,z } = req.query;
    const addressQuery = `UPDATE sys.user SET firstname='${f}',lastname='${l}',ad1='${a1}',ad2='${a2}',city='${c}',st='${s}',zip='${z}' WHERE username='${username}'`;
    connection.query(addressQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send("Successfully Updated User")
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
    ('00' + date.getUTCDate()).slice(-2);
    const { username, GallonsRequested, PricePerGallon, DeliveryDate, ad1, city, st, zip} = req.query;
    const insertQuery = `INSERT INTO sys.history (username, GallonsRequested, PricePerGallon, TotalPrice, DateOfRequest, DeliveryDate, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip) VALUES('${username}','${GallonsRequested}','${PricePerGallon}','${PricePerGallon*GallonsRequested}','${date}', '${DeliveryDate}', '${ad1}', '${city}', '${st}', '${zip}')`;
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