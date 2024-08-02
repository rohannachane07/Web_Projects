//Game Constants & Variables
let inputDir={x: 0, y: 0}; //start me snake pause rahenga
const foodSound= new Audio('Songs/food.mp3');
const gameOverSound= new Audio('Songs/gameover.mp3');
const moveSound=new Audio('Songs/move.mp3');
const musicSound= new Audio('Songs/music.mp3');

let baseSpeed=6;
let speedIncrement=1;
let speed=baseSpeed;
let score=0;
let lastPaintTime=0;
let isMusicPlaying = false;


let snakeArr=[
    {x:13 , y:15}   // initial position of the snake in a grid-based game.We took an array because the snake is made up of multiple segments (or parts). Each segment of the snake needs to be individually represented and managed. 
]

food= {x:6, y:7}; //Not an array because there is only one piece of food at any given time.  
//Game Functions
function main(ctime){                       //currentTime
    window.requestAnimationFrame(main);
     if((ctime-lastPaintTime)/1000 < 1/speed)
         {
             return;
        }
         lastPaintTime=ctime;
         gameEngine();
    //console.log(ctime)
}

function isCollide(snake){
    //If you bump into yourself
    for(let i=1;i<snakeArr.length; i++)
        {
         if(snake[i].x === snake[0].x && snake[i].y === snake[0].y )  //checks if the x-coordinate of the current segment (snake[i]) is the same as the x-coordinate of the head (snake[0]).
            {                                                         //and checks if the y-coordinate of the current segment (snake[i]) is the same as the y-coordinate of the head (snake[0]).
                return true;
            }
        }
        //if you bump into the wall
         if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y<=0)
        {
               return true;
        }
    }



function gameEngine()
{
    //Part 1: Updating the Snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0 , y:0};
        alert("Game Over.Press any key to play again!");
        snakeArr=[{x:13, y:15}];
        musicSound.play();
        score=0;
        speed=baseSpeed;
    }


    //If you have eaten the food,increment the score and regenerate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;

         // Increase speed after every 5 points
         if (score % 5 === 0) {
            speed += speedIncrement;
            console.log("Speed increased to:", speed);
        }
        if(score>hiscoreval)
            {
                hiscoreval=score;
                localStorage.setItem("hiscore",JSON.stringify(hiscoreval)); //Data stored in local storage remains even after the browser is closed and reopened.It provides a simple way to store key-value pairs.
                                                                            //Local storage can only store strings.JSON.stringify converts the hiscoreval (which might be a number, object, or array) into a JSON string.
                HighScore.innerHTML= "HighScore: " + hiscoreval;
            }
        Score.innerHTML="Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});  //This creates a new object representing the new position of the snake's head after it moves.snakeArr[0].x + inputDir.x: Calculates the new x position of the head.
                                                                                           //snakeArr[0].y + inputDir.y: Calculates the new y position of the head.
                                                                                           //snakeArr.unshift(...): Adds this new head position to the beginning of snakeArr 
        let a=2;
        let b=16;
        food ={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)* Math.random())}; //e.g= Math.random() generates 0.5, a + (b - a) * 0.5 calculates to 2 + (16 - 2) * 0.5 = 2 + 14 * 0.5 = 2 + 7 = 9.Math.round(9) rounds to 9.  
    }

    








    //Moving the Snake
    for(let i=snakeArr.length-2; i>=0;i--)
        {
            const element=snakeArr[i];  //Store the current segment in a constant named element.
            snakeArr[i+1]={...snakeArr[i]}; //Copy the position of the current segment to the next segment.

        }
        snakeArr[0].x+= inputDir.x;
        snakeArr[0].y+= inputDir.y;





    //Part 2: Render/Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{      
              snakeElement.classList.add('snake');
            }
        board.appendChild(snakeElement);
    });

    //Part 3: Disply the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//Main Logic starts here
musicSound.play();
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
    {
        hiscoreval=0;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    }
    else
    {
      hiscoreval=JSON.parse(hiscore);
      HighScore.innerHTML= "HighScore: " + hiscore;
    }

    function startGame() 
    {
        console.log("Key pressed. Starting game...");
        // Start the music
        if (!isMusicPlaying) {
            console.log("Attempting to play music...");
            musicSound.play().then(() => {
                console.log("Music started playing.");
            }).catch(error => {
                console.error("Failed to play music:", error);
            });
            isMusicPlaying = true;
        }
    
    
window.requestAnimationFrame(main);


window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game,we can give variable name as snakeVelocity also.


    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":    
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        
         case "ArrowRight":
               console.log("ArrowRight")
               inputDir.x= 1;
               inputDir.y= 0;
               break;
        
          default:
               break;
    }
});
    }

// Add an event listener to start the game on the first key press
window.addEventListener('keydown', startGame);


