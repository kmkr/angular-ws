angular.module('guestbooksModule')
.service('GuestbookService', function ($http) {
    this.get = function () {
        return $http.get('/guestbook/list')
            .then(function (response) {
                return response.data;
            });
    };
});
