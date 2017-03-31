// Factory
app.factory('OverviewModel', function(fileApi) {
	// Define the constructor function.

	function OverviewModel() {
		_self = this;
	}
	// Define the "instance" methods using the prototype
	// and standard prototypal inheritance.
	OverviewModel.prototype = {
                getFileList: function(){
                   return fileApi.getFileList()
                }
	};
	return OverviewModel;
});