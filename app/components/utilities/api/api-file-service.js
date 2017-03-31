app.service('fileApi', function(config, httpWrapper) {
	// RESELLER CALLS
	this.G_API_FILE = '/api/history/upload';
	// GET
	this.getFileList = function() {
		return httpWrapper.get(config.api_url + this.G_API_FILE, null,  {'userID' : 1000,'role':'customer' }, false, true);
	};
	// PUT
	
});