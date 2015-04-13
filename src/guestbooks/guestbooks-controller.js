angular.module('guestbooksModule')
.controller('GuestbooksController',  function (GuestbookService) {
    GuestbookService.get()
        .then(function (guestbooks) {
            this.guestbooks = guestbooks;
        }.bind(this));
});
