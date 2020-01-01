const { spawn } = require('child_process');

const express = require('express');
const morgan = require('morgan');

const app = new express();

app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const myapp = spawn('node', [process.argv.pop()], { ...process.env });

myapp.stdout.on('data', (data) => {
    console.log('\x1b[36m%s\x1b[0m', data.toString());
});

myapp.stderr.on('data', (data) => {
    console.error('\x1b[36m%s\x1b[0m', data.toString());
});

app.use('*', (req, res) => {
    res.json('hello');
});

module.exports = app;
