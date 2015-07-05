module.exports = {
	init: function() {
		var self = this;
		this.name = '11111';
		this.on('mount', function() {
			if(typeof window === 'object') {
				var a = document.getElementById('app');
				console.log(a);
				console.log(888888888);
			}
			console.log(self, 999);
			console.log('mount');
		});
		
		setTimeout(function() {
			self.name = '11111222222';
			console.log(self.name);
			self.update();
		},  5000);

		this.on('yy', function() {
			console.log('yy');
		});
		this.trigger('yy');
	},


	tt: function() {
		console.log(2222);
	}
}