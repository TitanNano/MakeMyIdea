
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
