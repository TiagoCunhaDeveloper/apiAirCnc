const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-pdycg.mongodb.net/semana09?retryWrites=true&w=majority',
{ useUnifiedTopology: true, useNewUrlParser: true });

const connectUsers = {};

io.on('connection', socket => {
    console.log("Usuário conectado",socket.id);
    const { user_id } = socket.handshake.query;

    connectUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectUsers = connectUsers;

    return next();
})

// req.query = Acessar query params (para filtros)
// req.params = Acessar rpute params (para edicao, delete)
// req.body = Acessar corpo da requisição (para criacao, edicao)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);