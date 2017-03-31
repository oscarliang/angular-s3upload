app.service('User', function() {

	this.token = null;
	this.role = null;
	this.email = null;
	this.customerID = null;
	this.resellerID = null;
	this.userID = null;
	this.name = null;
        this.logo = null;
	
	this.setUser = function(email, role, name, token, userID, customerID, resellerID, logo){
		this.email = email;
		this.role = role;
		this.token = token;
		this.userID = userID;
		this.customerID = customerID;
		this.resellerID = resellerID;
		this.name = name;
                this.logo = logo;
	};
        
        this.setUserLogo = function(logo){
                this.logo = logo;
        };
	
	this.getUser = function() {
		return {
			'token': this.token,
			'role' : this.role,
			'email' : this.email,
			'userID' : this.userID,
			'resellerID' : this.resellerID,
			'customerID' : this.customerID,
			'name' : this.name,
                        'logo' : this.logo
		};
	};

});
