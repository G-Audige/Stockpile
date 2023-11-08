document.querySelector('title').textContent = "Top Min"

// Declarations
let activeMin
let turn = 1
let rounds = 5
let round = 1
let nest1 = 0
let nest2 = 0

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
let map = [
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
let freshMap = map 

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
        this.stamina = 70
        this.counter = 10       
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
    uiCtx.fillRect(0,0,700,700)
    uiCtx.fillStyle = 'white'
    uiCtx.fillText(`Turn ${turn}`, 20, 30)
    uiCtx.font = '24px Verdana'
    uiCtx.fillText(` Round ${round}`, 250, 30)
    uiCtx.font = '16px Verdana'
    uiCtx.fillText(` Food Pips: ${activeMin.foodPips}`, 490, 80)
    uiCtx.fillText(` Steps Remaining: ${activeMin.stamina}`, 10, 80)
    uiCtx.fillText(`Blue's Nest Hoard`, 10, 560)
    uiCtx.fillText(`Purple's Nest Hoard`, 450, 560)
    uiCtx.font = '24px Verdana'
    uiCtx.fillText(nest1, 10, 600)
    uiCtx.fillText(nest2, 450, 600)
    }
}

function moveMin({keyCode}) {
    let upDir = map[activeMin.position.y - 1][activeMin.position.x]
    let downDir = map[activeMin.position.y + 1][activeMin.position.x]
    let rightDir = map[activeMin.position.y][activeMin.position.x + 1]
    let leftDir = map[activeMin.position.y][activeMin.position.x - 1]
    let sides = [upDir, downDir, rightDir, leftDir]
    // Up
    if(keyCode === 87 || keyCode === 38) {
        switch(upDir) {
            case 2:
                map[activeMin.position.y][activeMin.position.x] = 3
                map[activeMin.position.y - 1][activeMin.position.x] = 4
                activeMin.position.y--
                activeMin.stamina--
                activeMin.counter--
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y - 1][activeMin.position.x] = 4      
                activeMin.position.y--
                activeMin.stamina-- 
                activeMin.counter--
                break;
            case 5:
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x] = 3
                    map[activeMin.position.y - 1][activeMin.position.x] = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x] = 2
                    map[activeMin.position.y - 1][activeMin.position.x] = 4 
                }
                activeMin.position.y--
                activeMin.stamina-- 
                activeMin.counter--
                activeMin.foodPips++
                break;
        }
        if(activeMin.counter === 0) {
            activeMin.counter = 10
            checkPips()
        }      
        if(activeMin.stamina === 0) {
            Math.floor(activeMin.foodPips /= 2)
            if(sides.includes(2)) {
                map[activeMin.position.y][activeMin.position.x] = 2
            }
            else if (sides.includes(3)){
                map[activeMin.position.y][activeMin.position.x] = 3
            }
            if(turn === 2){
                changeRound()
            }
            else {
                changeTurn()
            }
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
                activeMin.stamina--
                activeMin.counter--
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y][activeMin.position.x + 1] = 4
                activeMin.position.x++
                activeMin.stamina--
                activeMin.counter--

                break;
            case 5:
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x] = 3
                    map[activeMin.position.y][activeMin.position.x + 1] = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x] = 2
                    map[activeMin.position.y][activeMin.position.x + 1] = 4
                }
                activeMin.position.x++
                activeMin.stamina--
                activeMin.counter--
                activeMin.foodPips++
                break;
        }
        if(activeMin.counter === 0) {
            activeMin.counter = 10
            checkPips()
        }
        if(activeMin.stamina === 0) {
            Math.floor(activeMin.foodPips /= 2)
            if(sides.includes(2)) {
                map[activeMin.position.y][activeMin.position.x] = 2
            }
            else if (sides.includes(3)){
                map[activeMin.position.y][activeMin.position.x] = 3
            }
            if(turn === 2){
                changeRound()
            }
            else {
                changeTurn()
            }
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
                activeMin.stamina--
                activeMin.counter--
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y + 1][activeMin.position.x] = 4
                activeMin.position.y++
                activeMin.stamina--
                activeMin.counter--
                break;
            case 5:
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x] = 3
                    map[activeMin.position.y + 1][activeMin.position.x] = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x] = 2
                    map[activeMin.position.y + 1][activeMin.position.x] = 4
                }
                activeMin.position.y++
                activeMin.stamina--
                activeMin.counter--
                activeMin.foodPips++
                break;
        }
        if(activeMin.counter === 0) {
            activeMin.counter = 10
            checkPips()
        }
        if(activeMin.stamina === 0) {
            Math.floor(activeMin.foodPips /= 2)
            if(sides.includes(2)) {
                map[activeMin.position.y][activeMin.position.x] = 2
            }
            else if (sides.includes(3)){
                map[activeMin.position.y][activeMin.position.x] = 3
            }
            if(turn === 2){
                changeRound()
            }
            else {
                changeTurn()
            }
        }
        drawMap(activeMin.position.color) 
    }
    // Left
    else if(keyCode === 65 || keyCode === 37) {
        switch(leftDir) {
            case 1:
                if(turn === 1) {
                map[activeMin.position.y][activeMin.position.x] = 2
                changeTurn()
            }
                break;
            case 2:
                map[activeMin.position.y][activeMin.position.x] = 3
                map[activeMin.position.y][activeMin.position.x - 1] = 4
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                break;
            case 3:
                map[activeMin.position.y][activeMin.position.x] = 2
                map[activeMin.position.y][activeMin.position.x - 1] = 4
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                break;
            case 5:
                if(sides.includes(2)) {
                    map[activeMin.position.y][activeMin.position.x] = 3
                    map[activeMin.position.y][activeMin.position.x - 1] = 4
                }
                else if (sides.includes(3)){
                    map[activeMin.position.y][activeMin.position.x] = 2
                    map[activeMin.position.y][activeMin.position.x - 1] = 4
                }
                activeMin.position.x--
                activeMin.stamina--
                activeMin.counter--
                activeMin.foodPips++
                break;
        }
        if(activeMin.counter === 0) {
            activeMin.counter = 10
            checkPips()
        }
        if(activeMin.stamina === 0) {
            Math.floor(activeMin.foodPips /= 2)
            if(sides.includes(2)) {
                map[activeMin.position.y][activeMin.position.x] = 2
            }
            else if (sides.includes(3)){
                map[activeMin.position.y][activeMin.position.x] = 3
            }
            if(turn === 2){
                changeRound()
            }
            else {
                changeTurn()
            }
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
function changeTurn() {
    if(turn === 1){
        turn++
        nest1 += activeMin.foodPips
    }
    else {
        nest2 += activeMin.foodPips
        turn--
    }
    
    activeMin.switchState()
    spawnMin()
}
function changeRound() {
    round++
    changeTurn()
    spawnMin()
}
function spawnPips() {
    for(let i = 5; i > 0; i--) {
        let x = Math.floor(Math.random() * map.length)
        let y = Math.floor(Math.random() * map[0].length)
        let sprout = map[x][y]
        if(sprout === 2 || sprout === 3) {
            map[x][y] = 5
            drawMap(activeMin.position.color)
        }
    }
    checkPips()
    // console.log(map[Math.floor(Math.random)])
}
function checkPips() {
    let pipCount = 0
    for(let x = 0; x < map.length; x++) {
        for(let y = 0; y < map[x].length; y++) {
            if(map[x][y] === 5) {
                pipCount++
            }                      
        }
    }
    if(pipCount <= 3) {
        spawnPips()
    }
}

// Page startup
spawnMin()
spawnPips()

// Event Listeners
if(activeMin) {
document.addEventListener('keydown', moveMin)
}