document.querySelector('title').textContent = "Top Min"

// Declarations
let activeMin
let turn = 1
let rounds = 5

const blockSize = 25
const border = 1

const canvas = document.querySelector('#board')
const cvCtx = canvas.getContext('2d')
const tiles = document.querySelector('#tile-borders')
const tbCtx = tiles.getContext('2d')
const ui = document.querySelector('#ui')
const uiCtx = ui.getContext('#2d')
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
    [3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3],
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
class Nest {
    constructor(map, nestX, nestY, nestColor) {
        this.map = map
        this.position = {
            x: nestX,
            y: nestY,
            color: nestColor
        }
        this.map[nestY][nestX] = 1
        this.active = false
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
function drawMap(minColor, nestColor) {
    for(let x = 0; x < map.length; x++) {
        for(let y = 0; y < map[x].length; y++) {
            const blockType = map[x][y]
            let color = 'transparent'
            switch(blockType) {
                case 0:
                    color = 'pink'
                break;
                case 1:
                    color = nestColor
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
                map[activeMin.position.y][activeMin.position.x] = 2
                activeMin.switchState()
                spawnMin()
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
                map[activeMin.position.y][activeMin.position.x] = 2
                activeMin.switchState()
                spawnMin()
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
        turn++
    }
    else {
        const minikin2 = new Minikin(map, 20, 8, 'purple')
        minikin2.switchState()
        activeMin = minikin2
        drawMap(activeMin.position.color)
        turn = 1       
    }
}

// Page startup
spawnMin()
const nest1 = new Nest(map, 0, 8, 'blue', 'brown')
const nest2 = new Nest(map, 22, 8, 'purple', 'brown')

// Event Listeners
if(activeMin) {
document.addEventListener('keydown', moveMin)
}