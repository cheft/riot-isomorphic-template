module.exports = {
    on: {
        mount: function() {
            app.rest.get('/login', function(data) {
                console.log(data);
                document.getElementById('login_name').innerHTML = data.username;
            });
            
        }
    }
}