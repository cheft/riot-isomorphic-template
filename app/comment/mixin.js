module.exports = {
	on: {
        mount: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 50);
        }
	}
}