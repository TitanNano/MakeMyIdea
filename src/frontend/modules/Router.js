import UserService from 'services/UserService.js';

/**
 * @param {Object} routes
 */
export let Router = function($routeProvider, routes, otherwise) {
    Object.keys(routes).forEach(key => {
        $routeProvider.when(key, {
            template : `<${routes[key]} flex="grow" layout></${routes[key]}>`
        });
    });

    $routeProvider.otherwise(otherwise);

    return otherwise;
}

export let RouteController = function($rootScope){
    $rootScope.$on('$routeChangeStart', () => {

        UserService.user.then(user => {
            if (user.incomplete) {
                location.hash = '/user/edit';
            }
        }, () => {});

    });
}
