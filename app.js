// ********** Global Variables **********

const state = {
    "score": 0,
    "board": [],
    "direction": {
        "col": 1,
        "row": 0,
    },
    "snakeBody": [ [3, 6], [2, 6], [1, 6], [0, 6] ],
}

state.snakeHead = state.snakeBody[0];

const fps = 3
const boardSpaces = 13

// ********** DOM Selectors **********

let boardElement = document.getElementById("board")
let scoreElement = document.getElementById("score")
let gameOverElement = document.getElementById("gameOver")
let startElement = document.getElementById("startElement")
let playAgainElement = document.getElementById("playAgainElement")

// ********** innerHTML Lines **********

function pressButtonStart () {
    setInterval (tick, 1000 / fps) 
}

const start = () => {
    startElement.innerHTML = "Start Game!"
    document.body.appendChild(startElement)
    startElement.addEventListener("click", pressButtonStart)
    startElement.addEventListener("click", increaseSpeed)
}

// Each click will increase the speed by fps variable by 3.
const increaseSpeed = () => {
    if (startElement.innerHTML === "Start Game!") {
    startElement.innerHTML = "Press to Increase Speed!"
    }
}

const playAgain = () => {
    playAgainElement.innerHTML = "Play Again?"
    document.body.appendChild(playAgainElement)
    playAgainElement.addEventListener("click", newGame)
}

const score = () => {
    if (state.snakeHead === "food") {
        state.score++
        scoreElement.innerHTML = `<div>Score: ${state.score}</div>`
        state.snakeBody.push()
        // Somehow extend snake body by 1
        food()
    }
}

function gameOverParameters() {
    if (state.board[0] < 0 || state.board[0] > boardSpaces || state.board[1] < 0 || state.board[1] > boardSpaces) {
        gameOver()
    }
    // if (state.snakeBody.includes(state.snakeHead)) {
    //     gameOver()
    // }
}

function gameOver () {
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

function renderBoard () {
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
            // const coords = [i,j]
            // state.snakeBody.includes(coords) || 
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

// ********** Snake **********

const setInitialSnake = () => {
    let snake = state.snakeBody
    // console.log(snake)
    for (let i = 0; i < state.snakeBody.length; i++) {
        let position = state.snakeBody[i]
        // console.log(position)
        // console.log(state.board)
        state.board[position[0]][position[1]] = "snake"
    }
    renderBoard()
}

const playerSnake = () => {
    state.snakeBody.pop()
    const newSnakeHeadCol = state.snakeHead[0] + state.direction.col
    const newSnakeHeadRow = state.snakeHead[1] + state.direction.row
    state.snakeHead = [newSnakeHeadCol, newSnakeHeadRow]
    state.snakeBody.unshift(state.snakeHead)
    renderState()
}


// Food is still able to appear on snake

const food = () => {
    let appleColumn = Math.floor(Math.random() * boardSpaces)
    let appleRow = Math.floor(Math.random() * boardSpaces)
    console.log (appleRow, appleColumn)
    state.board[[appleRow][appleColumn]] = "food"
    renderBoard()
    // if (state.snakeBody.includes("food")) {
    //     food()
    // }
    
}


const renderState = () => {
    state.board = []
    state.score = 0
    buildState ()
    score ()
    renderBoard()
    setInitialSnake ()
    gameOverParameters()
}

// ********** Logic ********** 

function tick () {
    console.log(tick)
    playerSnake ()
    renderBoard ()
}


// ********** Game opening Functions **********

function newGame () {
    clearInterval(setInterval)
    const state = {
        "score": 0,
        "board": [],
        "direction": {
            "col": 1,
            "row": 0,
        },
        "snakeBody": [ [3, 6], [2, 6], [1, 6], [0, 6] ],
    }
    buildState ()
    setInitialSnake()
    food()
    start ()
}

newGame()

// ********** Event Listeners for Movement **********

document.addEventListener("keydown", function (event) {
    // console.log(event.code)
    if (event.key === "ArrowLeft" && !(state.direction.col === 0 && state.direction.row === 1)) {
        // console.log("Left arrow pressed")
        state.direction.col = 0
        state.direction.row = -1
        // console.log(state.direction)
    } else if (event.key === "ArrowUp" && !(state.direction.col === 1 && state.direction.row === 0)) {
        // console.log("Up arrow pressed")
        state.direction.col = -1
        state.direction.row = 0
        // console.log(state.direction)
    } else if (event.key === "ArrowRight" && !(state.direction.col === 0 && state.direction.row === -1)) {
        // console.log("Right arrow pressed")
        state.direction.col = 0
        state.direction.row = 1
        // console.log(state.direction)
    } else if (event.key === "ArrowDown" && !(state.direction.col === -1 && state.direction.row === 0)) {
        // console.log("Down arrow pressed")
        state.direction.col = 1
        state.direction.row = 0
        // console.log(state.direction)
    }
})