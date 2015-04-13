angular.module('entriesModule').service('EntryService', function ($http) {
    this.get = function (guestbookId) {
        return $http.get('/guestbook/' + guestbookId + '/entries')
            .then(function (response) {
                return response.data;
            });
    };
});
