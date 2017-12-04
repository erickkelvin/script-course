$(document).ready(function(){
    var socket = io.connect(window.location.hostname + ":3001");
    var ready = false;
    var turn_control = 0;

    $("#submit").submit(function(e) {
        e.preventDefault();
        $("#nick").slideUp();
        ready = true;
        var name = $("#nickname").val();
        socket.emit("join", name);
    });

    socket.on("player1", function(msg) {
        if (ready) {
            $("#game_info").fadeIn();
            $("#player1").html(msg);
        }
    });

    socket.on("player2", function(msg) {
        if (ready) {
            $("#player2").html(msg);
        }
    });

    socket.on("room_info", function(msg) {
        if (ready) {
            $("#room_info").fadeIn();
            $("#room_info").append("<span id='room_number'>" + msg + "</span>");
        }
    });

    socket.on("turn_info", function(msg) {
        if (ready) {
            $("#turn_info").html("<span>" + msg + "</span>");
        }
    });

    socket.on("game_start", function() {
        if (ready) {
            $("table").slideToggle();
            $("#turn_info").fadeIn();
        }
    });

    socket.on("show_play", function(cell_id, cell_class) {
        if (ready) {
            console.log(cell_id, cell_class);
            $("#" + cell_id).html("<span class='" + cell_class + "'></span>");
            $("#" + cell_id).off('click');
            turn_control++;
            if (turn_control==2) turn_control = 0;
            $("#turn_info span").html(turn_control);
        }
    });

    socket.on("game_over", function(winner) {
        if (ready) {
            $("td").off('click');
            setTimeout(function() { 
                if (window.confirm(winner + " Play again?")) {
                    window.location.reload();
                }
            }, 100);
        }
    });


    $("td").click(function(e) {
        socket.emit("play", $("#room_number").text(), e.target.id, turn_control);
    });
});