// Service
app.service('Preload', function($q) {

	this.fetch = function() {
		self = this;
                var deferred = $q.defer();
                deferred.resolve(true);
                return deferred.promise;
	};
});