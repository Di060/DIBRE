var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 640,
    height = 600,
    player = {
        x : width/2,
        y : height-72,
        width : 32,
        height : 32,
        vel : 6,
        spdX : 0,
        spdY :0
    },
    bgcol="#fff",
    chao=height-64,
    boss = {
         x : width/2,
        y : 96,
        ystart : 96,
        col : "#fff",
        hp : 2,
        fase : 1,
        enche : false,
        sprite : spr_boss,
        w : 160,
        h : 160,
        image : 0,
        deathray : 0
    },
    tiro = {
        x : 0,
        y : 0,
        vspd : -20
    },
    btiro = {
        x : 1000,
        y : 1000,
        spd : 0,
        mspd : 5.5
    },
    htiro = {
        x : -100,
        y : height-128,
        spd : 0,
        mspd : 1
    },
    friction=0.8,
    gravity=0.5,
    k = 0,
    pausa = false,
    started = false,
    txt = "",
    bhp = 32,
    walls = {
        size : -64,
        y : 256
    },
    vidas = 3,
    score = 0,
    lvl = 1,
    dmg = 1,
    rato = {
        x: 0,
        y :0
    },
    rect = canvas.getBoundingClientRect(),
    tecla = [];

canvas.width = width;
canvas.height = height;
boss.hp=bhp;

//Teclas
document.body.addEventListener("keydown", function(e) {
    tecla[e.keyCode] = true;
    k = e.keyCode;
});
 
document.body.addEventListener("keyup", function(e) {
    tecla[e.keyCode] = false;
});