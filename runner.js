const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");
let img = new Image();
img.src = 'mario.png';

const g = 9.8;
// requestAnimationFrame's number of callbacks is usually 60 times per second, 
// but will generally match the display refresh rate in most web browsers as per W3C recommendation.
const dt = 100; 
let runnerAnimationFrame = 0;
let maxRunnerAnimationFrame = 4;
let runnerAnimationFrame_ = 0;
let loopspeed = 0.2; // set at any value less than 1

const init_x = 0.1*canvas.width;
const init_y = 0.9*canvas.height;
let init_u_y = -42;
let spriteThick = 25;
let spriteHeight = 50;


class Runner {
    constructor(x,y,thick, height){
        this.x=x;
        this.y=y;
        this.height=height;
        this.thick=thick;

        this.jumpSequence=false;

        window.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    }
    
    keyDownHandler(event){
        if((event.key=="ArrowUp" || event.key=="Up") && this.jumpSequence==false){
            this.jump();
        }
    }

    jump(){
        this.jumpSequence=true;
        let v_y = init_u_y;               

        const animateJump = () => {           

            v_y += g*(dt/1000);
            this.y += v_y*(dt/1000);

            if(this.y >= init_y){
                this.y = init_y;
                this.jumpSequence = false;   
            }
            else{                
                requestAnimationFrame(animateJump); // Request browser to invoke animateJump again to update an animation right before the next repaint.
            }
        }          
        
        requestAnimationFrame(animateJump); // Initialise the request for browser to invoke animateJump to update an animation right before the next repaint.

        /////// Jump sequence ///////////////////////
        // Do not use while loop for continuous animations or movement because it blocks the execution of other code
        // and prevents the browser from rendering updates. 
        //
        // while(this.jumpSequence){
        //     v_y += g*dt/1000;
        //     this.y += v_y*(dt/1000); 

        //     if(this.y>=init_y){
        //         this.y = init_y;
        //         this.jumpSequence = false;   
        //     }
        // } 
        //////////////////////////////////////////////
    }

    drawRunner(){
        // drawing the "block" background for the sprite
        context.beginPath();
        context.fillStyle = "green"; 
        context.rect(this.x, this.y-this.height, this.thick, this.height); 
        context.fill();
        context.closePath();

        // drawing the sprite
        // context.drawImage(img, 45+0*35, 101, 15, 29, this.x, this.y-this.height, this.thick, this.height);
        // context.drawImage(img, 45+1*35, 101, 15, 29, this.x, this.y-this.height, this.thick, this.height);
        // context.drawImage(img, 45+2*35, 101, 15, 29, this.x, this.y-this.height, this.thick, this.height);
        // context.drawImage(img, 45+3*35, 101, 15, 29, this.x, this.y-this.height, this.thick, this.height);
        // context.drawImage(img, 45+4*35, 101, 15, 29, this.x, this.y-this.height, this.thick, this.height);

        if(this.y < init_y){
            // animating the sprite jumping
            context.drawImage(img, 45+5*35, 150, 15, 29, this.x, this.y-this.height, this.thick, this.height);
        }
        else{
            // animating the sprite running when not jumping
            context.drawImage(img, 45+runnerAnimationFrame*35, 101, 15, 29, this.x, this.y-this.height, this.thick, this.height); 
        }               
    }

    // function checkcollision(){
    //}
}

// class object {
//     constructor(x,y,speed,height,thick){
//         this.speed=speed;
//         this.x=x;
//         this.y=y;
//         this.height=height;
//         this.thick=thick;
//     }
// }

const mario = new Runner(init_x, init_y, spriteThick, spriteHeight); //initialize the object

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    if(runnerAnimationFrame>=maxRunnerAnimationFrame){
        runnerAnimationFrame = 0;
        runnerAnimationFrame_ = 0;
    }
    else{
        runnerAnimationFrame_ += loopspeed*1;
        runnerAnimationFrame = Math.round(runnerAnimationFrame_);
    }
    mario.drawRunner();

    requestAnimationFrame(draw); // We want to perform an animation and requests that the browser calls a specified function 
                                 // to update an animation right before the next repaint.
}

requestAnimationFrame(draw); // initialise the requestAnimationFrame by invoking the draw function


