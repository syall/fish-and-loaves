const express = require('express');
const LoavesManager = require('./LoavesManager.js');

const balancer = new express()
    .disable('x-powered-by')
    .disable('etag')
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(require('morgan')('tiny'));

const lbConfig = require(process.argv.pop());
const loaves = new LoavesManager(lbConfig);

module.exports = balancer;
module.exports.loaves = loaves;
