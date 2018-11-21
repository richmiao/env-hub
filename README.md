# Configuration Center


### Install
```shell
$ npm i
$ npm start
```
### How to use
1. put your project level config file in `/config`
2. renew the config info with `curl http://localhost:8888/api/v1/refresh`
3. request the config info with `curl http://localhost:8888/api/v1/parameters/:path`

For example, if you have a project called `XXX`, there are 3 types of config files for 3 different enviroments: `dev.json`, `uat.json`, `prod.json`. you can just put these files like
```
        --config
            |
            |--XXX
                |
                |--dev.json
                |--prod.json
                |--uat.json
```
If you want to access the config for XXX project's dev configure, you just need to `curl http://localhost:8888/api/v1/parameters/config.XXX.dev.json`

          