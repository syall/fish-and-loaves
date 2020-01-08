const express = require('express');
const morgan = require('morgan');
const request = require('request');
const LoavesManager = require('./LoavesManager.js');

const app = new express();

app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const breadConfig = require(process.argv.pop());
const loaves = new LoavesManager(breadConfig);

module.exports = app;
module.exports.loaves = loaves;
