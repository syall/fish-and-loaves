const { spawn } = require('child_process');

class LoavesManager {

    constructor(bread) {

        this.shelf = [];

        this.port = 1025;
        this.ports = new Set([parseInt(process.env.FISH_PORT, 10)]);

        this.bread = bread;
        for (const slice of bread.structure)
            this.start(slice);

    }

    start(slice) {
        const options = {
            env: {
                ...process.env,
                PORT: this.generate(slice.preferredPort),
                NAME: slice.name
            }
        };
        const toast = spawn('node', [this.bread.path], options);
        toast.stdout.on('data', (data) => console.log(
            slice.color,
            slice.name,
            data.toString()
        ));
        toast.stderr.on('data', (data) => console.error(
            slice.color,
            slice.name,
            data.toString()
        ));
        this.shelf.push({ slice, toast });
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

module.exports = LoavesManager;
