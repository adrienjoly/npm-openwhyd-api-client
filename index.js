var urlModule = require('url');
var http = require('http');

var DEFAULT_WHYD_ROOT = "http://whyd.com";

function get(url, options, callback) {
    //console.log("HTTP GET", url, options);
    var urlObj = urlModule.parse(url);
    var data = "", options = {
        method: "GET",
        host: urlObj.hostname,
        port: urlObj.port || 80,
        path: urlObj.path,
        headers: {
            Accept: 'application/json',
            Cookie: options.cookie,
        },
    };
    return http.request(options, function(res) {
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

function WhydAPI(options){
    options = options || {};
    this.cookie = null;
    this.root = options.root || DEFAULT_WHYD_ROOT;
}

WhydAPI.prototype.login = function(email, md5, cb){
    var self = this;
    get(this.root + "/login?action=login&ajax=1&email="+email+"&md5="+md5, {}, function(err, data, res){
        self.cookie = res.headers["set-cookie"];
        cb && cb(err, !!self.cookie);
    });
}

WhydAPI.prototype.get = function(path, params, cb){
    get(this.root + path, {cookie:this.cookie}, function(err, json){
        cb && cb(err, json);
    });
}

WhydAPI.prototype.logout = function(cb){
    get(this.root + "/login?action=logout", {cookie:this.cookie}, function(err, json){
        cb && cb(err, json);
    });
}

module.exports = WhydAPI;
