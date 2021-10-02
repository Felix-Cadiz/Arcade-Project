let initialState = {}

function buildInitialState () {

}

function renderState () {

}

function onBoardClick () {

    renderState()
}

$(`.board`).on(`click`, onBoardClick);

function tick () {

    renderState ()
}

setInterval (tick, 1000 / 30) 

$(window).on(`keydown`, function (event) {

    
})