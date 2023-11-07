document.querySelector('title').textContent = "Top Min"

// Declarations
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
        this.map[minY][minX] = 4
        // this.current = false
        this.currentMin = {
            x: minX,
            y: minY,
            color: minColor,
        }
    }
    switchState() {
        if(this.current) {
            this.current = false
        }
        else {
            this.current = true
        }
        return this.current
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
    }
}

// function moveMin(e) {
//     // Up
//     if(e.keyCode === 87 || e.keyCode == 38) {
//         if(map[minikin1.currentMin.y - 1][minikin1.currentMin.x] > 1) {
//             if(map[minikin1.currentMin.y - 1][minikin1.currentMin.x] = 2)
//             map[minikin1.currentMin.y][minikin1.currentMin.x] = 2
//             map[minikin1.currentMin.y - 1][minikin1.currentMin.x] = 4
//             minikin1.currentMin.y--
//             drawMap(minikin1.currentMin.color)
//         }
//         console.log(keyCode)
//     }
//     // Right
//     // Down
//     // Left
// }



// Event Listeners
document.addEventListener('keydown', moveMin())

// Page startup
const minikin1 = new Minikin(map, 4, 5, 'blue')
drawMap(minikin1.currentMin.color)