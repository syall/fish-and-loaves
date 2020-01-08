const { spawn } = require('child_process');
const { nextAvailable } = require('node-port-check');

class LoavesManager {

    constructor(bread) {
        this.shelf = [];
        this.port = 1025;
        bread.structure.forEach(async slice => {
            const toast = spawn('node', [bread.path], {
                env: {
                    ...process.env,
                    PORT: await this.generatePort(slice.port)
                }
            });
            const output = data => [slice.color, slice.name, data.toString()];
            toast.stdout.on('data', data => console.log(...output(data)));
            toast.stderr.on('data', data => console.error(...output(data)));
            this.shelf.push({ slice, toast });
        });
    }

    async generatePort(port) {
        const next = await nextAvailable(port || this.port);
        if (!port) this.port = next;
        return next;
    }

}

module.exports = LoavesManager;
