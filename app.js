const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
let xDirection = -2
let yDirection = 2
let timerId
let score = 0

const userStart = [205, 10]
let currentPosition = userStart

const ballStart = [295, 20]
let ballCurrentPosition = ballStart

//create block class
class Block{
    constructor(x,y){
        this.bottomLeft = [x,y]
        this.bottomRight = [x+blockWidth, y]
        this.topLeft = [x, y+blockHeight]
        this.topRight = [x+blockWidth, y+blockHeight]
    }
}
//all my blocks
const blocks = [
    new Block(2, 270),
    new Block(103, 270),
    new Block(205, 270),
    new Block(306, 270),
    new Block(408, 270),
    new Block(509, 270),

    new Block(2, 248),
    new Block(103, 248),
    new Block(205, 248),
    new Block(306, 248),
    new Block(408, 248),
    new Block(509, 248),

    new Block(2, 227),
    new Block(103, 227),
    new Block(205, 227),
    new Block(306, 227),
    new Block(408, 227),
    new Block(509, 227)

]

const colors = ['pink', '#5EE3F6AD' ,'#1DF626AD', 'red', 'yellow']

//draw all my blocks
function addBlocks() {
    let j = 0
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        block.style.backgroundColor = colors[j]
        grid.appendChild(block)
        if( (i+1) % 6 === 0){
            j++;
        }

    }
}

addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
user.style.left = currentPosition[0] + 'px'
user.style.bottom = currentPosition[1] + 'px'
grid.appendChild(user)

//draw the user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//move user
function moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if( currentPosition[0] > 5 ) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if( currentPosition[0] < 405) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)


const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
ball.style.left = ballCurrentPosition[0] + 'px'
ball.style.bottom = ballCurrentPosition[1] + 'px'

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move the ball
function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] +=yDirection;
    drawBall();
    checkForCollisions()
}

document.getElementById("button").addEventListener("click", myFunction)
function myFunction(){
    timerId = setInterval(moveBall, 15)
}

//check for collisions
function checkForCollisions(){
    //check for block collisions
    for( let i = 0; i < blocks.length; i++){
        if((ballCurrentPosition[0] > blocks[i].bottomLeft[0])
            && (ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1])
            && (ballCurrentPosition[1] < blocks[i].topLeft[1])){

            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            //check for win
            if(score === 18){
                scoreDisplay.innerHTML = 'You have won !'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }

        }
    }

    //check for wall collisions
    if(ballCurrentPosition[0] >= (611 - ballDiameter) ||
        ballCurrentPosition[1] >=(300 - ballDiameter)){
        changeDirection()
    }
    if(ballCurrentPosition[0] <= ballDiameter ){
        changeDirection()
    }

    //check for user collisions
    if(ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < (currentPosition[0] + 200) &&
        ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition[1] < (currentPosition[1] + 10)){
        changeDirection()
    }

    //check for game over
    if( ballCurrentPosition[1] <= 0 ){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'you have lost'
        removeEventListener('keydown', moveUser)
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }

    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }

    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }

    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}