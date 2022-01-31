const WIDTH = 10
const HEIGHT = 10

class Cell {
  /**
   * @param {number} x
   * @param {number} y
   * @param {HTMLElement} parent
   */
  constructor(x, y, parent) {
    this.x = x
    this.y = y
    this.element = document.createElement("img")
    parent.appendChild(this.element)
    this.value = "default"
    this.setImage("default")
  }

  setImage(src) {
    this.value = src
    this.element.src = `./assets/${src}.png`
  }

  setRotation(angle) {
    this.element.style.transform = `rotate(${angle}deg)`
  }
}

class Grid {
  constructor() {
    this.mainElement = document.createElement("div")
    this.mainElement.id = "grid"
    this.map = []
    for (let x = 0; x < WIDTH; x++) {
      const lineElement = document.createElement("div")
      lineElement.classList.add("line")
      const line = []

      for (let y = 0; y < HEIGHT; y++) {
        line.push(new Cell(x, y, lineElement))
      }

      this.map.push(line)
      this.mainElement.appendChild(lineElement)
    }
    document.getElementById("container").appendChild(this.mainElement)
  }

  /**
   * @param {Vec2D} position
   * @param {string} src
   */
  setImage(position, src) {
    this.map[position.x][position.y].setImage(src)
  }

  /**
   * @param {Vec2D} position
   * @returns {string}
   */
  getImageValue(position) {
    return this.map[position.x][position.y].value
  }

  /**
   * @param {Vec2D} position
   * @param {number} angle
   */
  setRotation(position, angle) {
    this.map[position.x][position.y].setRotation(angle)
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

  static random() {
    return new Vec2D(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT))
  }
}

class Snake {
  /**
   * @param {Grid} grid
   * @param {Apple} apple
   */
  constructor(grid, apple) {
    this.grid = grid
    this.apple = apple
    this.position = new Vec2D(5, 5)
    this.direction = new Vec2D(0, -1)
    this.angle = 0
    this.grid.setImage(this.position, "head")
    this.bodyPositions = [this.position.clone()]
    this.desiredLength = 3
    this.actualLength = 1
    this.lastTailPosition = this.position.clone()
    this.rotated = false
    this.going = true

    document.addEventListener("keydown", (event) => {
      if (this.rotated) return
      switch (event.key) {
        case "ArrowUp":
          if (this.angle !== 0 && this.angle !== 180) {
            this.direction = new Vec2D(0, -1)
            this.angle = 0
            this.rotated = true
          }
          break
        case "ArrowDown":
          if (this.angle !== 0 && this.angle !== 180) {
            this.direction = new Vec2D(0, 1)
            this.angle = 180
            this.rotated = true
          }
          break
        case "ArrowRight":
          if (this.angle !== 90 && this.angle !== 270) {
            this.direction = new Vec2D(1, 0)
            this.angle = 90
            this.rotated = true
          }
          break
        case "ArrowLeft":
          if (this.angle !== 90 && this.angle !== 270) {
            this.direction = new Vec2D(-1, 0)
            this.angle = 270
            this.rotated = true
          }
          break
      }
    })

    setInterval(() => this.tick(), 400)
  }

  tick() {
    if (!this.going) return
    this.grid.setImage(this.position, "body")

    if (this.actualLength + 1 >= this.desiredLength) {
      this.grid.setImage(this.lastTailPosition, "default")
      this.lastTailPosition = this.bodyPositions.shift()
      this.grid.setImage(this.lastTailPosition, "tail")
    } else this.actualLength++

    if (this.rotated) {
      this.grid.setImage(this.position, "corner")
    }
    this.grid.setRotation(this.position, this.angle)
    this.position.add(this.direction)

    if (this.position.x === -1 || this.position.x === WIDTH || this.position.y === -1 || this.position.y === HEIGHT) {
      this.lose()
      return
    }

    this.bodyPositions.push(this.position.clone())
    if (this.grid.getImageValue(this.position) === "apple") {
      this.apple.replace()
      this.desiredLength++
    } else if (this.grid.getImageValue(this.position) !== "default") {
      this.lose()
    }

    this.grid.setImage(this.position, "head")
    this.grid.setRotation(this.position, this.angle)
    this.rotated = false
  }

  lose() {
    this.going = false
    document.getElementById("game-over").style.visibility = "visible"
    document.getElementById("apple-display").textContent = this.desiredLength - 3
  }
}

class Apple {
  /**
   * @param {Game} grid
   */
  constructor(game) {
    this.game = game
    this.grid = game.grid
    this.position = Vec2D.random()
  }

  replace() {
    if (this.game.snake.desiredLength >= 100) {
      this.grid.going = false
      document.getElementById("game-won").visibility = "visible"
      return
    }
    this.position = Vec2D.random()
    while (this.grid.getImageValue(this.position) !== "default") {
      this.position = Vec2D.random()
    }
    this.grid.setRotation(this.position, 0)
    this.grid.setImage(this.position, "apple")
  }
}

class Game {
  constructor() {
    this.grid = new Grid()
    this.apple = new Apple(this)
    this.snake = new Snake(this.grid, this.apple)
    this.apple.replace()
  }
}

let game = new Game()

document.getElementById("restart").addEventListener("click", () => {
  game.grid.mainElement.remove()
  document.getElementById("game-over").style.visibility = "hidden"
  game = new Game()
})

document.getElementById("restart2").addEventListener("click", () => {
  game.grid.mainElement.remove()
  document.getElementById("game-won").style.visibility = "hidden"
  game = new Game()
})
