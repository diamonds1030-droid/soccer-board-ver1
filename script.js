const maxPlayers = 25;


let players=[];


for(let i=1;i<=maxPlayers;i++){

players.push({

number:i,

name:"選手"+i

});

}



const list=document.getElementById("player-list");

const field=document.getElementById("field");



// 選手一覧生成

players.forEach(player=>{


let div=document.createElement("div");

div.className="player-item";


div.innerHTML=`

<div class="number">
${player.number}
</div>

<input class="name"
value="${player.name}"
>

<button>
配置
</button>

`;



let input=div.querySelector("input");


input.addEventListener("change",()=>{

player.name=input.value;

});



let btn=div.querySelector("button");


btn.onclick=()=>{

createPlayerOnField(player);

};



list.appendChild(div);


});





// コート配置

function createPlayerOnField(player){


let p=document.createElement("div");


p.className="player";

p.innerHTML=

`
${player.number}<br>
${player.name}
`;



p.style.left="45%";

p.style.top="45%";



field.appendChild(p);



dragElement(p);


}




// ドラッグ処理

function dragElement(el){


let offsetX;
let offsetY;



el.addEventListener("touchstart",start);

el.addEventListener("mousedown",start);



function start(e){


let point=e.touches?e.touches[0]:e;


offsetX=point.clientX-el.offsetLeft;

offsetY=point.clientY-el.offsetTop;


document.addEventListener("touchmove",move);

document.addEventListener("mousemove",move);


document.addEventListener("touchend",end);

document.addEventListener("mouseup",end);


}



function move(e){


let point=e.touches?e.touches[0]:e;


let rect=field.getBoundingClientRect();


let x=point.clientX-rect.left-offsetX;

let y=point.clientY-rect.top-offsetY;



el.style.left=x+"px";

el.style.top=y+"px";



}



function end(){


document.removeEventListener("touchmove",move);

document.removeEventListener("mousemove",move);


}

}