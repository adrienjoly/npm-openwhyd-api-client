var OpenwhydAPI = require("./index.js");

console.log("reading openwhyd credentials from ./test_credentials.js...");
var creds = require("./test_credentials.js");

console.log("logging in to openwhyd.org...");
var OpenwhydAPI = new OpenwhydAPI();
OpenwhydAPI.login(creds.email, creds.md5, function(err, res){
    if (err || !res)
        return console.error("=> login failed, reason:", err);
    console.log("querying user data from openwhyd.org...");
    OpenwhydAPI.get("/api/user", {}, function(err, json){
        console.log("=> received:", err || json.name);
        OpenwhydAPI.logout(function(err, res){
            console.log("=>", err || "successfully logged out from openwhyd.org");
        });
    });
});
