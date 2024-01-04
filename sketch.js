let BoardOffsetX = 50
let BoardOffsetY = 100
let l1Img
let l2Img
let l3Img
let l4Img
let l5Img
let l6Img
let pointPos

function preload() {
  l1Img = loadImage('img/l1.jpg')
  l2Img = loadImage('img/l2.jpg')
  l3Img = loadImage('img/l3.jpg')
  l4Img = loadImage('img/l4.jpg')
  l5Img = loadImage('img/l5.jpg')
  l6Img = loadImage('img/l6.jpg')
}

function setup() {
  frameRate(60)
  createCanvas(500, 600).parent(document.getElementById('p5pos'))
  
  panelShape = createGraphics(80, 80);
  panelShape.rect(0, 0, 80, 80, 10);
  l1Img.mask(panelShape)
  l2Img.mask(panelShape)
  l3Img.mask(panelShape)
  l4Img.mask(panelShape)
  l5Img.mask(panelShape)
  l6Img.mask(panelShape)

  pointPos = 0
}

function draw() {
  update()
  drawImpl()
}

function update() {
  pointPos += 1
  if (pointPos >= 400) {
    pointPos = 0
  }
}

function drawImpl() {
  clear()
  drawTitle()
  drawBoard()
  drawPanels()
}

function drawTitle() {
  textFont('Impact')
  textSize(48)
  fill('#808080')
  text('▲ UNICORN GAME ▼', 52, 74)
  fill('#ffffff')
  text('▲ UNICORN GAME ▼', 52, 70)
}

function drawBoard() {
  stroke('#4a4a4a')
  strokeWeight(1)
  for (let i = 0; i < 5; ++i) {
    drawLine(0, i * 100, 400, i * 100)
    drawLine(i * 100, 0, i * 100, 400)
  }

  length = 200
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < length; ++j) {
      targetX = pointPos - j;
      if (targetX < 0) {
        targetX += 400
      }
      targetY = i * 100;
      targetColor = color(255, 255, 255, 255 * (1 - (Math.abs((0.5 * length) - j) / (0.5 * length))));
      stroke(targetColor)

      if (isValidPoint(targetX, targetY)) {
        if (isUnicBoard(targetX, targetY)) {
          strokeWeight(1)
        } else {
          strokeWeight(2)
        }
        drawPoint(targetX, targetY);
      }

      tmp = targetX
      targetX = targetY
      targetY = tmp
      if (isValidPoint(targetX, targetY)) {
        if (isUnicBoard(targetX, targetY)) {
          strokeWeight(1)
        } else {
          strokeWeight(2)
        }
        drawPoint(targetX, targetY)
      }
    }
  }
}

function isValidPoint(x, y) {
  return isInBoard(x, y)
}

function isInBoard(x, y) {
  return 0 <= targetX && targetX <= 400 &&
    0 <= targetY && targetY <= 400
}

function isUnicBoard(x, y) {
  margin = 1
  return 0 + margin <= targetX && targetX <= 200 - margin &&
    100 + margin <= targetY && targetY <= 300 - margin ||
    200 + margin <= targetX && targetX <= 400 - margin &&
    200 + margin <= targetY && targetY <= 400 - margin
}

function drawPanels() {
  noStroke()
  drawPanel(1, 3, 60, l1Img, '#93d7d8')
  drawPanel(3, 1, 66, l2Img, '#95d6ba')
  drawPanel(2, 0, 70, l3Img, '#f8e3a9')
  drawPanel(0, 0, 80, l4Img, '#f89c7f')
  drawPanelL(0, 1, 140, l5Img, '#779cb2')
  drawPanelL(2, 2, 170, l6Img, '#f595ae')
}

function drawPanel(i, j, size, img, color) {
  x = ((i * 100) - 1) + ((100 - size) * 0.5)
  y = ((j * 100) - 1) + ((100 - size) * 0.5)
  y -= 2
  fill(color)
  drawRect(x, y + 5, size, size, size * 0.125)
  drawImage(img, x, y, size, size)
}

function drawPanelL(i, j, size, img, color) {
  x = ((i * 100) - 1) + ((200 - size) * 0.5)
  y = ((j * 100) - 1) + ((200 - size) * 0.5) 
  y -= 4
  fill(color)
  drawRect(x, y + 8, size, size, size * 0.125)
  drawImage(img, x, y, size, size)
}

function drawPoint(x, y) {
  point(x + BoardOffsetX, y + BoardOffsetY)
}

function drawLine(x1, y1, x2, y2) {
  line(x1 + BoardOffsetX, y1 + BoardOffsetY, x2 + BoardOffsetX, y2 + BoardOffsetY)
}

function drawRect(x, y, w, h, r) {
  rect(x + BoardOffsetX, y + BoardOffsetY, w, h, r)
}

function drawImage(img, x, y, w, h) {
  image(img, x + BoardOffsetX, y + BoardOffsetY, w, h)
}
