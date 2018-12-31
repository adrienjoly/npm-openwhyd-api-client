var urlModule = require('url');
var https = require('https');

var DEFAULT_URL_PREFIX = "https://openwhyd.org";

function get(url, options, callback) {
    //console.log("HTTP GET", url, options);
    var urlObj = urlModule.parse(url);
    var headers = {
        Accept: 'application/json',
    };
    if (options.cookie) {
        headers.Cookie = options.cookie;
    }
    var data = "", options = {
        method: "GET",
        host: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.path,
        headers: headers,
    };
    return https.request(options, function(res) {
        res.addListener('data', function(chunk) {
            data += chunk.toString();
        });
        res.addListener('end', function() {
            try{
                data = JSON.parse(data);
            } catch(e){};
            callback(null, data, res);
        });
    })
    .on('error', callback)
    .end();
}

function OpenwhydAPI(options){
    options = options || {};
    this.cookie = null;
    this.root = options.root || DEFAULT_URL_PREFIX;
}

OpenwhydAPI.prototype.login = function(email, md5, cb){
    var self = this;
    get(this.root + "/login?action=login&ajax=1&email="+email+"&md5="+md5, {}, function(err, data, res){
        self.cookie = res && res.headers["set-cookie"];
        cb && cb(err, !!self.cookie);
    });
}

OpenwhydAPI.prototype.get = function(path, params, cb){
    get(this.root + path, {cookie:this.cookie}, function(err, json){
        cb && cb(err, json);
    });
}

OpenwhydAPI.prototype.logout = function(cb){
    get(this.root + "/login?action=logout", {cookie:this.cookie}, function(err, json){
        cb && cb(err, json);
    });
}

module.exports = OpenwhydAPI;
