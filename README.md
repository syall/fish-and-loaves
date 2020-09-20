# fish-and-loaves

## Overview

`fish-and-loaves` is a Proof-of-Concept Load Balancer written with Express, and it only supports requests with no Request Body as the configuration with the `request` API was too complicated.

## Inspiration

The inspiration for the project was this blog post by [The Code Barbarian](https://thecodebarbarian.com/building-your-own-load-balancer-with-express-js).

One difference between the implementation in the blog and `fish-and-loaves` is that the application is defined by a configuration file as opposed to hard coding the structure in the code.

Not only this, but the load balancer also uses `child-process` to `spawn` multiple instances of the application and customize the instance output.

## Installation

```shell
npm install --save-dev fish-and-loaves
```

```shell
yarn add -D fish-and-loaves
```

## Usage

To run `fish-and-loaves`, three environmental variables need to be defined in a `.env` file.

```shell
# Host IP
FISH_HOST=127.0.0.1
# Load Balancer Port
FISH_PORT=3030
# Determines HTTPS (Provide SSL)
FISH_SSL=false
```

After installation in a project, a simple command can be used.

```shell
yarn fish-and-loaves <path/to/lb-config.js>
```

## Instance Configuration

With the configuration file, the structure is designed to be intuitive as a simple layer of Infrastructure-as-Code.

```javascript
module.exports = {
    // Name of Application
    name: 'myapp',
    // Path to run Application in 'node <path/to/start/script>'
    path: './myapp/bin/www',
    // Recipe as an Array of Instances
    recipe: [
        {
            // Name of Instance
            name: 'main',
            // ANSI Color Output
            color: '\x1b[36m%s\x1b[0m',
            // Weight of Instance
            weight: 3,
             // Preferred Port (Optional)
            port: 5000
        },
        {
            name: 'aux1',
            color: '\x1b[33m%s\x1b[0m',
            weight: 1
        },
        // More Instances...
    ]
}
```

## Personal Notes

I have been curious about load balancers for a while ever since I took
a class on [Internet Technology](https://www.cs.rutgers.edu/courses/internet-technology) and saw a picture of a server hierarchy.

The implementation of a Load Balancer is not limited to the Weighted Priority Policy used (as opposed to Round-Robin, Classification, etc.), but the single implementation of one of the policies was enough to understand the concepts of a Load Balancer and managing processes.

However, these types of policies are important to understand as they are useful for any distributed system at any level of abstraction, not just the application layer.

Although I will not be able to make a full-fledged cloud architecture framework, this project gave me a little taste of how DevOps software is developed: automating the organization of many different components in a system as opposed to only focusing on a single process.

[syall](https://github.com/syall)

Side Note: The names in the code are based on a story from [Matthew 14:14-21](https://online.recoveryversion.bible/BibleChapters.cfm?cid=14) in which Jesus feeds 5,000 people with only 5 loaves and 2 fish, which parallels the precise distribution and organization of a Load Balancer
