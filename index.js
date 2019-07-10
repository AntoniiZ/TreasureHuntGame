var express = require('express');
var app = express();
var server = require('http').createServer(app);
const path = require('path');
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(3000, function(){
  console.log("listening on port 3000...");
});
