const express = require('express');
const morgan = require('morgan');

const app = new express();

app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const loafConfig = process.argv.pop();
const loafApp = process.argv.pop();
console.log({ loafConfig, loafApp });

const { spawn } = require('child_process');
const bat = spawn('node', [loafApp], { PORT: 5000 });

app.use('*', (req, res) => {
    res.redirect('http://127.0.0.1:5000/users');
});

module.exports = app;
