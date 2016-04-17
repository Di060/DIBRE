//Sprites--------------------------------------------

function montanim(NOME,QUADROS,IMAGEM) {
    //Montador de animações
    var pp=0;
    while (pp<=QUADROS){
        NOME[pp] = (new Image());
        NOME[pp].src=("assets/sprites/"+IMAGEM+"/"+IMAGEM+"_"+pp+".png");
        pp++;
    }
}

//Nomes dos sprites
var spr_boss = new Image(), //Boss normal
    spr_boss_damage = new Image(), //Boss tomando dano
    spr_chao = new Image(), //Chão
    bg = new Image(), //Fundo
    appear = [],      //Animação de entrada
    aaa=42;

//Fontes dos sprites
spr_boss.src="assets/sprites/spr_boss.png";
spr_boss_damage.src="assets/sprites/spr_boss_damage.png";
spr_chao.src="assets/sprites/spr_chao.png";
bg.src="assets/sprites/spr_fundo.png";
//Montar animações
montanim(appear,38,"spr_boss1ap");
