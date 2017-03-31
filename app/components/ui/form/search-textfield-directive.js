var searchTextfieldController = function(scope, $document, element) {
};
angular.module('oscarUI').directive('searchTextField', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/ui/form/search-textfield-directive.html',
		scope: {
			filtermodel: '='
		},
		controller: ['$scope', '$document', '$element', searchTextfieldController],
		link: function(scope, element, iAttrs, ctrl) {}
	};
});