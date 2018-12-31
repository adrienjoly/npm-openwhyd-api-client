# Openwhyd API Client

A simple Node.js API client for [Openwhyd.org](https://openwhyd.org).

Your can use it to:
- initiate a cookie-based Openwhyd user session, given their email address and password;
- make authenticated calls to [Openwhyd's API endpoints](https://openwhyd.github.io/openwhyd/API);
- end the user session.

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

## Methods

The class exported from the package provides the following methods:

- `login (email, md5, callback)`
- `get (path, params, callback)`
- `logout (callback)`

All `callback` functions are called with `(err, res)` as parameters.

Each instance of the class holds the cookie that identifies the user session initiated with that instance.
