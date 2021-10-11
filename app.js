// ********** State **********

let state = {
    "score": 0,
    "board": [],
    "gameInterval": null,
    "food": [],
    "direction": {
        "col": 1,
        "row": 0,
    },
    "snakeBody": [ [3, 6], [2, 6], [1, 6], [0, 6] ],
}

// ********** DOM Selectors **********

let boardElement = document.getElementById("board")
let scoreElement = document.getElementById("score")
let gameOverElement = document.getElementById("gameOver")
let startElement = document.getElementById("startElement")
let playAgainElement = document.getElementById("playAgainElement")

// ********** Constant Variables **********

const fps = 5
const boardSpaces = 13
state.snakeHead = state.snakeBody[0];

// ********** innerHTML Lines **********

const pressButtonStart = () => {
    state.gameInterval = setInterval(tick, 1000 / fps)
}

const start = () => {
    startElement.innerHTML = "Start Game!"
    document.body.appendChild(startElement)
    startElement.addEventListener("click", pressButtonStart)
    startElement.addEventListener("click", inactiveStartElement)
}

const playAgain = () => {
    playAgainElement.innerHTML = "Play Again?"
    document.body.appendChild(playAgainElement)
}

const score = () => {
    let snakeHeadx = state.snakeHead[0]
    let snakeHeady = state.snakeHead[1]
    if (snakeHeadx === "food"[0] && snakeHeady === "food"[1]) {
        state.score++
        scoreElement.innerHTML = `<div>Score: ${state.score}</div>`
        // Keep removed element from playerSnake pop
        // state.snakeBody.push()
        food()
    }
}

function gameOverParameters() {
    // console.log(state.snakeHead)
    let snakeHeadx = state.snakeHead[0]
    let snakeHeady = state.snakeHead[1]
    for (let i = 1; i < state.snakeBody.length; i++) {
        let deathCheck = state.snakeBody[i]
        if (snakeHeadx === deathCheck[0] && snakeHeady === deathCheck[1]) {
            clearInterval(state.gameInterval)
            gameOver()
        }
    }
    if (positionOutOfBounds(state.snakeHead[0], state.snakeHead[1])) {
        clearInterval(state.gameInterval)
        gameOver()
    }
}

function gameOver () {
    state.gameInterval = null
    inactiveGameOver()
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

// ********** Food **********

// Food is still able to appear on snake
// Food class is lost after render. Unknown how to keep it in state.

function food () {
    let appleRow = Math.floor(Math.random() * boardSpaces)
    let appleColumn = Math.floor(Math.random() * boardSpaces)
    console.log (appleRow, appleColumn)
    state.board[appleRow][appleColumn] = "food"
    renderBoard()
}

// ********** Snake **********

const setInitialSnake = () => {
    let snake = state.snakeBody
    // console.log(snake)
    for (let i = 0; i < state.snakeBody.length; i++) {
        let position = state.snakeBody[i]
        // console.log(position)
        if (!positionOutOfBounds(position[0], position[1])) state.board[position[0]][position[1]] = "snake"
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

// ********** Helper Functions **********

function inactiveStartElement () {
    startElement.classList.add("inactive")
}

function inactiveGameOver () {
    gameOverElement.classList.remove("inactive")
}

const positionOutOfBounds = (x, y) => {
    return (x < 0 || x > boardSpaces - 1 || y < 0 || y > boardSpaces - 1)
}

// ********** Page Render - Ticks - Set Interval Results ********** 

const renderState = () => {
    state.board = []
    state.score = 0
    state.food = "food"
    buildState ()
    score ()
    renderBoard()
    setInitialSnake ()
    gameOverParameters()
}

function tick () {
    // console.log(tick)
    renderBoard ()
    playerSnake ()
}

// ********** Game opening Functions **********

function newGame () {
    clearInterval(state.gameInterval)
    state = {
        "score": 0,
        "board": [],
        "food": [],
        "gameInterval": null,
        "direction": {
            "col": 1,
            "row": 0,
        },
        "snakeBody": [ [3, 6], [2, 6], [1, 6], [0, 6] ],
    }
    state.snakeHead = state.snakeBody[0],
    buildState ()
    food()
    setInitialSnake()
    startElement.classList.remove("inactive")
    gameOverElement.classList.add("inactive")
    start ()
}

// ********** Event Listeners **********

playAgainElement.addEventListener("click", newGame)

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

// ********** Game Start! **********

newGame()