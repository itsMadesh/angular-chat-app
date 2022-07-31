const express = require('express');
const app = express();
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
io=new Server(server);

app.use(express.json());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['key'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/api', require('./apis'));

app.get('/', function (req, res) {
    if (req.session.user) return res.sendFile(__dirname + '/public/messager.html');
    return res.sendFile(__dirname + '/public/index.html');
});

io.on('connection',(socket)=>{
    socket.on('chat_message',(msg)=>{
        console.log(msg);
        io.emit('chat_message', msg);
    })
});

app.use(express.static('./public'));

server.listen(8000, function (err) {
    if (err) throw err;
    console.log("app listening at 8000");
});