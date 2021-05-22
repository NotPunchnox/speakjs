const app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server)
    bp = require("body-parser")