app.service('StringUtil', function () {
    this.inArray = function (elem, arr) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    };
    this.isNull = function (str) {
        if (str === null || str === '') {
            return true;
        }
        return false;
    };

    this.roundToDecimal = function (str, toFix) {
        return parseFloat(parseFloat(str).toFixed(toFix));
    };
    
});