import NetworkService from 'services/NetworkService.js';

export var ConfigLoader = function(url){
    return NetworkService.fetch(url, null, {method:'GET'});
}
