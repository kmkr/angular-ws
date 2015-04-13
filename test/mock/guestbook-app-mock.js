angular.module('guestbookAppMock', ['guestbookApp', 'ngMockE2E'])
    .run(function ($httpBackend) {
        $httpBackend.whenPOST('/guestbook').respond(200);
        $httpBackend.whenGET('/guestbook/list').respond([
            {
                id: 1,
                name: 'My guestbook'
            },
            {
                id: 2,
                name: 'My other guestbook'
            }
        ]);
        $httpBackend.whenGET(/\/guestbook\/\d+\/entries/).respond([
            {
                id: 1,
                name: 'Great',
                message: 'Awesome guestbook',
                email: 'ole@bru.mm'
            },
            {
                id: 2,
                name: 'My other guestbook',
                name: 'Alright...',
                message: 'It\'s ok',
                email: 'nasse@no.ff'
            }
       ]);

        $httpBackend.whenGET(/.*/).passThrough();

        $httpBackend.whenPOST(/.*/).passThrough();
    });
