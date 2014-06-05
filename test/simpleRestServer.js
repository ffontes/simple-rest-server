var should = require('chai').should(),
	Client = require('node-rest-client').Client,
    module = require('../src/simpleRestServer');
    
    
describe('#simpleRestServer', function() {
	module.init();
	var client = new Client();
	
  	it('GET valid url', function(done) {
		client.get("http://127.0.0.1:5000/projects", function(data, response){
			response.statusCode.should.equal(200);
			data.greeting.should.equal("Hello World");
			done();
		});
  	});

  	it('GET invalid url', function(done) {
		client.get("http://127.0.0.1:5000/invalid", function(data, response){
			response.statusCode.should.equal(404);
			done();
		});
  	});  	
	

	it('POST valid url', function(done) {
		client.post("http://127.0.0.1:5000/projects", {}, function(data, response){
			response.statusCode.should.equal(200);
			data.greeting.should.equal("Hello World");
			done();
		});
  	});

  	
  	it('POST invalid url', function(done) {
		client.post("http://127.0.0.1:5000/invalid", {}, function(data, response){
			response.statusCode.should.equal(404);
			done();
		});
  	});  


	it('PUT valid url', function(done) {
		client.put("http://127.0.0.1:5000/projects", {}, function(data, response){
			response.statusCode.should.equal(200);
			data.greeting.should.equal("Hello World");
			done();
		});
  	});

  	
  	it('PUT invalid url', function(done) {
		client.put("http://127.0.0.1:5000/invalid", {}, function(data, response){
			response.statusCode.should.equal(404);
			done();
		});
  	});    		
	

});