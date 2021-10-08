let state = {}
const fps = 5
const boardSpaces = 13

const resetState = () => {
    state.board = []
    buildState ()
    renderState()
    food ()
    state.score = 0
}


let boardElement = document.getElementById("board")
let scoreElement = document.getElementById("score")
let startElement = document.createElement("BUTTON")


function score () {
    scoreElement.innerHTML = `<div>${state.score}</div>`
}


const start = () => {
    startElement.innerHTML = "Start Game!"
    document.body.appendChild(startElement)
    startElement.addEventListener("click", resetState)
}



function setInitialSnake () {
    let snake = snakeInitial.body
    // console.log(snake)
    for (let i = 0; i < snakeInitial.body.length; i++) {
        let position = snakeInitial.body[i]
        // console.log(position)
        // console.log(state.board)
        state.board[position[0]][position[1]] = "snake"
    }
    renderState()
}


// Snake will become a function
// Array of Arrays for Snake body
// We will UNSHIFT the new direction and POP the tail

const snakeInitial = {
    body: [ [0, 6], [1, 6], [2, 6], [3, 6] ],
}


function food () {
    let appleXAxis = Math.floor(Math.random() * boardSpaces)
    let appleYAxis = Math.floor(Math.random() * boardSpaces)
    state.board[appleYAxis][appleXAxis] = "food"
    console.log (appleXAxis, appleYAxis)
    renderState()
}


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


resetState ()
start ()
score ()
setInitialSnake ()










// function onBoardClick () {

//     renderState()
// }

// $(`.board`).on(`click`, onBoardClick);






// Time Function

function tick () {
    console.log(tick)
    renderState ()
}


document.addEventListener("keydown", function (event) {
    console.log(event.key)
})

// setInterval (tick, 1000 / fps) 


// Action Function

// $(window).on(`keydown`, function (event) {

// snake.addEventListener('onkeydown', function (event) {
//     let ----- Add next direction to Snake Head
// })

// })