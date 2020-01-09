const express = require('express');
const request = require('request');
const path = require('path');
const Loaves = require('./loaves.js');
const { FISH_HOST: host, FISH_SSL } = process.env;
const ssl = FISH_SSL === 'true' ? 's' : '';

const fish = new express()
    .disable('x-powered-by')
    .disable('etag')
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .all('*', (req, res) => {
        const loaf = `http${ssl}://${host}:${loaves.spread().port}${req.url}`;
        const onError = error => res.status(500).send(error.message);
        const forward = request({
            url: loaf,
            headers: req.headers
        }).on('error', onError);
        forward.pipe(res);
    });

const lbConfig = require(path.resolve(process.cwd(), process.argv.pop()));
const loaves = new Loaves(lbConfig);

module.exports = fish;
module.exports.loaves = loaves;
