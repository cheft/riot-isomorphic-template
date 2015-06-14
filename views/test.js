module.exports = {
	init: function() {
		console.log(1111);
		this.name = '11111';
		this.on('mount', function() {
			console.log('mount');
		});
		
		setTimeout(function() {
			this.name = '11111222222';
			console.log(this.name);
			// this.update();
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