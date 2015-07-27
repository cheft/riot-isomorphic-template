module.exports = {
	on: {
		init: function() {
            var self = this;
			app.rest.get('/setting', function(rep) {
                self.setting = rep;
                self.update();
            });
		},
        mount: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 100);
        }
	},

    do: {
        save: function(e) {
            // var btn = e.target;
            // btn.setAttribute('disabled', 'disabled');
            // btn.removeAttribute('disabled');
            var setting = {
                appid: this.appid.value,
                secret: this.secret.value,
                token: this.token.value
            };
            if(this.id.value === '') {
                app.rest.post('/setting', setting, function(rep) {
                    alert('success');
                });
            }else {
                app.rest.put('/setting/' + this.id.value, setting, function(rep) {
                    alert('success');
                });
            }
            
        }
    }
}