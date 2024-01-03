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
  createCanvas(600, 600).parent(document.getElementById('p5pos'))
  
  shape = createGraphics(80, 80);
  shape.rect(0, 0, 80, 80, 10);
  l1Img.mask(shape)
  l2Img.mask(shape)
  l3Img.mask(shape)
  l4Img.mask(shape)
  l5Img.mask(shape)
  l6Img.mask(shape)

  pointPos = 0
}

function draw() {
  update()
  drawImpl()
}

function keyPressed() {
}

function mousePressed() { 
}

function touchStarted() {
}

function update() {
  pointPos += 1
  if (pointPos >= 400) {
    pointPos = 0
  }
}

function drawImpl() {
  clear()

  textFont('Impact')
  textSize(48)
  fill('#808080')
  text('▲ UNICORN GAME ▼', 102, 74)
  fill('#ffffff')
  text('▲ UNICORN GAME ▼', 102, 70)

  stroke('#4a4a4a')
  strokeWeight(1)
  for (let i = 1; i <= 5; ++i) {
    line(100, i * 100, 500, i * 100)
    line(i * 100, 100, i * 100, 500)
  }

  length = 200
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < length; ++j) {
      targetX = pointPos - j + 100;
      if (targetX < 100) {
        targetX += 400
      }
      targetY = (i * 100) + 100;
      targetColor = color(255, 255, 255, 255 * (1 - (Math.abs((0.5 * length) - j) / (0.5 * length))));
      stroke(targetColor)

      if (isValidPoint(targetX, targetY)) {
        if (isUnicBoard(targetX, targetY)) {
          strokeWeight(1)
        } else {
          strokeWeight(2)
        }
        point(targetX, targetY);
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
        point(targetX, targetY)
      }
    }
  }

  noStroke()
  drawPanel(1, 3, 60, l1Img, '#93d7d8')
  drawPanel(3, 1, 66, l2Img, '#95d6ba')
  drawPanel(2, 0, 70, l3Img, '#f8e3a9')
  drawPanel(0, 0, 80, l4Img, '#f89c7f')
  drawPanelL(0, 1, 140, l5Img, '#779cb2')
  drawPanelL(2, 2, 170, l6Img, '#fff3f0')
}

function isValidPoint(x, y) {
  return isInBoard(x, y)
}

function isInBoard(x, y) {
  return 100 <= targetX && targetX <= 500 &&
    100 <= targetY && targetY <= 500
}

function isUnicBoard(x, y) {
  margin = 1
  return 100 + margin <= targetX && targetX <= 300 - margin &&
    200 + margin <= targetY && targetY <= 400 - margin ||
    300 + margin <= targetX && targetX <= 500 - margin &&
    300 + margin <= targetY && targetY <= 500 - margin
}

function drawPanel(i, j, size, img, color) {
  x = ((i * 100) - 1) + ((100 - size) * 0.5)
  y = ((j * 100) - 1) + ((100 - size) * 0.5)
  y -= 2
  x += 100
  y += 100
  fill(color)
  rect(x, y + 5, size, size, size * 0.125)
  image(img, x, y, size, size)
}

function drawPanelL(i, j, size, img, color) {
  x = ((i * 100) - 1) + ((200 - size) * 0.5)
  y = ((j * 100) - 1) + ((200 - size) * 0.5) 
  y -= 4
  x += 100
  y += 100
  fill(color)
  rect(x, y + 8, size, size, size * 0.125)
  image(img, x, y, size, size)
}
