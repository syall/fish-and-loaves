module.exports = {
    name: 'myapp',
    path: './myapp/bin/www',
    structure: [
        {
            name: 'main',
            color: '\x1b[36m%s\x1b[0m',
            weight: 3,
            preferredPort: 5000
        },
        {
            name: 'aux1',
            color: '\x1b[33m%s\x1b[0m',
            weight: 1
        },
        {
            name: 'aux2',
            color: '\x1b[34m%s\x1b[0m',
            weight: 1
        }
    ]
};
