document.querySelector('title').textContent = "Top Min"

// Declarations
let activeMin
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
        document.addEventListener('keydown', this.moveMin)
    }
    switchState() {
        if(this.active) {
            this.active = false
        }
        else {
            this.active = true
        }
    }
    moveMin = ({keyCode}) => {
        console.log("The keyCode is", keyCode)
        let footprints = this.map[this.position.y][this.position.x]
        let upDir = this.map[this.position.y - 1][this.position.x]
        let downDir = this.map[this.position.y + 1][this.position.x]
        let rightDir = this.map[this.position.y][this.position.x + 1]
        let leftDir = this.map[this.position.y][this.position.x - 1]
        // Up
        if(keyCode === 87 || keyCode === 38) {
            switch(upDir) {
                case 2:
                    footprints = 3
                    upDir = 4
                    this.position.y--
                    this.drawMap(this.position.color) 
                break;
                case 3:
                    footprints = 2
                    upDir = 4
                    this.position.y--
                    this.drawMap(this.position.color) 
                break;
            }
            this.drawMap(this.position.color) 
        }
        // Right
        else if(keyCode === 68 || keyCode === 39) {
            switch(rightDir) {
                case 2:
                    footprints = 3
                    rightDir = 4
                    this.position.x++
                    this.drawMap(this.position.color) 
                    break;
                case 3:
                    footprints = 2
                    rightDir = 4
                    this.position.x++
                    this.drawMap(this.position.color) 
                    break;
            }
            this.drawMap(this.position.color) 
        }
        // Down
        else if(keyCode === 83 || keyCode === 40) {
            switch(downDir) {
                case 2:
                    footprints = 3
                    downDir = 4
                    this.position.y++
                    this.drawMap(this.position.color) 
                    break;
                case 3:
                    footprints = 2
                    downDir = 4
                    this.position.y++
                    this.drawMap(this.position.color) 
                    break;
            }
            this.drawMap(this.position.color) 
        }
        // Left
        else if(keyCode === 65 || keyCode === 37) {
            switch(leftDir) {
                case 2:
                    footprints = 3
                    leftDir = 4
                    this.position.x--
                    this.drawMap(this.position.color) 
                    break;
                case 3:
                    footprints = 2
                    leftDir = 4
                    this.position.x--
                    this.drawMap(this.position.color) 
                    break;
            }
            this.drawMap(this.position.color) 
        }
    }
    drawMap(minColor) {
        for(let x = 0; x < this.map.length; x++) {
            for(let y = 0; y < this.map[x].length; y++) {
                const blockType = this.map[x][y]
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
        }
    }
}

// Functions
// function drawMap(minColor) {
//     for(let x = 0; x < map.length; x++) {
//         for(let y = 0; y < map[x].length; y++) {
//             const blockType = map[x][y]
//             let color = 'transparent'
//             switch(blockType) {
//                 case 0:
//                     color = 'pink'
//                 break;
//                 case 1:
//                     color = 'brown'
//                 break;
//                 case 2:
//                     color = 'yellow'
//                 break;
//                 case 3:
//                     color = 'orange'
//                 break;
//                 case 4:
//                     color = minColor
//                 break;
//                 case 5:
//                     color = 'red'
//                 break;
//             }
//             tbCtx.fillStyle = color
//             tbCtx.fillRect(y * (blockSize + border), x * (blockSize + border), blockSize, blockSize)
//         }
//     }
// }


// Event Listeners
// document.addEventListener('keydown', function(e) {
//     const placement = map[activeMin.y][activeMin.x]
//     const upDir = map[activeMin.y - 1][activeMin.x]
//     const downDir = map[activeMin.y + 1][activeMin.x]
//     const rightDir = map[activeMin.y][activeMin.x + 1]
//     const leftDir = map[activeMin.y][activeMin.x - 1]
//     // Up
//     if(e.key === 'w' || e.key == 'ArrowUp') {
//         console.log(e.key)
//         switch(upDir) {
//             case 0: {
//                 placement = 0
//                 upDir = 4
//                 minikin1.currentMin.y--
//                 drawMap(minikin1.currentMin.color)
//             }  
//             break;
//         }
//     }
//     // Right
//     // Down
//     // Left
// })

// Page startup
const minikin1 = new Minikin(map, 2, 8, 'blue')
// const minikin2 = new Minikin(map, 20, 8, 'purple')
activeMin = minikin1
activeMin.drawMap(activeMin.position.color)