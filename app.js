var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var domain = require('domain');
var SetupRequest = require('./api/helpers/setuprequest.js');
var start = process.hrtime();

app.configure(function () {
    app.use(function (req, res, next) {

        req.options = null;
        req.rawBodyRequest = null;
        res.header = null;
        req.elapsedtime = null;
        req.starttime = null;
        req.randomkeyid = null;
        var requestDomain = domain.create();
        requestDomain.add(req);
        requestDomain.add(res);
        requestDomain.on('error', function (err) {
            var precision = 1; // 3 decimal places
            var diff = process.hrtime(req.starttime);
            var elapsed = ((diff[0] * 1e9) + diff[1]) / 1000000;
            req.elapsedtime = elapsed.toFixed(precision);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end('{"Error": ' + '"' + err.message + '"' + ',"HasError": true,"Listening": false,"ElapsedTime": ' + '"' + req.elapsedtime + ' ms"}');

            requestDomain.dispose();
        });

        requestDomain.run(next);
    });
    app.use(app.router);
});

app.get('/telnet', [SetupRequest], function (req, res) {

    try {
        var net = require('net');
        var ipadress = req.query["ip"];
        var port = req.query["port"];
        var client = net.connect(port, ipadress, function () {
            client.write('GET / \r\n \r\n');
            client.on('data', function (data) {

                var precision = 1; // 3 decimal places
                var diff = process.hrtime(req.starttime);
                var elapsed = ((diff[0] * 1e9) + diff[1]) / 1000000;
                req.elapsedtime = elapsed.toFixed(precision);
                req.starttime = process.hrtime(); // reset the timer   


                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end('{"Error": null,"HasError": false,"Listening": true,"ElapsedTime": ' + '"' + req.elapsedtime + ' ms"}');
                console.log('data:', data.toString());
            });

            client.on('error', function (err) {
                console.log('error:', err.message);
            });

            client.on('close', function () {
                console.log('Connection closed');
            });
        });

    } catch (err2) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        var errormessage = err2.message;
        var precision = 1; // 3 decimal places
        var diff = process.hrtime(req.starttime);
        var elapsed = ((diff[0] * 1e9) + diff[1]) / 1000000;
        req.elapsedtime = elapsed.toFixed(precision);
        req.starttime = process.hrtime(); // reset the timer   
        res.end('{"Error": ' + '"' + err2.message + '"' + ',"HasError": true,"Listening": false,"ElapsedTime": ' + '"' + req.elapsedtime + ' ms"}');
    }
})

app.listen(80)