
export const pop = (canvas) => {
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  class Circle {
    constructor (x, y, radius, color, vx, vy, ctx) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.vx = vx
      this.vy = vy
      this.ctx = ctx
    }

    update () {
      this.x += this.vx
      this.y += this.vy
      this.ctx.beginPath()
      this.ctx.fillStyle = this.color
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      this.ctx.fill()
      this.detectWall()
    }

    detectWall () {
      if (this.x < this.radius) {
        this.x = this.radius
        this.vx = -this.vx
      } else if (this.x + this.radius > width) {
        this.x = width - this.radius
        this.vx = -this.vx
      }
      if (this.y < this.radius) {
        this.y = this.radius
        this.vy = -this.vy
      } else if (this.y + this.radius > height) {
        this.y = height - this.radius
        this.vy = -this.vy
      }
    }
  }

  const clear = () => ctx.clearRect(0, 0, width, height)
  const randint = max => Math.floor(Math.random() * max)

  let stop = 0
  let stopStep = 0.01
  let sleep = 0
  const drawBackground = () => {
    const gradient = ctx.createLinearGradient(0, 0, width * 1.5, height * 1.5)
    if (!sleep) {
      stop += stopStep
      if (stop <= 0) {
        stop = 0
        stopStep = -stopStep
        sleep = fps * 30
      }
      if (stop >= 1) {
        stop = 1
        stopStep = -stopStep
        sleep = fps * 30
      }
    } else {
      sleep --
    }
    gradient.addColorStop(0, 'rgba(250, 220, 20, 0.5)')
    gradient.addColorStop(stop, 'rgba(20, 20, 20, 0.5)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }
  const vw = Math.floor(width / 100)
  const vh = Math.floor(height / 100)

  const fps = 20
  const frameGap = Math.round(1000 / fps)

  const circles = Array.from({ length: 52 }).map(() => {
    const radius = Math.floor(randint(vw + vh) * 1.5 + randint(5))
    let x = randint(width)
    let y = randint(height)
    x = Math.min(Math.max(radius, x), width - radius)
    y = Math.min(Math.max(radius, y), height - radius)
    let vx = randint(2) ? (randint(2) + 2) * vw : (randint(-1) - 2) * vw
    let vy = randint(2) ? (randint(2) + 2) * vh : (randint(-1) - 2) * vh
    vx = Math.floor(vx / fps)
    vy = Math.floor(vy / fps)
    return new Circle(
      x,
      y,
      radius,
      `rgba(${randint(256)}, ${randint(256)}, ${randint(256)}, ${(randint(5) + 5) / 10})`,
      vx,
      vy,
      ctx
    )
  })

  let lastX, lastY
  canvas.addEventListener('mouseover', e => {
    lastX = e.pageX
    lastY = e.pageY
  })
  canvas.addEventListener('mousemove', e => {
    if (lastX === undefined) {
      lastX = e.pageX
      lastY = e.pageY
      return
    }
    const diffX = e.pageX - lastX
    const diffY = e.pageY - lastY
    circles.forEach(c => {
      c.x += diffX / fps
      c.y += diffY / fps
    })
    lastX = e.pageX
    lastY = e.pageY
  })

  let lastTime = Date.now()
  let anim = null

  const update = () => {
    if (Date.now() - lastTime >= frameGap) {
      clear()
      drawBackground()
      circles.forEach(circle => circle.update())
      lastTime = Date.now()
    }
    anim = requestAnimationFrame(update)
  }

  anim = requestAnimationFrame(update)

  return () => cancelAnimationFrame(anim)
}

export const createWatermark = ({
  text,
  gap,
  fontSize,
  color,
  width = window.innerWidth,
  height = window.innerHeight,
  drawMode = 'fill'
}) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.font = `${fontSize}px Arial`
  ctx[drawMode + 'Style'] = color

  const textWidth = ctx.measureText(text).width
  const perWidth = textWidth + gap
  const perHeight = fontSize + gap
  for (let y = gap / 2; y < height; y += perHeight) {
    for (let x = gap / 2; x < width; x += perWidth) {
      ctx[drawMode + 'Text'](text, x, y)
    }
  }

  return canvas
}

export default {
  pop,
  createWatermark
}
