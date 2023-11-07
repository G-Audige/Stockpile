document.querySelector('title').textContent = "Top Min"

// Declarations
let activeMin
let turn = 1
let rounds = 5
let round = 1

const blockSize = 25
const border = 1

const canvas = document.querySelector('#board')
const cvCtx = canvas.getContext('2d')
const tiles = document.querySelector('#tile-borders')
const tbCtx = tiles.getContext('2d')
const ui = document.querySelector('#ui')
const uiCtx = ui.getContext('2d')
// Create layout of map.
    // 0 = Walls (Gray)
    // 1 = Nest 1 (Brown)
    // 2 = Tile 1 (Yellow)
    // 3 = Tile 2 (Orange)
    // 4 = Min 1/Min 2 (Blue/Purple)
    // 5 = Food pip (Red)
const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0],
    [0,0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0,0],
    [1,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,1],
    [0,0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0,0],
    [0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

// Classes and objects
class Minikin {
    constructor(map, minX, minY, minColor) {
        this.map = map      
        this.position = {
            x: minX,
            y: minY,
            color: minColor
        }
        this.map[minY][minX] = 4
        this.active = false
        this.foodPips = 0
        this.storage = []        
    }
    switchState() {
        if(this.active) {
            this.active = false
        }
        else {
            this.active = true
        }
    } 
}

// Functions
function drawMap(minColor) {
    for(let x = 0; x < map.length; x++) {
        for(let y = 0; y < map[x].length; y++) {
            const blockType = map[x][y]
            let color = 'transparent'
            switch(blockType) {
                case 0:
                    color = 'pink'
                break;
                case 1:
                    color = 'brown'
                break;
                case 2:
                    color = 'yellow'
                break;
                case 3:
                    color = 'orange'
                break;
                case 4:
                    color = minColor
                break;
                case 5:
                    color = 'red'
                break;
            }
            tbCtx.fillStyle = color
            tbCtx.fillRect(y * (blockSize + border), x * (blockSize + border), blockSize, blockSize)
        }
    uiCtx.font = '20px Verdana'
    uiCtx.fillStyle = 'black'
    uiCtx.fillRect(0,0,500,500)
    uiCtx.fillStyle = 'white'
    uiCtx.fillText(`Turn ${turn}`, 20, 30)
    uiCtx.fillText(` Round ${round}`, 260, 30)
    uiCtx.font = '16px Verdana'
    uiCtx.fillText(` Food Pips: ${activeMin.foodPips}`, 500, 80)
    }
}

function moveMin({keyCode}) {
    let upDir = map[activeMin.position.y - 1][activeMin.position.x]
    let downDir = map[activeMin.position.y + 1][activeMin.position.x]
    let rightDir = map[activeMin.position.y][activeMin.position.x + 1]
    let leftDir = map[activeMin.position.y][activeMin.position.x - 1]
    // Up
    if(keyCode === 87 || keyCode === 38) {
        switch(upDir) {
            case 2:
                map[activeMin.position.y][activeMin.position.x] = 3
                map[activeMin.position.y - 1][activeMin.position.x] = 4
                activeMin.position.y--
            break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y - 1][activeMin.position.x] = 4
                activeMin.position.y-- 
            break;
        }
        drawMap(activeMin.position.color) 
    }
    // Right
    else if(keyCode === 68 || keyCode === 39) {
        switch(rightDir) {
            case 1:
                if(turn === 2) {
                    map[activeMin.position.y][activeMin.position.x] = 2
                    changeRound()
                }
                break;
            case 2:
                map[activeMin.position.y][activeMin.position.x] = 3
                map[activeMin.position.y][activeMin.position.x + 1] = 4
                activeMin.position.x++
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y][activeMin.position.x + 1] = 4
                activeMin.position.x++
                break;
            
        }
        drawMap(activeMin.position.color) 
    }
    // Down
    else if(keyCode === 83 || keyCode === 40) {
        switch(downDir) {
            case 2:
                map[activeMin.position.y][activeMin.position.x] = 3
                map[activeMin.position.y + 1][activeMin.position.x] = 4
                activeMin.position.y++
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y + 1][activeMin.position.x] = 4
                activeMin.position.y++
                break;
        }
        drawMap(activeMin.position.color) 
    }
    // Left
    else if(keyCode === 65 || keyCode === 37) {
        switch(leftDir) {
            case 1:
                if(turn === 1) {
                map[activeMin.position.y][activeMin.position.x] = 2
                changeturn()
            }
                break;
            case 2:
                map[activeMin.position.y][activeMin.position.x] = 3
                map[activeMin.position.y][activeMin.position.x - 1] = 4
                activeMin.position.x--
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y][activeMin.position.x - 1] = 4
                activeMin.position.x--
                break;
        }
        drawMap(activeMin.position.color) 
    }
}

function spawnMin() {
    if(turn === 1) {
        const minikin1 = new Minikin(map, 2, 8, 'blue')
        minikin1.switchState()
        activeMin = minikin1
        drawMap(activeMin.position.color)
    }
    else {
        const minikin2 = new Minikin(map, 20, 8, 'purple')
        minikin2.switchState()
        activeMin = minikin2
        drawMap(activeMin.position.color)      
    }
}

function changeturn() {
    if(turn === 1){
        turn++
    }
    else {
        turn--
    }
    console.log("It is turn", turn)
    
    activeMin.switchState()
    spawnMin()
}
function changeRound() {
    round++
    console.log("It is round", round)
    changeturn()
    spawnMin()
}

// Page startup
spawnMin()

// Event Listeners
if(activeMin) {
document.addEventListener('keydown', moveMin)
}