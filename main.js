// Require the framework and instantiate it
const fastify = require('fastify')()
const fs = require("fs");
const readdirp = require('readdirp');
const { parse } = require('dotenv');

var settings = {
    root: './config',
    fileFilter: [ '*.env', '*.json' ],
    directoryFilter: [ '!.git', '!*modules' ],
    entryType: 'files',
    depth: 5
};

var config;

function load() {
    config = {};
    readdirp(settings,
        // This callback is executed everytime a file or directory is found inside the providen path
        function(fileInfo) {
            const key = fileInfo.path.replace(/\//g, '.');
            const content = fs.readFileSync(fileInfo.fullPath);
            if(fileInfo.name.endsWith('.json')){
                config[key] = JSON.parse(content);
            }else if(fileInfo.name.endsWith('.env')) {
                config[key.replace('.env', '.json')] = parse(content);
            }
        }, 
    
        function (err, res) {
            console.log('Load the Configuration');
            console.log(config);
            if(err){
                fastify.log.error("Error happened when loop the file system");
                throw err;
            }
              
        }
    );
}

load();


// Declare a route for get config
fastify.get('/api/v1/parameters/:path', async (request, reply) => {
    fastify.log.info(request.params.path);
    return config[request.params.path]
  })

// Declare a route for refresh the load info
fastify.get('/api/v1/refresh', async (request, reply) => {
    load();
    return "The config info is refreshed !";
})

// Declare a route for heath check
fastify.get('/api/v1/ping', async (request, reply) => {
    return "pong";
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8888)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()