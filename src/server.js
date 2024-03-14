//import WebSocket  from 'ws'; error:moudules not apply of ES6, use CommonJS statement
const WebSocket = require('ws');
const express = require('express');
const http = require("http");
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); 
app.use('/public', express.static(__dirname + "/public"));
app.get("/",(req,res) => res.render("home"));
app.get("/*",(req,res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket.nickname = "Anonymus"
    console.log("Connected to Browser✅ ");
    socket.on("close", () => {
            console.log("Disconnect to the Server");
    });
    socket.on("message", (msg)=>{
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
            sockets.forEach((aSocket) => 
            aSocket.send(`${socket.nickname} : ${message.payload}`));
            break;
            case "nickname":
                socket.nickname= message.payload;
            break;
        }
        
    });
});
 // equals event.addListener


server.listen(3000,handleListen);  
