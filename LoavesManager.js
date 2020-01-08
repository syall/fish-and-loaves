const { spawn } = require('child_process');
const { nextAvailable } = require('node-port-check');

class LoavesManager {

    constructor({ structure, path }) {
        this.shelf = [];
        this.port = 1025;
        structure.forEach(async slice => {
            const { port: pref, color, name, weight } = slice;
            const port = await this.generatePort(pref);
            const toast = spawn(
                'node',
                [path],
                { env: { ...process.env, PORT: port } }
            );
            const output = data => [color, name, data.toString()];
            toast.stdout.on('data', data => console.log(...output(data)));
            toast.stderr.on('data', data => console.error(...output(data)));
            this.shelf.push({ name, port, weight, toast });
        });
    }

    async generatePort(port) {
        const next = await nextAvailable(port || this.port);
        if (!port) this.port = next;
        return next;
    }

}

module.exports = LoavesManager;
