//import { UnrealBloomPass } from '//unpkg.com/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { UnrealBloomPass } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const deg2rad = deg => { return deg * Math.PI / 180; }
const rad2deg = rad => { return rad * 180 / Math.PI; }

let b = [1, 2, 3, 4, 5]

let n = b[b.length-1]

for(let i = 0; i < b.length; i++){
    if(i < b.length){
        n = n * b[b.length-(2+i)]
    }    
    else{
    
    }
    console.log( n )
} 



const initialData = { nodes: [{ id: 0 }], links: [] };

const N = 500;
const nodes = [...Array(N).keys()].map(i => {
    return { 
        id: i,
        val: (Math.random() * 1.5) + 1
    };
});

function generateLinks(nodes) {
    let links = [];
    nodes.forEach(node => {
        let numNodeLinks = Math.round(Math.random() * (0.75 + Math.random())) + 1;
        for(let i = 0; i < numNodeLinks; i++) {
            links.push({
                source: node.id,
                target: Math.round(Math.random() * (node.id > 0 ? node.id - 1 : node.id))
            });
        }
    });
    return links;
}
const links = generateLinks(nodes);
const gData = {nodes, links};

let interval = 0;
const graphElem = document.getElementById("3d-graph");



setTimeout(() => { clearInterval(timerId);}, 10000);

let distance = 600;

const Graph = ForceGraph3D()(graphElem);
Graph.enableNodeDrag(false);
Graph.enableNavigationControls(false);
Graph.enablePointerInteraction(false);
Graph.showNavInfo(false);

Graph.cameraPosition({ z: distance });

Graph.nodeRelSize(4);
Graph.nodeOpacity(1);

Graph.linkWidth(5);

Graph.linkDirectionalParticles(5);
Graph.linkDirectionalParticleWidth(5);

const bloomPass = new UnrealBloomPass();
bloomPass.strength = 1.7;
bloomPass.radius = 1;
bloomPass.threshold = 0.5;
Graph.postProcessingComposer().addPass(bloomPass);



let currentAngle = 0;
setInterval(() => {
    Graph.cameraPosition({
        x: distance * Math.sin(deg2rad(currentAngle)),
        z: distance * Math.cos(deg2rad(currentAngle))
    });
    
    currentAngle += 0.5;
}, 10);

window.addEventListener('resize', e => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    Graph.width(width);
    Graph.height(height);
    Graph.refresh();
});

// function onClick(e) {
//     e.preventDefault();
//     e = e.touches && e.touches.length ? e.touches[0] : e;

//     let x = e.pageX;
//     let y = e.pageY;
    
//     const links = generateLinks(nodes);
//     const gData = {nodes, links};
//     Graph.graphData(gData);
// }

let timerId = setTimeout(()=>{
    Graph.graphData(gData);
}, 5000)

document.querySelector('.slide-right').onclick = slideRight;
document.querySelector('.slide-left').onclick = slideLeft;

let items = document.querySelectorAll('.slider-item');

function slideRight(){
    console.log('click')
    for(let i = 0; i < items.length; i++)
    {
        if(items[i].classList.contains('right')){
            items[i].classList.remove('right');
            items[i].classList.add('active');
            continue;
        }
        else if(items[i].classList.contains('active')){
            items[i].classList.remove('active');
            items[i].classList.add('left');
            continue;
        }
        else if(items[i].classList.contains('left')){
            items[i].classList.remove('left');
            items[i].classList.add('hidden');
            continue;
        }
        else if(items[i].classList.contains('hidden')){
            items[i].classList.remove('hidden');
            items[i].classList.add('right')
        }
    }
}

function slideLeft(){
    console.log('click')
    for(let i = 0; i < items.length; i++)
    {
        if(items[i].classList.contains('left')){
            items[i].classList.remove('left');
            items[i].classList.add('active');
            continue;
        }
        else if(items[i].classList.contains('active')){
            items[i].classList.remove('active');
            items[i].classList.add('right');
            continue;
        }
        else if(items[i].classList.contains('right')){
            items[i].classList.remove('right');
            items[i].classList.add('hidden');
            continue;
        }
        else if(items[i].classList.contains('hidden')){
            items[i].classList.remove('hidden');
            items[i].classList.add('left');
            continue;
        }
        
    }
}

