document.querySelector('title').textContent = "Stockpile"

// Declarations
const maxRounds = 5

let activeMin
let turn = 1
let round = 1
let nest1 = 0
let nest2 = 0

const tiles = document.querySelectorAll('.tile')
let displayTurn = document.querySelector('#turn')
let displayRound = document.querySelector('#round')
let displaySteps = document.querySelector('#steps')
let displayPips = document.querySelector('#pips')
let displayHoard1 = document.querySelector('#nest1')
let displayHoard2 = document.querySelector('#nest2')
let gameScreen = document.querySelector('#board')
let startScreen = document.querySelector('#start-game')
let transitionScreen = document.querySelector('#round-transition')
let tally = document.querySelector('#pip-tally')
let finalResults = document.querySelector('#end-tally')
let endScreen = document.querySelector('#end-game')
let winner = document.querySelector('#winner')

let row1 = document.querySelector('#row1').children
let row2 = document.querySelector('#row2').children
let row3 = document.querySelector('#row3').children
let row4 = document.querySelector('#row4').children
let row5 = document.querySelector('#row5').children
let row6 = document.querySelector('#row6').children
let row7 = document.querySelector('#row7').children
let row8 = document.querySelector('#row8').children
let row9 = document.querySelector('#row9').children
let row10 = document.querySelector('#row10').children
let row11 = document.querySelector('#row11').children
let row12 = document.querySelector('#row12').children
let row13 = document.querySelector('#row13').children
let row14 = document.querySelector('#row14').children
let row15 = document.querySelector('#row15').children
let row16 = document.querySelector('#row16').children
let row17 = document.querySelector('#row17').children
let freshTiles = []
let map = [
    row1,
    row2,
    row3,
    row4,
    row5,
    row6,
    row7,
    row8,
    row9,
    row10,
    row11,
    row12,
    row13,
    row14,
    row15,
    row16,
    row17
]

// Classes and objects
class Minikin {
    constructor(map, minX, minY, minColor) {
        this.map = map
        this.map[minY][minX].textContent = 4
        this.foodPipsHeld = 0
        this.stamina = 70
        this.counter = 10
        this.position = {
            x: minX,
            y: minY,
            color: minColor
        }
    }
}

