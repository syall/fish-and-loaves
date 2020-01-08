const { spawn } = require('child_process');
const request = require('request');

const express = require('express');
const morgan = require('morgan');

const app = new express();

app.disable('x-powered-by');
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const bread = require(process.argv.pop());

class PortGenerator {
    constructor() {
        this.port = 1025;
        this.ports = new Set();
        this.ports.add(parseInt(process.env.FISH_PORT, 10));
    }

    generate(preferred) {
        if (preferred && !this.ports.has(preferred)) {
            this.ports.add(preferred);
            return preferred;
        }
        while (this.ports.has(this.port))
            this.port++;
        this.ports.add(this.port);
        return this.port++;
    }
}

const portGen = new PortGenerator();
const shelf = [];
const sub = '\x1b[36m%s\x1b[0m';
for (const loaf of bread.structure) {
    const options = {
        env: {
            ...process.env,
            PORT: portGen.generate(loaf.preferredPort),
            NAME: loaf.name
        }
    };
    const toast = spawn('node', [bread.path], options);
    toast.stdout.on('data', (data) =>
        console.log(sub, data.toString()));
    toast.stderr.on('data', (data) =>
        console.error(sub, data.toString()));
    shelf.push({ loaf, toast });
}

module.exports = app;
