# Openwhyd API Client

A simple Node.js API client for Openwhyd.

- Openwhyd: https://openwhyd.org
- Source code: https://github.com/openwhyd/openwhyd
- API documentation: https://openwhyd.github.io/openwhyd/API

## Usage

1. Install the npm dependency to your Node.js project:

```sh
$ npm install openwhyd-api-client
```

2. Use it to make API calls:

```js
const OpenwhydAPI = require("openwhyd-api-client");

const creds = {
  email: "me@email.com", // email address or user handle of your openwhyd account
  md5: "6af652b33ce6a86ecf025b0da8ca8d24" // md5 hash of your openwhyd password
};

const openwhydAPI = new OpenwhydAPI();

openwhydAPI.login(creds.email, creds.md5, function (err, res) {
    openwhydAPI.get("/api/user", {}, function (err, user) {
        console.log("=> user name:", user.name);
        openwhydAPI.logout();
    });
});
```
