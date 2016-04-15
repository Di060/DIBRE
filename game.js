//
//
//          QUE COISA FEIA, ESPIONANDO O CODIGO DOS OUTROS!!!
//
//
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

//Sprites--------------------------------------------

var bs = new Image(), //Boss normal
    bd = new Image(), //Boss tomando dano
    ch = new Image(), //Chão
    bg = new Image(), //Fundo
    appear = [],      //Animação
    pp = 0,
    aaa=42;

while (pp<38){
    appear[pp]=(new Image());
    appear[pp].src=("assets/sprites/spr_entrada/spr_boss1ap_"+pp+".png");
    pp++;
}

aaa=Math.floor(Math.random()*42);

if (aaa==1)  bs.src="assets/sprites/spr_chocoboss.png";
else bs.src="assets/sprites/spr_boss.png";
bd.src="assets/sprites/spr_boss_damage.png";
ch.src="assets/sprites/spr_chao.png";
bg.src="assets/sprites/spr_fundo.png";

//Sons-----------------------------------------------
var filling = new Audio("assets/sons/filling.wav"),
    remonta = new Audio("assets/sons/reassemble.wav"),
    pulo = new Audio("assets/sons/jump.wav"),
    dano = new Audio("assets/sons/damage.wav"),
    bdano = new Audio("assets/sons/bdamage.wav"),
    pfire = new Audio("assets/sons/pfire.wav");

//O-Resto--------------------------------------------

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
        sprite : bs,
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
    tecla = [];

canvas.width = width;
canvas.height = height;

document.body.addEventListener("keydown", function(e) {
    tecla[e.keyCode] = true;
    k = e.keyCode;
});
 
document.body.addEventListener("keyup", function(e) {
    tecla[e.keyCode] = false;
});

