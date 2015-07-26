module.exports = {
	do: {
		submit: function() {
			var data = {username: this.username.value, password: this.password.value};
			app.rest.post('/login', data, function(rep) {
				if(rep.result === 'error') {
					return alert('error, user/pwd is admin');
				}
				// app.router.go('/dashboard');
				location.href = '/dashboard'
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