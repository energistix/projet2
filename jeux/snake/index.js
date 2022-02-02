class Game {
  constructor() {
    this.snakes = [
      new Snake(this, ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]),
      new Snake(this, ["z", "s", "d", "q"]),
    ]
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
  }

  clone() {
    return new Vec2D(this.x, this.y)
  }
}

class Snake {
  /**
   *
   * @param {array} keys
   */
  constructor(game, keys) {
    this.game = game

    const keysMap = new Map()
    keysMap.set(keys[0], new Vec2D(0, 1))
    keysMap.set(keys[1], new Vec2D(0, -1))
    keysMap.set(keys[2], new Vec2D(1, 0))
    keysMap.set(keys[3], new Vec2D(-1, 0))

    this.direction = new Vec2D(0, 1)

    document.addEventListener("keydown", (ev) => {
      if (keysMap.has(ev.key)) this.direction = keysMap.get(ev.key)
    })
  }
}

const game = new Game()
