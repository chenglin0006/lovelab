'use strict';
const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const open = require('open');
// let config = require('./webpack.config.js');
// const port = config.devServer.port;

var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mime = require('mime');
var router = require('./server/router');
var app = express();

var resolve = file => path.resolve(__dirname, file);
app.use('/dist', express.static(resolve('./dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)

app.get('*', function(req, res) {
    var html = fs.readFileSync(resolve('./html/' + 'index.html'), 'utf-8');
    res.send(html)
});

app.listen(process.env.PORT || 9001, function() {
    console.log("应用实例，访问地址为 localhost:9001")
});

// for (let key in config.entry) {
//     let entryItem = config.entry[key];
//     if (key != "common") {
//         entryItem.unshift("webpack-dev-server/client?http://"+'localhost'+":"+port+"/", "webpack/hot/dev-server");
//     }
// }

// config.plugins = config.plugins || [];
// config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new webpack.NamedModulesPlugin());

// new WebpackDevServer(webpack(config), config.devServer)
//     .listen(port, '0.0.0.0', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Listening at localhost:' + port);
//         console.log('Opening your system browser...');
//         open('http://'+('localhost')+':' + port + '/');
//     });
