var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};
var rooms = [];
var games = [];
var curr_room = 0;
rooms.push([]);

app.get('/', function(req, res){
    res.send('Socket.io server is running. You can start clients at http://localhost:3000!');
});

io.on("connection", function (client) {
    console.log('user connected');
});

io.on("connection", function (client) {
    client.join(curr_room);
    client.on("join", function(name){
        console.log("Joined: " + name);

        if (rooms[curr_room].length < 2) {
            clients[client.id] = { player:rooms[curr_room].length, name: name, room: curr_room };
            rooms[curr_room].push({ id: client.id, player:rooms[curr_room].length, name: name, room: curr_room });
            //console.log(rooms);
            if (rooms[curr_room].length == 2) {
                client.emit("room_info", curr_room);
                client.emit("player1", rooms[curr_room][0].name);
                io.in(curr_room).emit("player2", rooms[curr_room][1].name);
                io.in(curr_room).emit("game_start");
                io.in(curr_room).emit("turn_info", "It's your turn!");
                client.emit("turn_info", "It's your opponent's turn!");
                games[curr_room] = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
                curr_room++;
                rooms.push([]);
            }
            else {
                client.emit("room_info", curr_room);
                client.emit("player1", rooms[curr_room][0].name);
            }
        }

    });

    client.on("play", function(room,cell,turn) {
        var cell_class = "";
        if (clients[client.id].player == turn) {
            if (clients[client.id].player == "0") {
                cell_class="cross";
            }
            else {
                cell_class="circle";
            }
            io.in(room).emit("show_play", cell, cell_class);

            io.in(room).emit("turn_info", "It's your turn!");
            client.emit("turn_info", "It's your opponent's turn!");

            var x = parseInt(cell.split("-")[0]);
            var y = parseInt(cell.split("-")[1]);
            games[room][x][y] = clients[client.id].player;
            
            //check row
            for (var i=0; i<3; i++) {
                if(games[room][x][i] != clients[client.id].player) {
                    break;
                }
                if(i == 2) {
                    game_over(room,rooms[room][clients[client.id].player].name,true);
                    return;
                }
            }

            //check column
            for (var i=0; i<3; i++) {
                if(games[room][i][y] != clients[client.id].player) {
                    break;
                }
                if(i == 2) {
                    game_over(room,rooms[room][clients[client.id].player].name,true);
                    return;
                }
            }

            //check diagonal
            if(x == y) {
                for(var i=0; i<3; i++){
                    if(games[room][i][i] != clients[client.id].player) {
                        break;
                    }
                    if(i == 2){
                        game_over(room,rooms[room][clients[client.id].player].name,true);
                        return;
                    }
                }
            }

            //check anti-diagonal
            if(x + y == 2) {
                for(var i=0; i<3; i++){
                    if(games[room][i][2-i] != clients[client.id].player)
                        break;
                    if(i == 2){
                        game_over(room,rooms[room][clients[client.id].player].name,true);
                        return;
                    }
                }
            }

            var found = false;
            for (var i=0; i<3; i++) {
                for (var j=0; j<3; j++) {
                    if (games[room][i][j] == -1) {
                       found = true; 
                    }
                }
            }
            if (!found) {
                game_over(room,"",false);
                return;
            }
        }
    });
  
    client.on("disconnect", function(){
        console.log("Disconnect");

        /*if (rooms != undefined) {
            for (var i=0; i<=rooms.length; i++) {
                var room = rooms[i];
                if ((room[0].id == client.id) || (room[1].id == client.id)) {
                    io.emit("update", room[0].name + " has left the server.");
                    io.emit("update", room[1].name + " has left the server.");
                    io.sockets.socket(room[0].id).disconnect();
                    io.sockets.socket(room[1].id).disconnect();
                }
            }
        }*/
    });
});

http.listen(3001, function(){
    console.log('listening on port 3001');
});

function game_over(room, player_name, win) {
    if (win) {
        io.in(room).emit("game_over", "The winner is " + player_name + "!");
    }
    else {
        io.in(room).emit("game_over", "Draw!");
    }
}