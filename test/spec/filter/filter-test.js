describe("Test fieldFilter Filter", function () {
    var $filter;

    beforeEach(module("oscarUI"));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('Should test the count of fieldFilter filter return', function () {
        var actualResult;
        var input = [
            {
                'id': '1',
                'firstName': 'Sean',
                'lastName': 'Kerr',
                'picture': 'images/sean.png',
                'Title': 'Senior Developer'
            },
            {
                'id': '2',
                'firstName': 'Yaw',
                'lastName': 'Ly',
                'picture': 'images/yaw.png',
                'Title': 'AEM Magician'
            },
            {
                'id': '3',
                'firstName': 'Lucy',
                'lastName': 'Hehir',
                'picture': 'images/lucy.png',
                'Title': 'Scrum master'
            },
            {
                'id': '4',
                'firstName': 'Rory',
                'lastName': 'Elrick',
                'picture': 'images/rory.png',
                'Title': 'AEM Guru'
            }];
        actualResult = $filter('fieldFilter')(input, 'firstName', 'se');
        expect(actualResult.length).toEqual(1);
    });


    it('Should test the value of uploadDateFilter filter return', function () {
        var actualResult;
        var input = 1490965200;
        actualResult = $filter('uploadDateFilter')(input);
        expect(actualResult).toEqual("1/4/2017");
    });

})