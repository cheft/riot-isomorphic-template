module.exports = {
	on: {
		mount: function() {
			componentHandler.register({
			  constructor: MaterialRipple,
			  classAsString: 'MaterialRipple',
			  cssClass: 'mdl-js-ripple-effect',
			  widget: false
			});
		}
	}
}