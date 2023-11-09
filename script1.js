document.querySelector('title').textContent = "Top Min"

// Declarations
let turn = 1
let round = 1
let tiles = document.querySelectorAll('.tile')
let displayTurn = document.querySelector('#turn')
let displayRound = document.querySelector('#round')
let displaysteps = document.querySelector('#steps')
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
function changeDisplay() {
    displayTurn.textContent = `Turn: ${turn}`
    displayRound.textContent = `Round: ${round}`
    displaysteps.textContent = `Steps Remaining: ${activeMin.stamina}`
}
function changeTurn() {
    if(turn === 1) {
        turn++
    }
    else {
        turn--
    }
    spawnMin()
    
}
function changeRound() {
    round++
    changeTurn()
    spawnMin()
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
    changeDisplay()
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
                map[activeMin.position.y][activeMin.position.x].textContent = 3
                map[activeMin.position.y - 1][activeMin.position.x].textContent = 4
                activeMin.position.y--
                activeMin.stamina--
                activeMin.counter--
                break;
            case '3':
                map[activeMin.position.y][activeMin.position.x].textContent = 2
                map[activeMin.position.y - 1][activeMin.position.x].textContent = 4                   
                activeMin.position.y--
                activeMin.stamina-- 
                activeMin.counter--
                break;
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
                activeMin.foodPips++
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
                    changeRound()
                }
                break;
            case '2':
                map[activeMin.position.y][activeMin.position.x].textContent = 3
                map[activeMin.position.y][activeMin.position.x + 1].textContent = 4
                activeMin.position.x++
                activeMin.stamina--
                activeMin.counter--
                break;
            case '3':
                map[activeMin.position.y][activeMin.position.x].textContent = 2
                map[activeMin.position.y][activeMin.position.x + 1].textContent = 4
                activeMin.position.x++
                activeMin.stamina--
                activeMin.counter--

                break;
            case '5':
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y][activeMin.position.x + 1].textContent = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y][activeMin.position.x + 1].textContent = 4
                }
                activeMin.position.x++
                activeMin.stamina--
                activeMin.counter--
                activeMin.foodPips++
                break;
        }
        drawBoard(activeMin.position.color)
    }
    // Down
    else if(keyCode === 83 || keyCode === 40) {
        switch(down) {
            case '2':
                map[activeMin.position.y][activeMin.position.x].textContent = 3
                map[activeMin.position.y + 1][activeMin.position.x].textContent = 4
                activeMin.position.y++
                activeMin.stamina--
                activeMin.counter--
                break;
            case '3':
                map[activeMin.position.y][activeMin.position.x].textContent = 2
                map[activeMin.position.y + 1][activeMin.position.x].textContent = 4
                activeMin.position.y++
                activeMin.stamina--
                activeMin.counter--
                break;
            case '5':
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y + 1][activeMin.position.x].textContent = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y + 1][activeMin.position.x].textContent = 4
                }
                activeMin.position.y++
                activeMin.stamina--
                activeMin.counter--
                activeMin.foodPips++
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
                map[activeMin.position.y][activeMin.position.x].textContent = 3
                map[activeMin.position.y][activeMin.position.x - 1].textContent = 4
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                break;
            case '3':
                map[activeMin.position.y][activeMin.position.x].textContent = 2
                map[activeMin.position.y][activeMin.position.x - 1].textContent = 4
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                break;
            case '5':
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x].textContent = 3
                    map[activeMin.position.y][activeMin.position.x - 1].textContent = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x].textContent = 2
                    map[activeMin.position.y][activeMin.position.x - 1].textContent = 4
                }
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                activeMin.foodPips++
                break;
        }
        drawBoard(activeMin.position.color)
    }
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

// Page setup
spawnMin()
drawBoard()

// Event Listeners
document.addEventListener('keydown', moveMin)
