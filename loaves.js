const { spawn } = require('child_process');
const { nextAvailable } = require('node-port-check');

class Loaves {

    constructor({ recipe, path }) {
        this.shelf = [];
        this.port = 1025;
        this.total = recipe.reduce((acc, cur) => acc + cur.weight, 0);
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

    spread() {
        let random = Math.random() * Math.floor(this.total);
        for (const toast of this.shelf)
            if (random < toast.weight) return toast;
            else random -= toast.weight;
    }

}

module.exports = Loaves;
