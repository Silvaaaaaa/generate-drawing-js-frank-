const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
ctx.globalCompositeOperation = 'destination-over' ; 

const edge = 80 ;
let  drawing = false;
const mouse = {
    x : null ,
    y : null  
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x ; 
    mouse.y = event.y ; 
})

class Root{
    constructor(x , y,color , centerx , centery){
        this.x = x ;
        this.y = y ; 
        this.color =color ;
        this.speedx = 0 ; 
        this.speedy = 0 ;
        this.centerx = centerx ; 
        this.centery = centery ; 
    }
    draw(){
        this.speedx += (Math.random() - 0.5) / 2; 
        this.speedy += (Math.random() - 0.5) / 2; 
        this.x += this.speedx ; 
        this.y += this.speedy ;     
        const distancx =this.x - this.centerx ; 
        const distancy =this.y - this.centery ; 
        const distance = Math.sqrt(distancx * distancx + distancy * distancy);
        const radious = (-distance / edge + 1) * edge / 10 ;
        if(radious > 0){
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x ,this.y, radious , 0 , 2 * Math.PI);
            ctx.fillStyle = this.color ; 
            ctx.fill();
            ctx.strokeStyle = 'black' ;  
            ctx.stroke();
        }
    }
}
function branchout(){
  if(drawing){
    const centerx = mouse.x;
     const centery = mouse.y;
     for(let i = 0 ; i < 3 ; i++){
         const root = new Root(mouse.x , mouse.y , 'red' , centerx , centery);
         root.draw();
     }
    }
}

window.addEventListener('resize' ,function(){
    canvas.width = window.innerWidth ;  
    canvas.height = window.innerHeight; 
})
window.addEventListener ('mousemove' , function(){
    // ctx.fillStyle = 'rgba(0 , 0 ,255 , 0.06)';   
    // ctx.fillRect(0, 0 ,canvas.width , canvas.height);
    branchout();
})

window.addEventListener("mousedown", function(){
    drawing = true ;
})
window.addEventListener("mouseup", function(){
    drawing = false ;
})