let start = false;
let player1 = false;
let p1Choice = [false, false, false, false, false, false, false, false, false];
let p2Choice = [false, false, false, false, false, false, false, false, false];
let table = [false, false, false, false, false, false, false, false, false];
let gameOverText = "";

function gameStart() {
    if(!start) {
        cellChange("cell", "");
        start = true;
        player1 = true;
        $(".p1").css("color", "#fff");
        $(".desc").css("color", "#DED0B6");
        $(".draw").css("display", "none");
        $(".p1Wins").css("display", "none");
        $(".p2Wins").css("display", "none");
    }
}

function cellChange(id, value) {
    $("." + id).fadeOut();
    setTimeout(function(){
        $("." + id).html(value).fadeIn();
    }, 350);
}

function play(id, value) {
    let selectedCell = {
        row: 0,
        col: 0
    };

    switch(id) {
        case "r1c1": selectedCell.row = 0; selectedCell.col = 0; break;
        case "r1c2": selectedCell.row = 0; selectedCell.col = 1; break;
        case "r1c3": selectedCell.row = 0; selectedCell.col = 2; break;
        case "r2c1": selectedCell.row = 1; selectedCell.col = 0; break;
        case "r2c2": selectedCell.row = 1; selectedCell.col = 1; break;
        case "r2c3": selectedCell.row = 1; selectedCell.col = 2; break;
        case "r3c1": selectedCell.row = 2; selectedCell.col = 0; break;
        case "r3c2": selectedCell.row = 2; selectedCell.col = 1; break;
        case "r3c3": selectedCell.row = 2; selectedCell.col = 2; break;
    }

    let index = (selectedCell.row * 3) + selectedCell.col;
    let sameCell = table[index];

    if(!sameCell){
        if(player1) {
            p1Choice[index] = true;
        } else {
            p2Choice[index] = true;
        }

        table[index] = true;
        cellChange(id, value);
    }

    return sameCell;
}

function chooseCell(cell) {
    let mark = "O";
    let player = "p1";
    let wait = "p2";

    if(player1) {
        mark = "X";
        player = "p2";
        wait = "p1";
    }

    let sameCell = play(cell, "<b class='mark'>" + mark + "</b>");

    if(!sameCell) {
        if(isDraw()) {
            draw();
        } else {
            if(isGameOver()) {
                gameOver(wait, player);
            } else {
                player1 = !player1;
                $("." + player).css("color", "#fff");
                $("." + wait).css("color", "#DED0B6");
            }
        }
    }
}

function isGameOver() {
    let player = [];
    
    if(player1) {
        player = p1Choice;
    } else {
        player = p2Choice;
    }

    return (player[0] && player[1] && player[2]) 
    || (player[3] && player[4] && player[5]) 
    || (player[6] && player[7] && player[8]) 
    || (player[0] && player[3] && player[6]) 
    || (player[1] && player[4] && player[7]) 
    || (player[2] && player[5] && player[8]) 
    || (player[0] && player[4] && player[8]) 
    || (player[2] && player[4] && player[6]);
}

function isDraw() {
    return table[0] && table[1] && table[2] 
    && table[3] && table[4] && table[5] 
    && table[6] && table[7] && table[8];
}

function gameOver(winner, loser) {
    start = false;
    player1 = false;
    table = [false, false, false, false, false, false, false, false, false];
    p1Choice = [false, false, false, false, false, false, false, false, false];
    p2Choice = [false, false, false, false, false, false, false, false, false];
    $("." + winner + "Wins").css("display", "inline");
    $("." + winner).css("color", "#fff");
    $("." + loser).css("color", "#DED0B6");
    $(".desc").html("Play Again");
    $(".desc").css("color", "#fff");
}

function draw() {
    start = false;
    player1 = false;
    table = [false, false, false, false, false, false, false, false, false];
    p1Choice = [false, false, false, false, false, false, false, false, false];
    p2Choice = [false, false, false, false, false, false, false, false, false];
    $(".draw").css("display", "inline");
    $(".p1").css("color", "#fff");
    $(".p2").css("color", "#fff");

    $(".desc").html("Play Again");
    $(".desc").css("color", "#fff");
}

/*
$(document).on("keydown", function() {
    // gameOverText = "Game Over!!! Press a key to play again.....";
    gameStart();
});
*/

/*
$("html").on("touchstart", function() {
    console.log("touch");
    if(!start) {
        // gameOverText = "Game Over!!! Tap the Screen to play again.....";
        gameStart();
    }
});
*/

$(".desc").on("click", function() {
    if(!start) {
        gameStart();
    }
});

$(".cell").on("click", function() {
    if(start) {
        chooseCell($(this).attr("class").split(" ")[2]);
    }
});