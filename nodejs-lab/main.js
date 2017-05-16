/*
var http = require("http");

http.createServer(function(request, response){
    /!*
     HTTP 헤더 전송
     HTTP Status: 200 : OK
     Content Type: text/plain
     *!/
    response.writeHead(200, {'Content-Type': 'text/plain'});

    /!*
     Response Body 를 "Hello World" 로 설정
     *!/
    response.end("Hello World\n");
}).listen(8080);

console.log("Server running at http://127.0.0.1:8080");*/




"main.js"

var fs = require('fs');
fs.readFile('input.txt',function(err,data){
    if(err) return console.error(err);
    console.log(data.toString());
});

console.log("Program has ended");


    $('#btn').click(function(){
        alert('btn click');
    });