// Functions
function changeTurn() {
    if(turn === 1) {
        depositPips()
        turn++       
    }
    else {
        turn--      
    } 
    spawnMin()  
}
function changeRound() {
    if(round < maxRounds){
        round++
        depositPips()
        showTransitionScreen()     
    }
    else {
        depositPips()
        endGame()
    }
}
function checkPips() {
    let pipCount = 0
    for(let x = 0; x < map.length; x++) {
        for(let y = 0; y < map[x].length; y++) {
            if(map[x][y].textContent == 5) {
                pipCount++
            }                      
        }
    }
    if(pipCount <= 3) {
        spawnPips()
    }
}
function clearBoard() {   
    for(let i = 0; i < tiles.length; i++){
        tiles[i].textContent = freshTiles[i]
    }
}
function depositPips() {
    if(turn === 1) {
        nest1 += activeMin.foodPipsHeld
    }
    else {
        nest2 += activeMin.foodPipsHeld 
    }
}
function drawBoard(minColor) {
    tiles.forEach( tile => {
        if(tile.textContent == 0) {
            tile.style.backgroundColor = 'pink'
        }
        if(tile.textContent == 1) {
            tile.style.backgroundColor = 'brown'
        }
        if(tile.textContent == 2) {
            tile.style.backgroundColor = 'yellow'
        }
        if(tile.textContent == 3) {
            tile.style.backgroundColor = 'orange'
        }
        if(tile.textContent == 4) {
            tile.style.backgroundColor = minColor
        }
        if(tile.textContent == 5) {
            tile.style.backgroundColor = 'red'
        }
    })
    updateDisplay()
}
function endGame() {
    activeMin = null
    showEndScreen()
}
function moveMin({keyCode}) {
    let up = map[activeMin.position.y - 1][activeMin.position.x].textContent
    let down = map[activeMin.position.y + 1][activeMin.position.x].textContent
    let right = map[activeMin.position.y][activeMin.position.x + 1].textContent
    let left = map[activeMin.position.y][activeMin.position.x - 1].textContent
    let sides = [up, down, right, left]
    // Up
    if(keyCode === 87 || keyCode === 38) {
        switch(up) {
            case '2':
            case '3':
            case '5':
                if(sides.includes('2')) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y - 1][activeMin.position.x].textContent = 4
                }
                else if (sides.includes('3')){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y - 1][activeMin.position.x].textContent = 4 
                }
                activeMin.position.y--
                activeMin.stamina-- 
                activeMin.counter--
                if(up == 5)
                activeMin.foodPipsHeld++
                break;
        }
        drawBoard(activeMin.position.color) 
    }   
    // Right
    else if(keyCode === 68 || keyCode === 39) {
        switch(right) {
            case '1':
                if(turn === 2) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    drawBoard('green')
                    changeRound()         
                }
                break;
            case '2':
            case '3':
            case '5':
                if(sides.includes('2')) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y][activeMin.position.x + 1].textContent = 4
                }
                else if (sides.includes('3')){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y][activeMin.position.x + 1].textContent = 4
                }
                activeMin.position.x++
                activeMin.stamina--
                activeMin.counter--
                if(right == 5)
                activeMin.foodPipsHeld++
                drawBoard(activeMin.position.color)
                break;
        }      
    }
    // Down
    else if(keyCode === 83 || keyCode === 40) {
        switch(down) {
            case '2':
            case '3':
            case '5':
                if(sides.includes('2')) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y + 1][activeMin.position.x].textContent = 4
                }
                else if (sides.includes('3')){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y + 1][activeMin.position.x].textContent = 4
                }
                activeMin.position.y++
                activeMin.stamina--
                activeMin.counter--
                if(down == 5)
                activeMin.foodPipsHeld++
                break;
        }
        drawBoard(activeMin.position.color)
    }
    // Left
    else if(keyCode === 65 || keyCode === 37) {
        switch(left) {
            case '1':
                if(turn === 1) {
                map[activeMin.position.y][activeMin.position.x].textContent = 2
                changeTurn()
            }
            break;
            case '2':
            case '3':
            case '5':
                if(sides.includes('2')) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y][activeMin.position.x - 1].textContent = 4
                }
                else if (sides.includes('3')){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y][activeMin.position.x - 1].textContent = 4
                }
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                if(left == 5)
                activeMin.foodPipsHeld++
                break;
        }
        drawBoard(activeMin.position.color)
    }
    if(activeMin !== null) {
        if(activeMin.counter === 0) {
        activeMin.counter = 10
        checkPips()
        }
        if(activeMin.stamina === 0) {
            Math.floor(activeMin.foodPipsHeld /= 2)
            if(sides.includes('2')) {
                map[activeMin.position.y][activeMin.position.x].textContent = 2
            }
            else if (sides.includes('3')){
                map[activeMin.position.y][activeMin.position.x].textContent = 3
            }
            if(turn === 2){
                changeRound()
            }
            else {
                changeTurn()
            }
        }
    }
    
    
}
function resetGame() {
    turn = 1
    round = 1
    nest1 = 0
    nest2 = 0
    clearBoard()
    endScreen.style.display = 'none'
    showStartScreen()
}
function showEndScreen() {
    gameScreen.style.display = 'none'
    endScreen.style.display = 'inline'
    finalResults.textContent = `The score is ${nest1} to ${nest2}.`
    if(nest1 > nest2) {
        winner.textContent = "Blue the Bountiful is the new Top Min!"
    }
    else if(nest2 > nest1) {
        winner.textContent = "Purple the Prosperous is the new Top Min!"
    }
    else {
        winner.textContent = "Finding their hoards to be equal, Blue and Purple both vow to come out on top next year."
    }
}
function showStartScreen() {
    startScreen.style.display = 'inline'
}
function showTransitionScreen() {
    activeMin = null 
    gameScreen.style.display = 'none'
    tally.textContent = `The score is ${nest1} to ${nest2}.`
    transitionScreen.style.display = 'inline'
}
function spawnMin() {
    if(turn === 1) {
        const min1 = new Minikin(map, 2, 8, 'blue')
        activeMin = min1
    }
    else {
        const min2 = new Minikin(map, 20, 8, 'purple')
        activeMin = min2
    }
    drawBoard(activeMin.position.color)
}
function spawnPips() {
    for(let i = 5; i > 0; i--) {
        let x = Math.floor(Math.random() * map.length)
        let y = Math.floor(Math.random() * map[0].length)
        let sprout = map[x][y].textContent
        if(sprout == 2 || sprout == 3) {            
            map[x][y].textContent = 5
            drawBoard(activeMin.position.color)
        }
    }
    checkPips()
}
function startGame() {
    startScreen.style.display = 'none'
    gameScreen.style.display = 'inline'
    spawnMin()
    checkPips()
}
function transitionRound() {
    transitionScreen.style.display = 'none'
    gameScreen.style.display = 'inline'
    changeTurn()
    spawnMin()
}
function updateDisplay() {
    displayTurn.textContent = `Turn: ${turn}`
    displayRound.textContent = `Round: ${round}`
    displaySteps.textContent = `Steps Remaining: ${activeMin.stamina}`
    displayPips.textContent = `Food Pips: ${activeMin.foodPipsHeld}`
    displayHoard1.textContent = nest1
    displayHoard2.textContent = nest2
}

// Page setup
tiles.forEach( tile => {
    freshTiles.push(tile.textContent)
})

// Event Listeners
document.addEventListener('keydown', moveMin)