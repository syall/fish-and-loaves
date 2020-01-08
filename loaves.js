const { spawn } = require('child_process');
const { nextAvailable } = require('node-port-check');

class Loaves {

    constructor({ recipe, path }) {
        this.shelf = [];
        this.port = 1025;
        recipe.forEach(async s =>
            this.shelf.push(await this.cook(s, path)));
    }

    async cook({ port: pref, color, name, weight }, path) {
        const port = await this.generatePort(pref);
        const opts = { env: { ...process.env, PORT: port } };
        const toast = spawn('node', [path], opts);
        toast.stdout.on('data', data =>
            console.log(color, name, data.toString()));
        toast.stderr.on('data', data =>
            console.error(color, name, data.toString()));
        return { name, port, weight, toast };
    }

    async generatePort(pref) {
        const next = await nextAvailable(pref || this.port);
        if (!pref) this.port = next;
        return next;
    }

}

module.exports = Loaves;
