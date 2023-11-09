document.querySelector('title').textContent = "Top Min"

// Declarations
let turn = 1
let tiles = document.querySelectorAll('.tile')
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
        this.map[minX][minY]
        this.foodPipsHeld = 0
        this.stamina = 70
        this.counter = 10
        this.position = {
            x: minX,
            y: minY,
            color: minColor
        }
    }
    test() {
        return this.map[minX][minY].textContent
    }
}
// Functions
function drawBoard() {
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
}
function spawnMin() {
    if(turn === 1) {
        const min1 = new Minikin(map, 2, 8, 'blue')
        activeMin = min1
    }
    else {
        const min2 = new Minikin(map, 20, 8, 'purple')
    }
    console.log(activeMin.test)
    drawBoard(activeMin.position.color)
}

// Page setup
spawnMin()
drawBoard()
