document.querySelector('title').textContent = "Top Min"

// Declarations
const tileW = 20
const tileH = 20
const gridRows = 30
const gridCols = 30
const canvas = document.querySelector('#board')
const cvCtx = canvas.getContext('2d')
const tiles = document.querySelector('#tile-borders')
const tbCtx = tbCtx.getContext('2d')
const ui = document.querySelector('#ui')
const uiCtx = uiCtx.getContext('#2d')
// Create layout of map.
// 0 = Walls (Gray)
// 1 = Nest 1 (Brown)
// 2 = Tile 1 (Yellow)
// 3 = Tile 2 (Orange)
// 4 = Min 1/Min 2 (Blue/Purple)
// 5 = Food pip (Red)
const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0,0],
    [1,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,1],
    [0,0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,0,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

