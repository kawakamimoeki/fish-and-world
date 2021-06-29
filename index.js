const WIDTH = 500
const HEIGHT = 500
const FPS = 60

const world = document.getElementById('world')
world.width = WIDTH
world.height = HEIGHT
const context = world.getContext('2d')

class Fish {
  constructor ({ x, y, len, dir, sight, interval, moveV, turnV, world, context }) {
    this._x = x
    this._y = y
    this._len = len
    this._dir = dir
    this._sight = sight
    this._moveV = moveV
    this._turnV = turnV
    this._interval = interval
    this._world = world
    this._context = context

    this.born()
  }

  born () {
    this.move()
  }

  rotate () {
    setInterval(() => {
      this.clear()
      this._dir += 1
      this.move()
    }, 1000 / FPS)
  }

  clear () {
    context.beginPath()
    context.clearRect(0, 0, this._world.width, this._world.height)
  }

  live () {
    let t = 0
    let collide = null
    let turning = false
    let turn = 0

    setInterval(() => {
      this.clear()

      if (t % this._interval === 0) {
        this._dir += this._moveV * (Math.random() - 0.5)
      }

      if (this._x > this._world.width - this._sight || this._x < this._sight || this._y > this._world.height - this._sight || this._y < this._sight) {
        if (turning === false) {
          collide = this._dir
          turn = this._turnV * (Math.random() - 0.5)
          turning = true
        }
        if (Math.abs(this._dir - collide) < 180) {
          this._dir += turn
        }
      } else {
        turning = false
      }

      this._x += 2 * Math.cos(this._dir * Math.PI / 180)
      this._y += 2 * Math.sin(this._dir * Math.PI / 180)

      this.move()

      t++
    }, 1000 / FPS)
  }

  move () {
    this._context.lineWidth = 1
    const dx = this._len * Math.cos(this._dir * Math.PI / 180)
    const dy = this._len * Math.sin(this._dir * Math.PI / 180)
    this._context.moveTo(this._x, this._y)
    this._context.lineTo(this._x + dx, this._y + dy)
    this._context.lineTo(this._x + 0.3 * this._len * Math.sin(-1 * this._dir * Math.PI / 180), this._y + 0.3 * this._len * Math.cos(-1 * this._dir * Math.PI / 180))
    this._context.lineTo(this._x - 0.3 * this._len * Math.sin(-1 * this._dir * Math.PI / 180), this._y - 0.3 * this._len * Math.cos(-1 * this._dir * Math.PI / 180))
    this._context.lineTo(this._x + dx, this._y + dy)
    this._context.stroke()
  }
}

const fish = new Fish({
  x: world.width / 2,
  y: world.height / 2,
  len: 30,
  dir: 0,
  sight: 100,
  interval: 10,
  moveV: 30,
  turnV: 20,
  world: world,
  context: context
})

fish.live()
