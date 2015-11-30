var fs = require('fs');

export var ConfigLoader = function(url){
    fs.readFile(url, function (err, data) {
        if (err) throw err;
        return data;
    });
}
