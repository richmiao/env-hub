// Require the framework and instantiate it
const fastify = require('fastify')()
const fs = require("fs");
const readdirp = require('readdirp');
const {
    parse
} = require('dotenv');
const jwt = require("jsonwebtoken");

var settings = {
    root: './config',
    fileFilter: ['*.env', '*.json'],
    directoryFilter: ['!.git', '!*modules'],
    entryType: 'files',
    depth: 5
};

var config;

function load() {
    config = {};
    readdirp(settings,
        // This callback is executed everytime a file or directory is found inside the providen path
        function (fileInfo) {
            const key = fileInfo.path.replace(/\//g, '.');
            const content = fs.readFileSync(fileInfo.fullPath);
            if (fileInfo.name.endsWith('.json')) {
                config[key] = JSON.parse(content);
            } else if (fileInfo.name.endsWith('.env')) {
                config[key.replace('.env', '.json')] = parse(content);
            }
        },

        function (err, res) {
            console.log('Load the Configuration =>');
            console.log(config);
            console.log('Yeah~~~!!!');
            if (err) {
                fastify.log.error("Error happened when loop the file system");
                throw err;
            }

        }
    );
}

load();


// Declare a route for get config
fastify.get('/api/v1/env/:path', async (request, reply) => {
    const token = request.headers.authorization.substring(7); //remove `Bearer`
    var result = '';
    try {
        const decoded = jwt.verify(token, request.params.path);
        const now = Math.floor(Date.now() / 1000);
        console.log(decoded);
        if (decoded.exp > now && decoded.data.path.toLowerCase() === request.params.path.toLowerCase()) {
            result = config[request.params.path];
        } else {
            const errMsg = 'Invalid JWT Token';
            console.error(errMsg);
            return errMsg;
        }
    } catch (err) {
        console.error(err);
        return err;
    }

    return result;
})

// Declare a route for refresh the load info
fastify.get('/api/v1/refresh', async (request, reply) => {
    load();
    return "The config info is refreshed !";
})
// Declare a route for heath check
fastify.get('/', async (request, reply) => {
    return "hello";
})
// Declare a route for heath check
fastify.get('/api/v1/ping', async (request, reply) => {
    return "pong";
})

// Run the server!
fastify.listen(7777, '0.0.0.0', function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
