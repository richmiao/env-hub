# Configuration Center


### Install
```shell
$ npm i
$ npm start
```
### How to use
1. put your project level config file in `/config`
2. renew the config info with `curl http://localhost:8888/api/v1/refresh`
3. request the config info with 

```shell
curl -X GET \
  http://localhost:8888/api/v1/env/sample.dev.json \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDY0NTg5OTAsImRhdGEiOnsiZW1haWwiOiJqZXJlbXkuYmFvQHB3Yy5jb20iLCJwcm9qZWN0Ijoic2FtcGxlIiwicGF0aCI6InNhbXBsZS5kZXYuanNvbiIsImVudiI6ImRldiJ9LCJpYXQiOjE1NDI4NTg5OTR9.wsWBxhHFyhrAMJMbYe8coUndM6GbNCMNKgrpB1vO8-Q' \
  -H 'cache-control: no-cache'
```

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


### How to get a JWT token

```shell
$ npm run jwt
Welcome to the JWT Certificate Generator Tool
What's the email for your target user: jeremy.bao@pwc.com
Which project config info you want to access ? sample
Which enviroment info you want to access (dev, uat or prod)? dev
How much days would you need for this certificate ? 1000
We will use path as the token signature, What's the confg file path (e.g. gothom.dev.json) ? sample.dev.json
Thanks for your input:
payload =>{"exp":1546459379,"data":{"email":"jeremy.bao@pwc.com","project":"sample","path":"sample.dev.json","env":"dev"}}
signature => sample.dev.json
Can you confirm above info before generating the token(y/n)? y
{ exp: 1546459379,
  data:
   { email: 'jeremy.bao@pwc.com',
     project: 'sample',
     path: 'sample.dev.json',
     env: 'dev' },
  iat: 1542859383 }
Your JWT Token is:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDY0NTkzNzksImRhdGEiOnsiZW1haWwiOiJqZXJlbXkuYmFvQHB3Yy5jb20iLCJwcm9qZWN0Ijoic2FtcGxlIiwicGF0aCI6InNhbXBsZS5kZXYuanNvbiIsImVudiI6ImRldiJ9LCJpYXQiOjE1NDI4NTkzODN9.cRBQhvTXoLlVoZ1J64aJqxaMiBKmKuBwWD8rQkfjck8
➜  param-hub git:(master) ✗
```
          