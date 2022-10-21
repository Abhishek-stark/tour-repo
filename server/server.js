/*eslint-disable*/
const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const app = require('./app');
if (app.get('env') == 'development') {
    require('dotenv').config({ path: './config.env' });
}
// dotenv.config({ path: './config.env' });

// const DB = 'mongodb://localhost:27017/';
const DB = process.env.MongoDb_pass;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});