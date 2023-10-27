/**
 * Name:                Kurt Pagal
 * NSID:                zja641
 * Student ID:          11314773
 * Course:              CMPT-353
 * Instructor:          Ralph Deters
 */

'use strict';

// load package
const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyparser.urlencoded({ extend: true }));

// create connection to mysql 
var connection = mysql.createConnection({
    host    : 'mysql1',
    user    : 'root',
    password: 'admin'
});

connection.connect();

app.get('/init', (req, res) => {
    console.log("init");

    connection.query(`CREATE DATABASE postdb`, function (error, results) {
        if (error) console.log(error);
        console.log(`Created DB: ${results}`);
    });

    connection.query(`USE postdb`, function (error, results) {
        if (error) console.log(error); 
        console.log(`Using DB: ${results}`);
    });

    connection.query(
    `CREATE TABLE posts (id int unsigned NOT NULL auto_increment, topic varchar(100) NOT NULL, data varchar(100) NOT NULL, PRIMARY KEY (id))`, function (error, results) {
        if (error) console.log(error);
        console.log(`Created DB: ${results}`);
    });
    res.send("ok");
});

app.post('/addPost', (req, res) => {
    console.log("Add Posts");
    var topic = req.body.topic;
    var data = req.body.data;

    connection.query(`USE postdb`, function (error, results) {
        if (error) console.log(error);
        console.log(`Using DB: ${results}`);
    });

    var query = `INSERT INTO posts (topic, data) VALUES ('${topic}', '${data}')`;
    console.log(query);

    connection.query(query, function (error, results) {
        if (error) console.log(error);
        console.log(`Inserting into DB: ${results}`);
    });
    res.send("ok");
});

app.get('/getPosts', (req, res) => {
    connection.query(`SELECT * FROM posts`, function (error, results) {
        if (error) console.log(error);
        console.log(`Selecting from DB: ${results}`);
        res.send(results);
    });
});

// serve static files
app.use('/', express.static('pages'));

app.listen(PORT, HOST);
console.log('up and running');