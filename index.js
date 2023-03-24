const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './images/Ribelle_Town.png'

const playerImage = new Image()
playerImage.src = './images/playerDown.png'

class Sprite {
  constructor({
    position,
    velocity,
    image
  }) {
    this.position = position
    this.image = image
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: -65,
    y: -650
  },
  image: image
})

const keys = {
  z: {
    pressed: false
  },
  q: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },
  arrowUp: {
    pressed: false
  },
  arrowDown: {
    pressed: false
  },
  arrowLeft: {
    pressed: false
  },
  arrowRight: {
    pressed: false
  }
}

function animate() {
  window.requestAnimationFrame(animate)
  background.draw()
  c.drawImage(playerImage,
    0, //?
    0, //?
    playerImage.width / 4, //?
    playerImage.height, //? Crop the image
    canvas.width / 2 - (playerImage.width / 4) / 2, //* 
    canvas.height / 2 - playerImage.height / 2, //* 
    playerImage.width / 4, //*
    playerImage.height, //* actual position
  )

  if (keys.z.pressed || keys.arrowUp.pressed) {
    background.position.y += 3
  }
  if (keys.s.pressed || keys.arrowDown.pressed) {
    background.position.y -= 3
  }
  if (keys.q.pressed || keys.arrowLeft.pressed) {
    background.position.x += 3
  }
  if (keys.d.pressed || keys.arrowRight.pressed) {
    background.position.x -= 3
  }
}
animate()

let lastKey = ''

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'z':
      keys.z.pressed = true
      lastKey = 'z'
      break;
    case 'q':
      keys.q.pressed = true
      lastKey = 'q'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
    case 'ArrowUp':
      keys.arrowUp.pressed = true
      lastKey = 'ArrowUp'
      break
    case 'ArrowDown':
      keys.arrowDown.pressed = true
      lastKey = 'ArrowDown'
      break
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true
      lastKey = 'ArrowLeft'
      break
    case 'ArrowRight':
      keys.arrowRight.pressed = true
      lastKey = 'ArrowRight'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'z':
      keys.z.pressed = false
      break;
    case 'q':
      keys.q.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case 'ArrowUp':
      keys.arrowUp.pressed = false
      break
    case 'ArrowDown':
      keys.arrowDown.pressed = false
      break
    case 'ArrowLeft':
      keys.arrowLeft.pressed = false
      break
    case 'ArrowRight':
      keys.arrowRight.pressed = false
      break
  }
})