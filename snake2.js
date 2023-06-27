const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

const no_of_grids = 20;
const gridWidth = canvas.width / no_of_grids;
const gridHeight = canvas.height / no_of_grids;

let snake1ObjsArray = [
    {x:3*gridWidth, y:3*gridHeight},
    {x:2*gridWidth, y:3*gridHeight},
    {x:1*gridWidth, y:3*gridHeight},
];

let snake2ObjsArray = [
    {x:canvas.width-3*gridWidth, y:canvas.height-3*gridHeight},
    {x:canvas.width-2*gridWidth, y:canvas.height-3*gridHeight},
    {x:canvas.width-1*gridWidth, y:canvas.height-3*gridHeight},
];

let snake1Head = [{x:3*gridWidth, y:3*gridHeight}];
let snake1Head_newx = 3*gridWidth+gridWidth;
let snake1Head_newy = 3*gridHeight;

let snake2Head = [{x:canvas.width-3*gridWidth, y:canvas.height-3*gridHeight}];
let snake2Head_newx = canvas.width-3*gridWidth-gridWidth;
let snake2Head_newy = canvas.height-3*gridHeight;

let snake1Grows = false;
let snake2Grows = false;

let snake1moveRight = true;
let snake1moveLeft = false;
let snake1moveUp = false;
let snake1moveDown = false;

let snake2moveRight = false;
let snake2moveLeft = true;
let snake2moveUp = false;
let snake2moveDown = false;

let generatefruit = true;
let fruitx = 0;
let fruity = 0;

const gameSpeed = 5;
let snake1Gameover = false;
let snake1Score = 0;
let snake2Gameover = false;
let snake2Score = 0;
let timer = 120;

function drawsnake1(){

    // Draw snake1
    for (let i=0; i<1; i++){
        context.beginPath();
        context.fillStyle = "blue";
        context.rect(snake1ObjsArray[i].x, snake1ObjsArray[i].y, gridWidth, gridHeight);
        context.fill();
        //context.strokeStyle = "rgb(21,100,150)";
        //context.rect(snake1ObjsArray[i].x+gridWidth/5, snake1ObjsArray[i].y+gridHeight/5, gridWidth*3/5, gridHeight*3/5);
        //context.lineWidth = 3;
        //context.stroke();
        context.closePath(); 
    }    
    for (let i=1; i<snake1ObjsArray.length; i++){
        context.beginPath();
        context.fillStyle = "blue";
        context.rect(snake1ObjsArray[i].x, snake1ObjsArray[i].y, gridWidth, gridHeight);
        context.fill();
        context.closePath(); 
    }   
}

function drawsnake2(){

    // Draw snake2
    for (let i=0; i<1; i++){
        context.beginPath();
        context.fillStyle = "brown";
        context.rect(snake2ObjsArray[i].x, snake2ObjsArray[i].y, gridWidth, gridHeight);
        context.fill();
        //context.strokeStyle = "rgb(21,100,150)";
        //context.rect(snake1ObjsArray[i].x+gridWidth/5, snake1ObjsArray[i].y+gridHeight/5, gridWidth*3/5, gridHeight*3/5);
        //context.lineWidth = 3;
        //context.stroke();
        context.closePath(); 
    }    
    for (let i=1; i<snake2ObjsArray.length; i++){
        context.beginPath();
        context.fillStyle = "brown";
        context.rect(snake2ObjsArray[i].x, snake2ObjsArray[i].y, gridWidth, gridHeight);
        context.fill();
        context.closePath(); 
    }   
}


function drawFruit(){

    function fruit(){
        context.beginPath();
        context.fillStyle = "red";
        context.rect(fruitx, fruity, gridWidth, gridHeight);
        context.fill();
        context.closePath();
    }

    if (generatefruit === false){
        fruit();
    }
    
    if (generatefruit === true){

        let snakesObjsArray = snake1ObjsArray.concat(snake2ObjsArray);
        let startforloop = true;

        while(startforloop){

            // generate fruit
            fruitx = (Math.floor(Math.random()*no_of_grids))*gridWidth;
            fruity = (Math.floor(Math.random()*no_of_grids))*gridHeight;

            for(i=0; i<snakesObjsArray.length; i++){
                // check if whole snakes position != generated fruit's position, then generated fruit is ok.    
                // else, loop back to generate fruit at random location again and check the generated fruit position again.
                if(fruitx != snakesObjsArray[i].x && fruity != snakesObjsArray[i].y){
                    startforloop = false;                  
                }
                else{
                    startforloop = true;
                }
            }
        }
        
        fruit();
        generatefruit = false;
    }  
}

function ifsnake1Grows(){
    if (snake1ObjsArray[0].x === fruitx && snake1ObjsArray[0].y === fruity){
        snake1Grows = true;
        generatefruit = true;
    }
    else{
        snake1Grows = false;
    }
}

