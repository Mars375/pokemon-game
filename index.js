
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Collision map

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

// Create boundaries
const boundaries = []

const offset = {
  x: -640,
  y: -710
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(new Boundary({
        position: {
          x: j * Boundary.width + offset.x,
          y: i * Boundary.height + offset.y
        }
      })
      )
    }
  })
})

// Load images
const image = new Image()
image.src = './images/Ribelle_Town.png'

const foregroundImage = new Image()
foregroundImage.src = './images/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './images/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './images/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './images/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './images/playerRight.png'

// Create player
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
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

const movables = [background, ...boundaries, foreground]

function playerCollision({
  player,
  obstacle
}) {
  return (player.position.x + player.width >= obstacle.position.x
    && player.position.x <= obstacle.position.x + obstacle.width / 1.2
    && player.position.y + player.height >= obstacle.position.y
    && player.position.y <= obstacle.position.y + obstacle.height / 15)
}

//Map design
function animate() {
  window.requestAnimationFrame(animate)
  background.draw()
  boundaries.forEach(boundary => {
    boundary.draw()
  })
  player.draw()
  foreground.draw()

  let moving = true
  player.moving = false
  if (keys.z.pressed || keys.arrowUp.pressed) {
    player.moving = true
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (playerCollision({
        player,
        obstacle: {
          ...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        }
      })) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += 3
      })
    }
  }
  if (keys.s.pressed || keys.arrowDown.pressed) {
    player.moving = true
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (playerCollision({
        player,
        obstacle: {
          ...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }
        }
      })) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
    }
  }
  if (keys.q.pressed || keys.arrowLeft.pressed) {
    player.moving = true
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (playerCollision({
        player,
        obstacle: {
          ...boundary, position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      })) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 3
      })
    }
  }
  if (keys.d.pressed || keys.arrowRight.pressed) {
    player.moving = true
    player.image = player.sprites.right
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (playerCollision({
        player,
        obstacle: {
          ...boundary, position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
      })) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
    }
  }
}
animate()

// Keyboard detection

// let lastKey = ''
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'z':
      keys.z.pressed = true
      // lastKey = 'z'
      break;
    case 'q':
      keys.q.pressed = true
      // lastKey = 'q'
      break
    case 's':
      keys.s.pressed = true
      // lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      // lastKey = 'd'
      break
    case 'ArrowUp':
      keys.arrowUp.pressed = true
      // lastKey = 'ArrowUp'
      break
    case 'ArrowDown':
      keys.arrowDown.pressed = true
      // lastKey = 'ArrowDown'
      break
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true
      // lastKey = 'ArrowLeft'
      break
    case 'ArrowRight':
      keys.arrowRight.pressed = true
      // lastKey = 'ArrowRight'
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