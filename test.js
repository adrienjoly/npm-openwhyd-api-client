var WhydAPI = require("./index.js");

console.log("reading whyd credentials from ./test_credentials.js...");
var creds = require("./test_credentials.js");

console.log("logging in to whyd.com...");
var whydAPI = new WhydAPI();
whydAPI.login(creds.email, creds.md5, function(res){
    if (!res.ok)
        return console.error("login failed", res);
    console.log("querying whyd.com...");
    whydAPI.get("/api/user", {}, function(json){
        console.log("received:", json);
        whydAPI.logout(function(res){
            console.log(res.error || "successfully logged out from whyd.com");
        });
    });
});
