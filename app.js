const body=document.querySelector('body');
const tagline=document.querySelector('.heading2');
const boxes=document.querySelectorAll('.box');
const btnClick=document.querySelector('.btnClick');
const button=document.querySelector('button');
const one=document.querySelector('#one');
const two=document.querySelector('#two');
const three=document.querySelector('#three');
const four=document.querySelector('#four');

let level=1, started=false, i=0;
let userTurn=false, restart=false;
let gameSequence=[];

function flash(box){
    box.classList.add('btnClick');
    setTimeout(()=>{
        box.classList.remove('btnClick');
    },150);
}

function flashRandomBox(){
    let box=Math.floor(Math.random()*4)+1;
    gameSequence.push(box);
    if(box==1)flash(one);
    else if(box==2)flash(two);
    else if(box==3)flash(three);
    else flash(four);
}

function check(box){
    if(box=="one" && gameSequence[i]==1)return true;
    else if(box=="two" && gameSequence[i]==2)return true;
    else if(box=="three" && gameSequence[i]==3)return true;
    else if(box=="four" && gameSequence[i]==4)return true;
    else return false;
}

document.addEventListener('keypress',()=>{
    if(started==false){
        started=true;
        console.log("The game has started");
        tagline.textContent=`Level ${level}`;
        flashRandomBox();
        userTurn=true;
    }   
});

for(box of boxes){
    box.addEventListener('click',function(){
        if(started==true && userTurn==true){
            flash(this);    
            if(check(this.id)==false){
                tagline.textContent=(`Game over! Score: ${level-1}`);
                let time=1000;
                for(let j=0;j<gameSequence.length;j++){
                    let box=gameSequence[j];
                    if(box==1){
                        setTimeout(()=>{
                            flash(one);
                        },time);
                    }
                    else if(box==2){
                        setTimeout(()=>{
                            flash(two);
                        },time);
                    }
                    else if(box==3){
                        setTimeout(()=>{
                            flash(three);
                        },time);
                    }
                    else {
                        setTimeout(()=>{
                            flash(four);
                        },time);
                    }
                    time+=250;
                }
                userTurn=false;
                restart=true;
            }
            i++;
            if(userTurn ==true && i==gameSequence.length){
                i=0;
                level++;
                setTimeout(()=>{
                    tagline.textContent=(`Level ${level}`);
                    flashRandomBox();
                },1000);
            }    
        }
    });
}
button.addEventListener('click',()=>{
    if(restart==true){
        i=0;
        level=1;
        tagline.textContent=(`Level ${level}`);
        gameSequence=[];
        flashRandomBox();
        userTurn=true;
    }
});
