const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");
let img = new Image();
img.src = 'mario.png';

const g = 10;
// requestAnimationFrame's number of callbacks is usually 60 times per second, 
// but will generally match the display refresh rate in most web browsers as per W3C recommendation.
const dt = 150; // dt cannot be too small, otherwise y-y_init will be too small 

let runnerAnimationFrame = 0;
let maxRunnerAnimationFrame = 4;
let runnerAnimationFrame_ = 0;
let loopspeed = 0.2; // set at any value less than 1

const init_x = 0.1*canvas.width;
const init_y = 0.9*canvas.height;
let init_u_y = -42;
let spriteThick = 40;
let spriteHeight = 80;

let objects = [];
let obj_height = 10;
let obj_width = 10;

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
        context.fillStyle = ""; 
        context.rect(this.x, this.y-this.height, this.thick, this.height); 
        context.fill();
        context.closePath();

        // drawing the sprites from the sprite sheet
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

class object {
    constructor(x,y,thick,height,speed,type){
        this.x=x;
        this.y=y;
        this.height=height;
        this.thick=thick;
        this.speed=speed;
        this.type=type;
    }

    // update_obj(){
    //     this.x -= speed*dt;        
    // }    
}

function generate_obj(){

    let obj_type = Math.round(Math.random()*3);

    let obj_y = Math.round(Math.random()*0.9*canvas.height);    
    while(obj_y > 0.5*canvas.height-10 && obj_y < 0.5*canvas.height+10){
        obj_y = Math.round(Math.random()*0.9*canvas.height);
    }

    let obj_spd = Math.round(Math.random()*5);
 
    switch (obj_type){
        case 0:
            obj_height = 30;
            obj_thick = 30;
            break;            
        case 1:
            obj_height = 30;
            obj_thick = 30;
            break;
        case 2:
            obj_height = 30;
            obj_thick = 30;
            break;
        case 3:
            obj_height = 20;
            obj_thick = 20;
            break;
    }
    
    let generated_obj = new object(canvas.width, obj_y, obj_thick, obj_height, obj_spd, obj_type);
    return generated_obj;
}

// gen_obj = generate_obj();
// objects.push(gen_obj);

function update_obj_array(){

    /// calculate the updated objects and their positions

    // generate an obj if array contains only 1 obj or less
    if (objects.length<=1){
        gen_obj = generate_obj();
        objects.push(gen_obj);
    }
    
    // update the obj_x for each object 
    objects.forEach(obj => {
        obj.x -= obj.speed;
        //obj.update_obj();        
    })
    
    //console.log(objects.length);
    //objects.forEach(obj => console.log(obj));

    // remove obj which is out of screen from array and delete the obj by making it undefined
    objects.forEach(obj => {
        if(obj.x<=0){
            obj.x=undefined;
            obj.y=undefined;
            obj.thick=undefined;
            obj.height=undefined;
            obj.speed=undefined;
            obj.type=undefined;            
        }
    })    
    objects = objects.filter(a => a.x>0);
}


function drawObj(){

    objects.forEach(obj => {
        switch (obj.type){
            case 0:
                context.beginPath();
                context.rect(obj.x, obj.y, obj.thick, obj.height);
                context.fillStyle = "";
                context.fill();
                context.closePath();

                context.drawImage(img, 185+runnerAnimationFrame*35, 235, 16, 17, obj.x, obj.y, obj.thick, obj.height);
                break;
            case 1:
                context.beginPath();
                context.rect(obj.x, obj.y, obj.thick, obj.height);
                context.fillStyle = "";
                context.fill();
                context.closePath();

                context.drawImage(img, 185+2*35, 260, 16, 22, obj.x, obj.y, obj.thick, obj.height);
                break;
            case 2:
                context.beginPath();
                context.rect(obj.x, obj.y, obj.thick, obj.height);
                context.fillStyle = "";
                context.fill();
                context.closePath();

                context.drawImage(img, 185+4*35, 260, 16, 22, obj.x, obj.y, obj.thick, obj.height);
                break;
            case 3:
                context.beginPath();
                context.rect(obj.x, obj.y, obj.thick, obj.height);
                context.fillStyle = "";
                context.fill();
                context.closePath();

                context.drawImage(img, 185+6*35, 260, 16, 22, obj.x, obj.y, obj.thick, obj.height);
                break;
        }
        
    });
}

const mario = new Runner(init_x, init_y, spriteThick, spriteHeight); //initialize the object

function draw(){
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw and animate runner
    if(runnerAnimationFrame>=maxRunnerAnimationFrame){
        runnerAnimationFrame = 0;
        runnerAnimationFrame_ = 0;
    }
    else{
        runnerAnimationFrame_ += loopspeed*1;
        runnerAnimationFrame = Math.round(runnerAnimationFrame_);
    }
    mario.drawRunner();

    // draw and animate objects
    update_obj_array();
    drawObj();

    requestAnimationFrame(draw); // We want to perform an animation and requests that the browser calls a specified function 
                                 // to update an animation right before the next repaint.
}

requestAnimationFrame(draw); // initialise the requestAnimationFrame by invoking the draw function