function ifsnake2Grows(){
    if (snake2ObjsArray[0].x === fruitx && snake2ObjsArray[0].y === fruity){
        snake2Grows = true;
        generatefruit = true;
    }
    else{
        snake2Grows = false;
    }
}

function newsnake1Pos(){

    // snake1's new position after moving by "removing" tail and "extending" head
    // If snake1 grows, then tail is not "removed" while head extends for its new position   
    if(snake1Grows===false){
        snake1ObjsArray.pop(); 
    }

    // "extending" head
    if (snake1moveRight===true){
        snake1Head_newx = snake1ObjsArray[0].x + gridWidth;
        snake1Head_newy = snake1ObjsArray[0].y;
        snake1ObjsArray.unshift({x:snake1Head_newx, y:snake1Head_newy});
    }
    if (snake1moveLeft===true){
        snake1Head_newx = snake1ObjsArray[0].x - gridWidth;
        snake1Head_newy = snake1ObjsArray[0].y;
        snake1ObjsArray.unshift({x:snake1Head_newx, y:snake1Head_newy});
    }
    if (snake1moveUp===true){
        snake1Head_newx = snake1ObjsArray[0].x;
        snake1Head_newy = snake1ObjsArray[0].y - gridHeight;
        snake1ObjsArray.unshift({x:snake1Head_newx, y:snake1Head_newy});
    }
    if (snake1moveDown===true){
        snake1Head_newx = snake1ObjsArray[0].x;
        snake1Head_newy = snake1ObjsArray[0].y + gridHeight;
        snake1ObjsArray.unshift({x:snake1Head_newx, y:snake1Head_newy});
    }
}

function newsnake2Pos(){

    // snake2's new position after moving by "removing" tail and "extending" head
    // If snake2 grows, then tail is not "removed" while head extends for its new position   
    if(snake2Grows===false){
        snake2ObjsArray.pop(); 
    }

    // "extending" head
    if (snake2moveRight===true){
        snake2Head_newx = snake2ObjsArray[0].x + gridWidth;
        snake2Head_newy = snake2ObjsArray[0].y;
        snake2ObjsArray.unshift({x:snake2Head_newx, y:snake2Head_newy});
    }
    if (snake2moveLeft===true){
        snake2Head_newx = snake2ObjsArray[0].x - gridWidth;
        snake2Head_newy = snake2ObjsArray[0].y;
        snake2ObjsArray.unshift({x:snake2Head_newx, y:snake2Head_newy});
    }
    if (snake2moveUp===true){
        snake2Head_newx = snake2ObjsArray[0].x;
        snake2Head_newy = snake2ObjsArray[0].y - gridHeight;
        snake2ObjsArray.unshift({x:snake2Head_newx, y:snake2Head_newy});
    }
    if (snake2moveDown===true){
        snake2Head_newx = snake2ObjsArray[0].x;
        snake2Head_newy = snake2ObjsArray[0].y + gridHeight;
        snake2ObjsArray.unshift({x:snake2Head_newx, y:snake2Head_newy});
    }
}

function checkCollideWithWall(){
    if (snake1ObjsArray[0].x === (no_of_grids-1)*gridWidth && snake1moveRight === true ||
    snake1ObjsArray[0].x === 0 && snake1moveLeft === true || 
    snake1ObjsArray[0].y === 0 && snake1moveUp === true ||
    snake1ObjsArray[0].y === (no_of_grids-1)*gridHeight && snake1moveDown === true){
        snake1Gameover = true;
    } 

    if (snake2ObjsArray[0].x === (no_of_grids-1)*gridWidth && snake2moveRight === true ||
    snake2ObjsArray[0].x === 0 && snake2moveLeft === true || 
    snake2ObjsArray[0].y === 0 && snake2moveUp === true ||
    snake2ObjsArray[0].y === (no_of_grids-1)*gridHeight && snake2moveDown === true){
        snake2Gameover = true;
    } 
}

function checkCollideWithBody(){

    // collision with snake1 body
    for (let i=1; i<snake1ObjsArray.length; i++){
        if (snake1ObjsArray[i].x === snake1ObjsArray[0].x && snake1ObjsArray[i].y === snake1ObjsArray[0].y){
            snake1Gameover = true;
        }
        if (snake1ObjsArray[i].x === snake2ObjsArray[0].x && snake1ObjsArray[i].y === snake2ObjsArray[0].y){
            snake2Gameover = true;
        }
    } 
    
    // collision with snake2 body
    for (let i=1; i<snake2ObjsArray.length; i++){
        if (snake2ObjsArray[i].x === snake1ObjsArray[0].x && snake2ObjsArray[i].y === snake1ObjsArray[0].y){
            snake1Gameover = true;
        }
        if (snake2ObjsArray[i].x === snake2ObjsArray[0].x && snake2ObjsArray[i].y === snake2ObjsArray[0].y){
            snake2Gameover = true;
        }
    } 
    
    // collision of snake1 and snake2 heads 
    if (snake1ObjsArray[0].x === snake2ObjsArray[0].x && snake1ObjsArray[0].y === snake2ObjsArray[0].y){
        snake1Gameover = true;        
        snake2Gameover = true;
    }     
}

