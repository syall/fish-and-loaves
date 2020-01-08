const { spawn } = require('child_process');
const { nextAvailable } = require('node-port-check');

class LoavesManager {

    constructor({ structure, path }) {
        this.shelf = [];
        this.port = 1025;
        structure.forEach(async slice => {
            const { port, color, name, weight } = slice;
            const PORT = await this.generatePort(port);
            const toast = spawn(
                'node',
                [path],
                { env: { ...process.env, PORT } }
            );
            const output = data => [color, name, data.toString()];
            toast.stdout.on('data', data => console.log(...output(data)));
            toast.stderr.on('data', data => console.error(...output(data)));
            this.shelf.push({ name, port: PORT, weight, toast });
        });
    }

    async generatePort(port) {
        const next = await nextAvailable(port || this.port);
        if (!port) this.port = next;
        return next;
    }

}

module.exports = LoavesManager;