document.querySelector('.menu-btn').onclick = openMenu;
let menu = document.querySelector('.menu-items')

function openMenu(){
    menu.classList.toggle('active');
}

var sound = new Audio('Запись (3).m4a')



function playKey(e){
    if(e.keyCode == 65){
		sound.play();
        console.log('clicked');
	}
    console.log('clicked');
}

document.querySelector('.menu-lang').onclick = changeLang;

let lg = document.querySelectorAll('.lg');

let circal = document.querySelector('.change-lang');

console.log(location.href)

let currLang = window.location.pathname + '#en';

location.href = currLang;

function changeLang(){
    console.log('change')
    for (let i = 0; i < lg.length; i++){
        if(lg[i].classList.contains('hidden')){
            lg[i].classList.remove('hidden');
            lg[i].classList.add('active');
            
        }
        else if(lg[i].classList.contains('active')){
            lg[i].classList.remove('active');
            lg[i].classList.add('hidden');
        }
    }
    circal.classList.toggle('rotated');
    circal.classList.toggle('rotate');
    
    console.log(location.href.includes('#en'))
    
    if(location.href.includes('#en')) {
        console.log('+');
        currLang = window.location.pathname + '#ua';
        console.log(location.href)
        location.href = currLang;
    }
    else if (location.href.includes('#ua')) {
        console.log('-')
        currLang = window.location.pathname + '#en';
        console.log(location.href)
        location.href = currLang;
    }
    changeLanguage();
    // location.reload()
}

console.log(location.href)

function changeLanguage(){
    let hash = window.location.hash;
    hash = hash.substring(1);
    console.log(hash);
    document.querySelector('title').innerHTML = langArr['unit'][hash];
    document.querySelector('.common').innerHTML = langArr['common'][hash];
    document.querySelector('.history').innerHTML = langArr['history'][hash];
    document.querySelector('.person').innerHTML = langArr['person'][hash];
    document.querySelector('.study').innerHTML = langArr['study'][hash];
    document.querySelector('.procces').innerHTML = langArr['procces'][hash];
    document.querySelector('.docs').innerHTML = langArr['docs'][hash];
    document.querySelector('.lessons').innerHTML = langArr['lessons'][hash];
    document.querySelector('.prepearing').innerHTML = langArr['prepearing'][hash];
    document.querySelector('.plan').innerHTML = langArr['plan'][hash];
    document.querySelector('.work').innerHTML = langArr['work'][hash];
    document.querySelector('.doc').innerHTML = langArr['doc'][hash];
    document.querySelector('.dev').innerHTML = langArr['dev'][hash];
    document.querySelector('.conf').innerHTML = langArr['conf'][hash];
    document.querySelector('.method').innerHTML = langArr['method'][hash];
    document.querySelector('.posts').innerHTML = langArr['posts'][hash];
    document.querySelector('.sign-in').innerHTML = langArr['sign-in'][hash];
    document.querySelector('.sign-up').innerHTML = langArr['sign-up'][hash];
    document.querySelector('.item1-tit').innerHTML = langArr['item1-tit'][hash];
    document.querySelector('.item2-tit').innerHTML = langArr['item2-tit'][hash];
    document.querySelector('.item3-tit').innerHTML = langArr['item3-tit'][hash];
    document.querySelector('.item4-tit').innerHTML = langArr['item4-tit'][hash];
    document.querySelector('.item1-cont').innerHTML = langArr['item1-cont'][hash];
    document.querySelector('.item2-cont').innerHTML = langArr['item2-cont'][hash];
    document.querySelector('.item3-cont').innerHTML = langArr['item3-cont'][hash];
    document.querySelector('.item4-cont').innerHTML = langArr['item4-cont'][hash];
    document.querySelector('.play1').innerHTML = langArr['play1'][hash];
    document.querySelector('.play2').innerHTML = langArr['play2'][hash];
    document.querySelector('.play3').innerHTML = langArr['play3'][hash];
    document.querySelector('.play4').innerHTML = langArr['play4'][hash];
    document.querySelector('.title').innerHTML = langArr['title'][hash];
    document.querySelector('.cont').innerHTML = langArr['cont'][hash];
}

changeLanguage();


console.log(window.location.pathname + '#en')
console.log(location.href)

window.addEventListener('click', onClick, false);
window.addEventListener('touchstart', onClick, false);

addEventListener("keydown", playKey);