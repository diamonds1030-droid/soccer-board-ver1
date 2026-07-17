const maxPlayers = 25;


let players=[];


for(let i=1;i<=maxPlayers;i++){

players.push({

//number:i,
number: player.number

name:"選手"+i

});

}

const saved = localStorage.getItem("playerNames");

if(saved){

    const data = JSON.parse(saved);

    data.forEach((p,index)=>{

        players[index].name = p.name;

    });

}

const yellowList = document.getElementById("player-list-yellow");
const blueList = document.getElementById("player-list-blue");

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



let btn=div.querySelector("button");


btn.onclick=()=>{

createPlayerOnField(player);

};

if(player.number <= 13){

    yellowList.appendChild(div);

}else{

    blueList.appendChild(div);

}

});

loadFormation();

// コート配置
function createPlayerOnField(player){

    let p = document.createElement("div");

    p.className = "player";
    p.innerHTML = player.name;

    p.style.left = "45%";
    p.style.top = "45%";

    field.appendChild(p);

    dragElement(p);
    
    saveFormation();

    let timer;

    p.addEventListener("touchstart", () => {

        timer = setTimeout(() => {

            if(confirm(player.name + " を削除しますか？")){
                p.remove();
                saveFormation();
            }

        }, 700);

    });

    p.addEventListener("touchend", () => {
        clearTimeout(timer);
    });

    p.addEventListener("touchmove", () => {
        clearTimeout(timer);
    });

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
    saveFormation();
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

//配置保存
function saveFormation(){

    const formation = [];

    document.querySelectorAll(".player").forEach(p => {

        formation.push({

            name: p.textContent,

            left: p.style.left,

            top: p.style.top

        });

    });

    localStorage.setItem(
        "formation",
        JSON.stringify(formation)
    );

}

function loadFormation(){

    const saved = localStorage.getItem("formation");

    if(!saved) return;

    const formation = JSON.parse(saved);

    formation.forEach(data => {

            const player = players.find(p => p.number === data.number);
        
        if(!player) return;

        createPlayerOnField(player);

        const p =
            field.lastElementChild;

        p.style.left = data.left;
        p.style.top = data.top;

    });

}

//配置クリア
document.getElementById("clearFormation").addEventListener("click", () => {

    if(!confirm("コート上の選手をすべて削除しますか？")){
        return;
    }

    document.querySelectorAll(".player").forEach(player => {
        player.remove();
    });

    localStorage.removeItem("formation");

});
