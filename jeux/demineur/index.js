const size = 50

let cellNumberVertical = Math.floor((window.innerWidth * 0.9) / size)
let cellNumberHorizontal = Math.floor((window.innerHeight * 0.9) / size)

const container = document.getElementById("game-container")
container.style.width = `${cellNumberVertical * size}px`
container.style.height = `${cellNumberHorizontal * size}px`

class Game {
  constructor() {
    this.grid = []
    this.isLost = false

    this.cellNumberVertical = cellNumberVertical
    this.cellNumberHorizontal = cellNumberHorizontal

    this.createImages()
  }

  lost() {
    this.isLost = true
    document.getElementById("gameOver").style.visibility = "visible"
  }

  updateSize() {
    if (cellNumberHorizontal != this.cellNumberHorizontal || cellNumberVertical != this.cellNumberVertical) {
      this.cellNumberVertical = cellNumberVertical
      this.cellNumberHorizontal = cellNumberHorizontal

      this.grid.flat().map((cell) => cell.remove())
      this.grid = []

      this.createImages()
    }
  }

  createImages() {
    for (let x = 0; x < this.cellNumberVertical; x++) {
      this.grid[x] = []
      for (let y = 0; y < this.cellNumberHorizontal; y++) {
        const img = document.createElement("img")
        img.style.top = `${y * size /*+ window.innerHeight * 0.05*/}px`
        img.style.left = `${x * size /*+ window.innerWidth * 0.05*/}px`
        this.grid[x][y] = new Cell(this, img, x, y)
        document.getElementById("game-container").appendChild(img)
      }
    }
    this.placeBombs()
  }

  placeBombs() {
    this.grid.forEach((line) => {
      line.forEach((cell) => {
        if (Math.random() > 0.9) cell.bomb = true
      })
    })

    this.grid.forEach((line) => {
      line.forEach((cell) => {
        cell.updateNumber()
      })
    })
  }

  forEachNeighbor(x, y, f) {
    for (let xOffset = -1; xOffset < 2; xOffset++) {
      for (let yOffset = -1; yOffset < 2; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue
        let xCoord = x + xOffset
        let yCoord = y + yOffset
        if (xCoord < 0 || xCoord >= this.cellNumberVertical || yCoord < 0 || yCoord >= this.cellNumberHorizontal)
          continue
        if (!this.grid[xCoord] || !this.grid[xCoord][yCoord]) return
        f(this.grid[xCoord][yCoord])
      }
    }
  }

  checkNeighboringBombsCount(x, y) {
    let count = 0
    this.forEachNeighbor(x, y, (cell) => {
      if (cell.bomb) count++
    })
    return count
  }
}

class Cell {
  /**
   *
   * @param {Game} grid
   * @param {HTMLImageElement} element
   * @param {number} x
   * @param {number} y
   */
  constructor(game, element, x, y) {
    this.game = game
    this.element = element
    this.x = x
    this.y = y
    this.bomb = false
    this._hidden = true
    this._src = "./assets/empty.png"
    this.element.src = "./assets/base.png"

    this.element.addEventListener("click", (event) => {
      this.click(event)
    })

    this.element.addEventListener("contextmenu", () => {
      this.flag()
      return false
    })

    this.clicked = false
    this.flagged = false
  }

  set hidden(hidden) {
    this._hidden = hidden
    if (hidden == false) this.element.src = this.src
    else this.element = "./assets/empty.png"
  }

  get hidden() {
    return this._hidden
  }

  set bomb(bomb) {
    this._bomb = bomb
    if (bomb === false) this.updateNumber()
    else {
      this.src = "./assets/bomb.png"
    }
  }

  set src(src) {
    this._src = src
    if (this.hidden == false) this.element.src = src
  }

  get src() {
    return this._src
  }

  get bomb() {
    return this._bomb
  }

  updateNumber() {
    if (this._bomb) return
    const neighboring = this.game.checkNeighboringBombsCount(this.x, this.y)
    if (neighboring) this.src = `./assets/${neighboring}.png`
    else this.src = "./assets/empty.png"
  }

  remove() {
    this.element.remove()
  }

  click(event) {
    if (event?.button == 2 || this.flagged || this.game.isLost) return
    if (this.clicked == true) return
    this.clicked = true
    this.hidden = false
    if (this.bomb) this.game.lost()
    if (this.src == "./assets/empty.png") {
      this.game.forEachNeighbor(this.x, this.y, (cell) => {
        if (cell.hidden) cell.click()
      })
    }
  }

  flag() {
    if (this.clicked) return
    if (this.game.isLost) return
    if (!this.flagged && this.hidden) {
      this.element.src = "./assets/flag.png"
      this.flagged = true
    } else {
      this.element.src = "./assets/base.png"
      this.flagged = false
    }
  }
}

const game = new Game()
