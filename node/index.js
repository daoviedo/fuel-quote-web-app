const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const checkAuth = require('./check-auth');
const checkAdmin = require('./check-admin');

const saltRounds = 10;
const privateKey = "ASLFJDGasdkdgasfsdlgkasdflgmpashlmh";

const app = express();


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

//Controls the kinds of requests sent CHANGE TO OUR DOMAIN AFTER DEV IS OVER
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//Remove this sometime in the future
app.get('/', (req, res) => {
    res.send('Hello From servers')
});

//Post Request to login
app.post('/login', (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    const lookQuery = `SELECT * FROM sys.user WHERE username='${username}'`;
    connection.query(lookQuery, (err, results) => {
        if(err){
            return res.json({
                error: err
            })
        }
        else{
            if(results.length===0){
                return res.json({
                    authentication: false,
                    token: null 
                });
            }
            else{
                bcrypt.compare(password, results[0].password, function(err1, resu) {
                    if(resu){
                        jwt.sign({
                            username: results[0].username,
                            privelege: results[0].priv }, privateKey, { expiresIn: "1h" }, function(err2, token) {
                                return res.json({
                                    authentication: true,
                                    token: token  
                                });
                        });
                    }
                    else{
                        return res.json({
                            authentication: false,
                            token: null
                        });
                    }
                }); 
            }  
        }
    });
});

//Get Request to verify token is valid
app.get('/verify', checkAuth, (req,res,next)=>{
    res.json({
        authentication: true,
        userdata: req.userData
    });
});

//New Request for fuel history (Refactored)
app.get('/fuelhistory', checkAuth, (req,res,next)=>{
    const username = req.userData.username;

    const findHistory = `SELECT * FROM sys.history WHERE username='${username}'`;
    connection.query(findHistory, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                authentication: true,
                data: results
            })
        }
    });

})

//Request for Registering
app.post('/users/adduser', (req, res) => {
    const { username, pass, fname, lname, ad1, ad2, city, st, zip, priv } = req.body;
    bcrypt.hash(pass, saltRounds, function(err, hash) {
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

//Refactored method for deleting a user
app.delete('/users/remove/:username', checkAdmin, (req, res) => {
    const username = req.params.username;
    const delQuery = `DELETE FROM sys.user WHERE username='${username}'`;
    connection.query(delQuery, (err1, results) => {
        if(err1){
            return res.send(err1)
        }
        else{
            return res.send('Successfully Deleted User')
        }
    });
});

//Method to check if username is available in registering
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

//Method used to get the user's data for Acc_Mng page
app.get('/users/data', checkAuth, (req, res) => {
    const username  = req.userData.username;
    const addressQuery = `SELECT firstname, lastname, ad1, ad2, city, st, zip FROM sys.user WHERE username='${username}'`;
    connection.query(addressQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                authentication: true,
                data: results
            })
        }
    });
});

//Method used to update user's profile
app.patch('/users/update', checkAuth, (req, res) => {
    const username  = req.userData.username;
    const addressQuery = `UPDATE sys.user SET firstname='${req.body.firstname}',lastname='${req.body.lastname}',ad1='${req.body.address1}',ad2='${req.body.address2}',city='${req.body.city}',st='${req.body.st}',zip='${req.body.zip}' WHERE username='${username}'`;
    connection.query(addressQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send("Successfully Updated User")
        }
    });
});

//Refactored using checkAdmin for admins
app.get('/users', checkAdmin, (req, res) => {
    const selectAll = 'SELECT username, firstname, lastname, ad1, ad2, city, st, zip, priv, totalRequests FROM sys.user';
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

//Method to pull user's data for fuel request
app.get('/users/fuelrequestinfo', checkAuth, (req, res) => {
    const username = req.userData.username;
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

//Post Method to add new fuel request
app.post('/users/addRequest', checkAuth, (req, res) => {
    var date=new Date();
    const username = req.userData.username
    const { GallonsRequested, PricePerGallon, DeliveryDate, ad1, city, st, zip, OrderID } = req.body;
    date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + (date.getUTCHours()-5) + ':' + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    LoadingDate=new Date(DeliveryDate);
    LoadingDate=LoadingDate.getFullYear() + '-' + (LoadingDate.getMonth()+1) + '-' + LoadingDate.getDate();
    const insertQuery = `INSERT INTO sys.history (RequestID, username, GallonsRequested, PricePerGallon, TotalPrice, DateOfRequest, DeliveryDate, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip) VALUES('${OrderID}','${username}','${GallonsRequested}','${PricePerGallon}','${PricePerGallon*GallonsRequested}','${date}', '${LoadingDate}', '${ad1}', '${city}', '${st}', '${zip}')`;
    connection.query(insertQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send(date)
        }
    });
});


app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});

module.exports = app;