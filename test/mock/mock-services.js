angular.module('guestbookAppMock', ['guestbookAppMock', 'ngMockE2E'])
	.run(function ($httpBackend) {
		$httpBackend.whenGET(/.*/).passThrough();
		$httpBackend.whenPOST(/.*/).passThrough();
	});
