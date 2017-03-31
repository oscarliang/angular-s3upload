app.filter('startFrom', function () {
    return function (input, start) {
        if (!angular.isDefined(input))
            return;
        start = (start < 0) ? 0 : start;
        return input.slice(start);
    };
});

app.filter('fieldFilter', function () {
    // stayChecked is to identify to keep the checked list
    return function (items, filterField, value, keepChecked) {
        var newItems = [];
        if (isNotNullObject(items) && items.length > 0 && isNotNullObject(value) && value !== '') {
            angular.forEach(items, function (item) {
                if (item[filterField].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    newItems.push(item);
                }
                if (keepChecked && item.checked)  keepItem = item;
            });
            if (keepChecked) newItems.unshift(keepItem);
            return newItems;
        }
        return items;
    };
});

app.filter('uploadDateFilter', function (Time) {
    return function (input) {
        if (!angular.isUndefined(input)) {
                input = Time.toDateString(input, 'week');
            }
            return input;
        };
});

app.filter('uploadFileNameFilter', function () {
    return function (input) {
        if (!angular.isUndefined(input)) {
                var lastIndexOf = input.lastIndexOf("/");
                input = input.substring(lastIndexOf+1);
            }
            return input;
        };
});
