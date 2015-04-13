angular.module('guestbookApp')
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/guestbooks', {
            templateUrl: 'guestbooks/guestbooks.html',
            controller: 'GuestbooksController',
            controllerAs: 'guestbooksCtrl'
        })
        .when('/guestbooks/:id', {
            templateUrl: 'entries/entries.html',
            controller: 'EntriesController',
            controllerAs: 'entriesCtrl',
            resolve: {
                entries: function (EntryService, $route) {
                    return EntryService.get($route.current.params.id);
                }
            }
        })
        .otherwise({
            redirectTo: '/guestbooks'
        });
    }
]);
