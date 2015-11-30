import fs from 'fs';
import Path from 'path';

export let ConfigLoader = function(url){
    return new Promise((success, failure) => {
        url = Path.resolve(__dirname, '..', url);

        fs.readFile(url, 'utf8', (err, data) => {
            if (err) failure(err);
            success(JSON.parse(data));
        });
    });
}
