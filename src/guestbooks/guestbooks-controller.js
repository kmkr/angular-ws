angular.module('guestbooksModule')
.controller('GuestbooksController',  function (GuestbookService) {
    var ctrl = this;

    GuestbookService.get()
        .then(function (guestbooks) {
            ctrl.guestbooks = guestbooks;
        });

    ctrl.create = function () {
        GuestbookService.create(ctrl.newGuestbook)
        .then(function () {
            ctrl.guestbooks.push(ctrl.newGuestbook);
            delete ctrl.newGuestbook;
        });
    };
});
