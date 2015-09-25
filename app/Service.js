'use strict';

var http = require('http');
var express = require('express');
var LocationAPI = require('./LocationAPI');

function Service(locationAPI) {
    this.locationAPI = locationAPI ? locationAPI: new LocationAPI();
}

Service.prototype = {

    start: function(port) {
        var app = express(),
            locationAPI = this.locationAPI;

        app.get('/api/countries/:ip', function(request, response) {
            locationAPI.get(request, response);
        });

        var server = http.createServer(app);
        server.listen(port, function() {
            console.log('Service started on port ' + port);
        });

        return server;
    }
};

module.exports = Service;