boss.hp=bhp;
function update(){

    var cancan = document.getElementById('canvas');
    var bodyzinho = document.getElementById('zin');
    var butao = document.getElementById('AA');

    //Dano ao boss
    if (tiro.y<-32 && boss.image>=37) boss.sprite=bs;
    if (tiro.x>boss.x-72 && tiro.x<boss.x+72 && tiro.y<boss.y && tiro.y>0 && boss.enche===false && boss.image>=37) {
        started=true;
        btiro.spd=btiro.mspd;
        boss.sprite=bd;
        tiro.y=-16;
        score+=dmg;
        document.getElementById('MSGx').innerHTML = "<br>";
        //bdano.play()

        boss.hp-=dmg;
    }

    //Animação do Boss
    if (boss.image<37) {
        boss.image+=0.5;
        boss.sprite=appear[Math.floor(boss.image)];
        btiro.y=-100;
    }
    if (boss.image<0) {
        boss.sprite=appear[Math.floor(-boss.image)]; 
        boss.image++;       
    }

    //Zerar pontuação antes do início do jogo
    if (started===false) {
        score=0;
    }
    if (htiro.x>=700) {
        htiro.x=-64;
    }

    if (btiro.mspd-5==2) htiro.spd+=0.005;


    if (btiro.spd===0) {
        btiro.x=boss.x;
    }

    //Tiro do Boss
    if (lvl>=3) {
        if (htiro.x<player.x) htiro.x+=2;
        else htiro.x-=2;  
    }

    if (htiro.y<player.y-48) htiro.y++;
    if (htiro.y>player.y-48) htiro.y--;

    btiro.y+=btiro.spd;
    if (btiro.x>player.x-16 && btiro.x<player.x+16 && btiro.y>player.y-16 && btiro.y<player.y+16) {
        vidas--;
        dano.play();
        player.width=16;
        player.height=16;
        btiro.y=boss.y;
        //pfire.play();
    }
    if (htiro.x>player.x-16 && htiro.x<player.x+16 && player.y>htiro.y && player.y<htiro.y+64) {
        vidas--;
        dano.play();
        player.width=16;
        player.height=16;
        htiro.x=Math.floor(Math.random()*width);
        htiro.y=-128;
    }
    if (vidas<0) {
        butao.style="background-color: red; color: white;";
        document.getElementById('canvas').style="border: 4px dotted red;";
        document.getElementById('zin').style="background-color: red;";
        document.getElementById('MSGx').innerHTML = "GAME OVER";
        return;
    }

    if (btiro.y>height-80 && boss.y>=boss.ystart) {
        if (lvl%2==1) {
            btiro.x=player.x;
            btiro.y=boss.y;
            pfire.play();
        }
        if (lvl%2===0) {
            btiro.x=Math.floor(Math.random()*width);
            btiro.y=-32;
            pfire.play();
        }
    }

    //rato.x=event.clientX;

    if (boss.hp<=0) {
        btiro.mspd+=0.5;
        htiro.mspd++;
        tiro.vspd--;
        boss.enche=true;
        bhp=64;
        remonta.play();
        if (walls.size<=128) walls.size+=32;
        switch(bgcol){
            case("#0f0"): {bgcol="#fa0"; htiro.spd=htiro.mspd; break;}
            case("#fa0"): {bgcol="#faa"; break;}
            case("#faa"): {bgcol="#0ff"; break;}
            case("#0ff"): {bgcol="#f0f"; break;}
            case("#f0f"): {bgcol="#0af"; break;}
            case("#0af"): {bgcol="#fff"; break;}
            case("#fff"): {bgcol="#0f0"; break;}}
        cancan.style="border: 4px dotted "+bgcol+";"
        bodyzinho.style="background-color: "+bgcol+";"
        butao.style="background-color: "+bgcol+";"
        boss.image=-37;
    }
    if (bgcol=="#0ff") friction=0.98;
    else friction=0.8;
    if (boss.enche==true) {
        boss.hp+=(bhp/32)
    }
    if (boss.hp>=bhp) {
        boss.enche=false;
        boss.hp=bhp;
    }
    if (boss.hp<bhp) {
        boss.hp+=0.01;
    }''
    if (boss.w<160) {
        boss.w+=4;
        boss.h+=4;
    }

    lvl=((btiro.mspd-5)*2)
    switch(lvl){
    case(3):
        htiro.mspd=2
        htiro.spd=2
        break;
    }
    if (lvl>5) {
        boss.deathray--;
        if (boss.deathray<0) boss.deathray=500;
    }

    //Teclas e movimento

    if (true/*btiro.spd!=0*/) {
        if (tecla[37] && player.spdX > -player.vel) {
        player.spdX--; };
        if (tecla[39]  /*Direita  */ && player.spdX < player.vel) {
        player.spdX++; };
        if (tecla[38] && player.y+player.height>=chao) { player.spdY=-player.vel*2; pulo.play()};
    }
    if ((tecla[32] || started==true) && tiro.y<-16 && pausa==false) {
        //document.getElementById('MSGx').innerHTML = "<BR>";
        player.width=38;
        player.height=38;
        tiro.x=player.x-8 ;
        tiro.y=player.y;
    }
    if (player.width>32) {
        player.width--
        player.height--
    }
    if (player.width<32) {
        player.width++
        player.height++
    }

    if ((tiro.x<walls.size || tiro.x>width-walls.size)  && tiro.y<=walls.y ){
         tiro.y=-100;
    }

    if ((score%100==0) && (score>0)) {
        vidas++;
        score++;
    }
	if ((score%1000==0) && (score>0)) {
		tiro.vsp--;
		score++;
	}

    if (boss.deathray<=50 && boss.deathray>0 && player.x>boss.x-16 && player.x<boss.x+16)  {
        vidas--;
        dano.play();
        player.width=16;
        player.height=16;
        boss.deathray=500;
    }
    
    if (pausa==false) {
        tiro.y+=tiro.vspd;

        player.y+=player.spdY;   
        player.x+=player.spdX;

        player.spdX = player.spdX * friction;

        if ((player.y+player.height/2) < chao) { player.spdY+=gravity; };

        if (boss.x>player.x) boss.x-=4;
        if (boss.x<player.x) boss.x+=4;

        if (boss.y<boss.ystart) boss.y+=8;
    }
    if (player.x<22) player.x=22;
    if (player.x>width-player.width+16) player.x=width-player.width+16;
    if (!tecla[38] &&(player.y+player.height) >=chao) { player.spdY=0; player.y=chao-player.height/2; };

    // Desenhar
    ctx.globalAlpha =1;
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = bgcol;
    ctx.fillRect(0,0,width,height)
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,width,height-64)
    ctx.globalAlpha = 1;

    //Raio da morte

    if (boss.deathray>0) {
    ctx.fillStyle = "red"
    ctx.fillRect(boss.x-1,boss.y,2,(height-64)-boss.y)
    }


    if (boss.deathray<=50 && boss.deathray>0) {
        ctx.fillStyle = "#f00"
        ctx.fillRect(boss.x-16,boss.y,32,(height-64)-boss.y)
    }

    if (boss.deathray<=50 && boss.deathray>0) {
        ctx.fillStyle = "#f88"
        ctx.fillRect(boss.x-8,boss.y,16,(height-64)-boss.y)
    }

    if (boss.deathray<=150 && boss.deathray>0) {
        ctx.fillStyle = "#fff"
        ctx.fillRect(boss.x-4,boss.y,8,(height-64)-boss.y)
    }
    //Tiro
    ctx.fillStyle = "#ccc";
    ctx.fillRect(tiro.x+3,tiro.y+2,10,8);
    ctx.fillRect(tiro.x+5,tiro.y,6,16);

    //Chão
    ctx.fillStyle = "#000";   
    ctx.drawImage(ch,0,chao);

    //Jogador
    /*
    ctx.fillStyle = "#000"; 
    ctx.fillRect((player.x-player.width/2)-1, (player.y-player.height/2)-1, player.width+2, player.height+2);*/

    ctx.fillStyle = "#555";
    ctx.fillRect(player.x-player.width/2, player.y-player.height/2, player.width, player.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x-player.width/2, player.y-player.height/2, player.width-2, player.height-2);

    //Tiro do Boss
