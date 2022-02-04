// @ts-check

const HEIGHT = 10
const WIDTH = 10

const gameMods = {
  twoPlayer: {
    snakes: [
      {
        keys: ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"],
        position: [0, 0],
      },
      {
        keys: ["z", "s", "d", "q"],
        position: [WIDTH - 1, 0],
      },
    ],
  },
  solo: {
    snakes: [
      {
        keys: ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"],
        position: [5, 5],
      },
    ],
  },
}

class Cell {
  /**
   * @param {Game} game
   * @param {Vec2D} position
   * @param {HTMLElement} parent
   */
  constructor(game, position, parent) {
    this.game = game
    this.position = position
    this.element = document.createElement("img")

    this.src = "default"

    parent.appendChild(this.element)
  }

  set src(src) {
    this._src = src
    this.element.src = `./assets/${src}.png`
  }

  get src() {
    return this._src
  }
}

class Grid {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game
    this.mainElement = document.getElementById("grid")
    this.map = []
    for (let x = 0; x < WIDTH; x++) {
      const columnElement = document.createElement("div")
      columnElement.classList.add("line")
      const column = []

      for (let y = 0; y < HEIGHT; y++) {
        column.push(new Cell(this.game, new Vec2D(x, y), columnElement))
      }

      this.map.push(column)
      // @ts-ignore
      this.mainElement.appendChild(columnElement)
    }
  }

  /**
   * @param {Vec2D} position
   * @returns Boolean
   */
  wall(position) {
    if (position.x < 0 || position.x > WIDTH - 1 || position.y < 0 || position.y > HEIGHT - 1) return true
    return this.map[position.x][position.y].src != "default"
  }

  /**
   * @param {Vec2D} position
   * @param {"body" | "head" | "tail" | "corner" | "default"} name
   */
  setImage(position, name) {
    this.map[position.x][position.y].src = name
  }
}

class Game {
  constructor(gameMod) {
    this.snakes = gameMod.snakes.map((keys) => {
      return new Snake(this, keys)
    })

    this.grid = new Grid(this)

    setInterval(() => {
      this.snakes.forEach((snake) => snake.tick())
    }, 500)
  }
}

class Vec2D {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * @param {Vec2D} offset
   */
  add(offset) {
    this.x += offset.x
    this.y += offset.y
    return this
  }

  clone() {
    return new Vec2D(this.x, this.y)
  }
}

class Snake {
  /**
   * @param {Game} game
   * @param {object} config
   * @param {Array<string>} config.keys
   * @param {[number, number]} config.position
   * @param {number} [config.desiredLength]
   *
   */
  constructor(game, config) {
    this.game = game
    this.lost = false
    this.desiredLength = config.desiredLength || 3

    const keysMap = new Map()
    keysMap.set(config.keys[0], new Vec2D(0, 1))
    keysMap.set(config.keys[1], new Vec2D(0, -1))
    keysMap.set(config.keys[2], new Vec2D(1, 0))
    keysMap.set(config.keys[3], new Vec2D(-1, 0))

    this.direction = new Vec2D(0, 1)
    this.body = [new Vec2D(...config.position)]

    document.addEventListener("keydown", (ev) => {
      if (keysMap.has(ev.key)) this.direction = keysMap.get(ev.key)
    })
  }

  tick() {
    if (this.lost) return
    const newPos = this.body[0].clone().add(this.direction)
    if (this.game.grid.wall(newPos)) return this.lose()
    this.game.grid.setImage(this.body[0], "body")
    this.game.grid.setImage(newPos, "head")
    this.body.unshift(newPos)

    if (this.body.length > this.desiredLength) {
      // @ts-ignore
      this.game.grid.setImage(this.body.pop(), "default")
      this.game.grid.setImage(this.body[this.body.length - 1], "tail")
    }
  }

  lose() {
    this.lost = true
    // @ts-ignore
    document.getElementById("game-over").style.visibility = "visible"
    // @ts-ignore
    document.getElementById("apple-display").textContent = this.desiredLength - 3
  }
}

const game = new Game(gameMods.solo)
