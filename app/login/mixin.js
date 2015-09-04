module.exports = {
	do: {
		submit: function() {
			var data = {username: this.username.value, password: this.password.value};
			app.rest.post('/login', data, function(rep) {
				if(rep.status === 'error') {
					return alert('username or password error');
				}
				location.href = '/'
			});
		},
		enter: function(e) {
			if (e.keyCode == 13){
		    	this.submit();
		   	}
		   	return true;
		}
	}
}