/*
    ctx.fillStyle = "#000";
    ctx.fillRect(btiro.x-9,btiro.y-1,18,18);*/
    ctx.fillStyle = "#f00";
    ctx.fillRect(btiro.x-8,btiro.y,16,16);
/*
    ctx.fillStyle = "#000";
    ctx.fillRect(htiro.x-9,htiro.y-1,18,66);*/
    ctx.fillStyle = "#f00";
    ctx.fillRect(htiro.x-8,htiro.y,16,64);

    //Boss
    ctx.drawImage(boss.sprite, boss.x-(boss.w/2), boss.y-(boss.h/2),boss.w,boss.h);

    //Debug e +
    ctx.font = "32px consolas"
    ctx.fillStyle = "#fff";
    ctx.fillText(txt,16,height-128);

    //Vida do Boss
    ctx.font = "24px consolas"
    ctx.fillStyle = "#000";
    ctx.fillText(("Level: "+(lvl)+"| Lives: "+(vidas)+"| Score: "+(score)),24,height-28);
    ctx.fillRect(23,height-25,594,18);
    

    ctx.fillStyle = bgcol;
    ctx.fillRect(24,height-24,(boss.hp*(592/bhp)),16);

    ctx.fillStyle = "#000";
    ctx.globalAlpha = 0.4;
    ctx.fillRect(24,height-16,592,8);

    //PAREDonildas
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#f00"
    ctx.fillRect(0,193,walls.size,14)
    ctx.fillRect(width,193,-walls.size,14)

    requestAnimationFrame(update);
}
window.addEventListener("load", function(){
  update();
});

