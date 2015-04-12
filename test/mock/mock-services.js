angular.module('guestbookAppMock', ['guestbookApp', 'ngMockE2E'])
	.run(function ($httpBackend) {
		$httpBackend.whenGET(/.*/).passThrough();
		$httpBackend.whenPOST(/.*/).passThrough();
	});