function gameOver(){
    if (snake1Gameover === true && snake2Gameover === false){
        //alert("GAME OVER");
        context.font = "40px Arial";
        context.fillStyle = "black";
        context.fillText("SNAKE2 WINS", 0.1*canvas.width, 0.5*canvas.height);         
        //document.location.reload();  // reload the current document
        clearInterval(interval); // stop game execution
    }

    if (snake2Gameover === true && snake1Gameover === false){
        //alert("GAME OVER");
        context.font = "40px Arial";
        context.fillStyle = "black";
        context.fillText("SNAKE1 WINS", 0.1*canvas.width, 0.5*canvas.height);         
        //document.location.reload();  // reload the current document
        clearInterval(interval); // stop game execution
    }

    if (snake1Gameover && snake2Gameover){
        //alert("GAME OVER");
        context.font = "40px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        if (snake1ObjsArray.length>snake2ObjsArray.length){
            context.fillText("SNAKE1 WINS", 0.5*canvas.width, 0.5*canvas.height); 
        }
        else if (snake2ObjsArray.length>snake1ObjsArray.length){
            context.fillText("SNAKE2 WINS", 0.5*canvas.width, 0.5*canvas.height); 
        }
        else{
            context.fillText("DRAW", 0.5*canvas.width, 0.5*canvas.height); 
        }                
        //document.location.reload();  // reload the current document
        clearInterval(interval); // stop game execution
    }


}

function keyDownHandler(e){

    // snake1 keys
    if ((e.key === "ArrowRight" || e.key === "Right") && snake1moveLeft === false){
        snake1moveRight = true;
        snake1moveLeft = false;
        snake1moveUp = false;
        snake1moveDown = false;
    }
    if ((e.key === "ArrowLeft" || e.key === "Left") && snake1moveRight === false){
        snake1moveRight = false;
        snake1moveLeft = true;
        snake1moveUp = false;
        snake1moveDown = false;
    }
    if ((e.key === "ArrowUp" || e.key === "Up") && snake1moveDown === false){
        snake1moveRight = false;
        snake1moveLeft = false;
        snake1moveUp = true;
        snake1moveDown = false;
    }
    if ((e.key === "ArrowDown" || e.key === "Down") && snake1moveUp === false){
        snake1moveRight = false;
        snake1moveLeft = false;
        snake1moveUp = false;
        snake1moveDown = true;
    }

    // snake2 keys
    if ((e.key === "KeyD" ||e.key === "Keyd" || e.key === "D" || e.key === "d") && snake2moveLeft === false){
        snake2moveRight = true;
        snake2moveLeft = false;
        snake2moveUp = false;
        snake2moveDown = false;
    }
    if ((e.key === "KeyA" || e.key === "Keya" || e.key === "A" || e.key === "a") && snake2moveRight === false){
        snake2moveRight = false;
        snake2moveLeft = true;
        snake2moveUp = false;
        snake2moveDown = false;
    }
    if ((e.key === "KeyW" || e.key === "Keyw" || e.key === "W" || e.key === "w") && snake2moveDown === false){
        snake2moveRight = false;
        snake2moveLeft = false;
        snake2moveUp = true;
        snake2moveDown = false;
    }
    if ((e.key === "KeyS" || e.key === "Keys" || e.key === "S" || e.key === "s") && snake2moveUp === false){
        snake2moveRight = false;
        snake2moveLeft = false;
        snake2moveUp = false;
        snake2moveDown = true;
    }
}

// KeyUp will not change status to current movement of Up/Down/Left/Right, hence not required


function draw(){
    context.clearRect(0,0,canvas.width, canvas.height);
    drawsnake1();  // draw the snake1 current position
    drawsnake2();  // draw the snake2 current position
    drawFruit();  // draw the fruit
    checkCollideWithWall(); // check game status if game is over
    ifsnake1Grows(); // assess if snake1 grows
    ifsnake2Grows(); // assess if snake1 grows
    newsnake1Pos();  // calculate snake1's new position for next draw frame
    newsnake2Pos();  // calculate snake1's new position for next draw frame
    checkCollideWithBody() // check if snake1 head collides with body in its new position 
    gameOver(); // show gameover if game over   
}

// Event listeners
document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// calling draw function at every interval of gameSpeed*100 milliseconds
const interval = setInterval(draw, gameSpeed*100);
