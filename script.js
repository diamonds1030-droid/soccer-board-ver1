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


input.addEventListener("input", () => {

    player.name = input.value;

    localStorage.setItem(
        "playerNames",
        JSON.stringify(players)
    );

});

const saved = localStorage.getItem("playerNames");

if(saved){

    const data = JSON.parse(saved);

    data.forEach((p,index)=>{

        players[index].name = p.name;

    });

}


let btn=div.querySelector("button");


btn.onclick=()=>{

createPlayerOnField(player);

let timer;

p.addEventListener("touchstart",()=>{

    timer = setTimeout(()=>{

        if(confirm(player.name + " を削除しますか？")){

            p.remove();

        }

    },700);

});

p.addEventListener("touchend",()=>{

    clearTimeout(timer);

});

};



list.appendChild(div);


});





// コート配置

function createPlayerOnField(player){


let p=document.createElement("div");


p.className="player";

p.innerHTML=

`
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

    e.preventDefault();

    document.body.classList.add("dragging");

    let point = e.touches ? e.touches[0] : e;

    offsetX = point.clientX - el.offsetLeft;
    offsetY = point.clientY - el.offsetTop;

    document.addEventListener("touchmove", move, {passive:false});
    document.addEventListener("mousemove", move);

    document.addEventListener("touchend", end);
    document.addEventListener("mouseup", end);
}



function move(e){

e.preventDefault();


let point=e.touches?e.touches[0]:e;


let rect=field.getBoundingClientRect();


let x=point.clientX-rect.left-offsetX;

let y=point.clientY-rect.top-offsetY;



el.style.left=x+"px";

el.style.top=y+"px";



}

function end(){

    document.body.classList.remove("dragging");

    document.removeEventListener("touchmove", move);
    document.removeEventListener("mousemove", move);

    document.removeEventListener("touchend", end);
    document.removeEventListener("mouseup", end);
}

}