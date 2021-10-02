let initialState = {}


// Array of Arrays for Snake body
// We will UNSHIFT the new direction and POP the tail
let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0],
}

let currentGameState = {
    apple: [11, 8],
    snake: snake,
}

function buildInitialState () {
    initialState.board = []
    for (let i = 0; i < 195; i++) {
        let row = []
        for (let j = 0; j < 195; j++) {
            row.push("")
        }
        initialState.board.push(row)
    }
    console.log(initialState.board)
}



let boardElement = document.getElementById("board")

function renderState () {
    for (let i = 0; i < initialState.board.length; i++) {
        let tile = initialState.board[i]
        let tileElement = document.createElement("div")
        tileElement.classList.add("tile")
        tileElement.dataset.index = i
        boardElement.appendChild(tileElement)
    }
}



buildInitialState ()
renderState()









// function renderState () {

// }

// function onBoardClick () {

//     renderState()
// }

// $(`.board`).on(`click`, onBoardClick);









// Time Function

// function tick () {

//     renderState ()
// }

// setInterval (tick, 1000 / 30) 





// Action Function

// $(window).on(`keydown`, function (event) {

// snake.addEventListener('onkeydown', function (event) {
//     let ----- Add next direction to Snake Head
// })

// })