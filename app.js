// ********** Global Variables **********

const state = {
    "score": 0,
    "direction": {
        "x": 0,
        "y": 1,
    }
    "snakeBody": {
        head1: [3,6],
        body1: [2,6],
        body2: [1,6],
        body3: [0,6],
    }
}
const fps = 3
const boardSpaces = 13
// const snakeBody = [ [3, 6], [2, 6], [1, 6], [0, 6] ]
const snakeHead = snakeBody [0]

// ********** DOM Selectors **********

let boardElement = document.getElementById("board")
let scoreElement = document.getElementById("score")
let startElement = document.createElement("BUTTON")
let playAgainElement = document.createElement("BUTTON")
let gameOverElement = document.getElementById("gameOver")

// ********** innerHTML Lines **********

function score () {
    if (snakeHead === "food") {
        state.score++;
        scoreElement.innerHTML = `<div>Score: ${state.score}</div>`;
    }
}

const start = () => {
    startElement.innerHTML = "Start Game!"
    document.body.appendChild(startElement)
    startElement.addEventListener("click", tick)
}

const playAgain = () => {
    playAgainElement.innerHTML = "Play Again?"
    document.body.appendChild(playAgainElement)
    playAgainElement.addEventListener("click", resetState)
}

const gameOver = () => {
    gameOverElement.innerHTML = `<div>Game Over. Your final score is ${state.score}. <br> Would you like to play again?</div>`
}

// ********** Board Items **********

function buildState () {
    state.board = []
    for (let i = 0; i < boardSpaces; i++) {
        let row = []
        for (let j = 0; j < boardSpaces; j++) {
            row.push("")
        }
        state.board.push(row)
    }
    console.log(state.board)
}


function renderState () {
    boardElement.innerHTML = ""
    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board.length; j++) {
            let tile = state.board[i][j]
            let tileElement = document.createElement("div")
            tileElement.innerText = tile
            tileElement.classList.add("tile")
            if (tile === "food") {
                tileElement.classList.add("food")
                tileElement.classList.remove("tile")
                tileElement.innerText = ""
            }
            if (tile === "snake") {
                tileElement.classList.add("snake")
                tileElement.classList.remove("tile")
                tileElement.innerText = ""
            }
            tileElement.dataset.index = [i, j]
            boardElement.appendChild(tileElement)
        }
    }
}

const gameOverParameters = () => {
    if (snakeHead === [-1,true] || [true, -1] || [boardSpaces.length, true] [true, boardSpaces.length]) {
        //Some sort of Game over screen
        gameOver()
    }
    if (snakeBody.includes(snakeHead)) {
        //Some sort of Game over screen
        gameOver()
    }
}

// ********** Snake **********

function setInitialSnake () {
    let snake = snakeBody.body
    // console.log(snake)
    for (let i = 0; i < snakeBody.length; i++) {
        let position = snakeBody[i]
        // console.log(position)
        // console.log(state.board)
        state.board[position[0]][position[1]] = "snake"
    }
    renderState()
}


// Snake will become a function
// Array of Arrays for Snake body
// We will UNSHIFT the new direction and POP the tail



// When the first move is made, initilize this function

const playerSnake = () => {
    let currentSnakeBody = snakeBody.pop()
    console.log(currentSnakeBody)
    currentSnakeBody = currentSnakeBody.unshift()
}

playerSnake()



function food () {
    let appleColumn = Math.floor(Math.random() * boardSpaces)
    let appleRow = Math.floor(Math.random() * boardSpaces)
    state.board[appleRow][appleColumn] = "food"
    if ("food" == "snake" ) {
        food()
    }
    console.log (appleRow, appleColumn)
    renderState()
}




const resetState = () => {
    state.board = []
    state.score = 0
    buildState ()
    score ()
    start ()
    renderState()
    setInitialSnake ()
    food ()
    playAgain ()
}


resetState ()




// ********** Logic ********** 

// Time Function

function tick () {
    console.log(tick)
    renderState ()
}

// setInterval (tick, 1000 / fps) 



document.addEventListener("keydown", function (event) {
    console.log(event.code)
    if (event.key === "ArrowLeft" || event.key === "a" ) {
        // console.log("Left arrow pressed")
        state.direction.x = -1
        state.direction.y = 0
        console.log(state)
    } else if (event.key === "ArrowUp" || event.key === "w") {
        // console.log("Up arrow pressed")
        state.direction.x = 0
        state.direction.y = 1
        console.log(state)
    } else if (event.key === "ArrowRight" || event.key === "d") {
        // console.log("Right arrow pressed")
        state.direction.x = 1
        state.direction.y = 0
        console.log(state)
    } else if (event.key === "ArrowDown" || event.key === "s") {
        // console.log("Down arrow pressed")
        state.direction.x = 0
        state.direction.y = -1
        console.log(state)
    }
}
)
