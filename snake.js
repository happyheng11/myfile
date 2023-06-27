const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

const no_of_grids = 20;
const gridWidth = canvas.width / no_of_grids;
const gridHeight = canvas.height / no_of_grids;

let snakeObjsArray = [
    {x:3*gridWidth, y:3*gridHeight},
    {x:2*gridWidth, y:3*gridHeight},
    {x:1*gridWidth, y:3*gridHeight},
];

let snakeHead = [{x:3*gridWidth, y:3*gridHeight}];
let snakeHead_newx = 3*gridWidth+gridWidth;
let snakeHead_newy = 3*gridHeight;

let snakeGrows = false;

let moveRight = true;
let moveLeft = false;
let moveUp = false;
let moveDown = false;

let generatefruit = true;
let fruitx = 0;
let fruity = 0;

const gameSpeed = 1;
let gameover = false;
let score = 0;
let timer = 120;

function drawSnake(){

    // Draw snake
    for (let i=0; i<1; i++){
        context.beginPath();
        context.fillStyle = "blue";
        context.rect(snakeObjsArray[i].x, snakeObjsArray[i].y, gridWidth, gridHeight);
        context.fill();
        //context.strokeStyle = "rgb(21,100,150)";
        //context.rect(snakeObjsArray[i].x+gridWidth/5, snakeObjsArray[i].y+gridHeight/5, gridWidth*3/5, gridHeight*3/5);
        //context.lineWidth = 3;
        //context.stroke();
        context.closePath(); 
    }    
    for (let i=1; i<snakeObjsArray.length; i++){
        context.beginPath();
        context.fillStyle = "blue";
        context.rect(snakeObjsArray[i].x, snakeObjsArray[i].y, gridWidth, gridHeight);
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

        let startforloop = true;

        while(startforloop){

            // generate fruit
            fruitx = (Math.floor(Math.random()*no_of_grids))*gridWidth;
            fruity = (Math.floor(Math.random()*no_of_grids))*gridHeight;
            
            for(i=0; i<snakeObjsArray.length; i++){
                // check if whole snake's position != generated fruit's position, then generated fruit is ok.    
                // else, loop back to generate fruit at random location again and check the generated fruit position again.
                if(fruitx != snakeObjsArray[i].x && fruity != snakeObjsArray[i].y){
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

function ifSnakeGrows(){
    if (snakeObjsArray[0].x === fruitx && snakeObjsArray[0].y === fruity){
        snakeGrows = true;
        generatefruit = true;
    }
    else{
        snakeGrows = false;
    }
}

function newSnakePos(){

    // Snake's new position after moving by "removing" tail and "extending" head
    // If snake grows, then tail is not "removed" while head extends for its new position   
    if(snakeGrows===false){
        snakeObjsArray.pop(); 
    }

    // "extending" head
    if (moveRight===true){
        snakeHead_newx = snakeObjsArray[0].x + gridWidth;
        snakeHead_newy = snakeObjsArray[0].y;
        snakeObjsArray.unshift({x:snakeHead_newx, y:snakeHead_newy});
    }
    if (moveLeft===true){
        snakeHead_newx = snakeObjsArray[0].x - gridWidth;
        snakeHead_newy = snakeObjsArray[0].y;
        snakeObjsArray.unshift({x:snakeHead_newx, y:snakeHead_newy});
    }
    if (moveUp===true){
        snakeHead_newx = snakeObjsArray[0].x;
        snakeHead_newy = snakeObjsArray[0].y - gridHeight;
        snakeObjsArray.unshift({x:snakeHead_newx, y:snakeHead_newy});
    }
    if (moveDown===true){
        snakeHead_newx = snakeObjsArray[0].x;
        snakeHead_newy = snakeObjsArray[0].y + gridHeight;
        snakeObjsArray.unshift({x:snakeHead_newx, y:snakeHead_newy});
    }
}

function checkCollideWithWall(){
    if (snakeObjsArray[0].x === (no_of_grids-1)*gridWidth && moveRight === true ||
    snakeObjsArray[0].x === 0 && moveLeft === true || 
    snakeObjsArray[0].y === 0 && moveUp === true ||
    snakeObjsArray[0].y === (no_of_grids-1)*gridHeight && moveDown === true){
        gameover = true;
    } 
}

function checkCollideWithBody(){
    for (let i=1; i<snakeObjsArray.length; i++){
        if (snakeObjsArray[i].x === snakeObjsArray[0].x && snakeObjsArray[i].y === snakeObjsArray[0].y){
            gameover = true;
        }
    }    
}

function gameOver(){
    if (gameover){
        //alert("GAME OVER");
        context.font = "40px Arial";
        context.fillStyle = "rgb(2, 154, 247)";
        context.fillText("GAME OVER", 0.1*canvas.width, 0.5*canvas.height);         
        //document.location.reload();  // reload the current document
        clearInterval(interval); // stop game execution
    }
}

function keyDownHandler(e){
    if ((e.key === "ArrowRight" || e.key === "Right") && moveLeft === false){
        moveRight = true;
        moveLeft = false;
        moveUp = false;
        moveDown = false;
    }
    if ((e.key === "ArrowLeft" || e.key === "Left") && moveRight === false){
        moveRight = false;
        moveLeft = true;
        moveUp = false;
        moveDown = false;
    }
    if ((e.key === "ArrowUp" || e.key === "Up") && moveDown === false){
        moveRight = false;
        moveLeft = false;
        moveUp = true;
        moveDown = false;
    }
    if ((e.key === "ArrowDown" || e.key === "Down") && moveUp === false){
        moveRight = false;
        moveLeft = false;
        moveUp = false;
        moveDown = true;
    }
}

// KeyUp will not change status to current movement of Up/Down/Left/Right, hence not required


function draw(){
    context.clearRect(0,0,canvas.width, canvas.height);
    drawSnake();  // draw the snake current position
    drawFruit();  // draw the fruit
    checkCollideWithWall(); // check game status if game is over
    ifSnakeGrows(); // assess if snake grows
    newSnakePos();  // calculate snake's new position for next draw frame
    checkCollideWithBody() // check if snake head collides with body in its new position 
    gameOver(); // show gameover if game over   
}

// Event listeners
document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// calling draw function at every interval of gameSpeed*100 milliseconds
const interval = setInterval(draw, gameSpeed*100);
