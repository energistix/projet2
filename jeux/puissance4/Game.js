const transparency = {
  red: "rgba(255,0,0,0.7)",
  yellow: "rgba(255,255,0,0.7)",
}
class Game {
  constructor() {
    this.turn = "red"
    this.selectedCell = null

    this.map = []
    for (let x = 0; x < 7; x++) {
      const col = []
      for (let y = 0; y < 6; y++) {
        col.push(new Cell(x, y, this))
      }
      this.map.push(col)
    }

    document.getElementById("game-container").addEventListener("mouseout", this.mouseOut.bind(this))
    document.addEventListener("click", this.click.bind(this))
  }

  mouseOver(cell) {
    for (let y = 5; y >= 0; y--) {
      if (this.map[cell.x][y].isFilled == false) return this.selectCell(cell.x, y)
    }
    this.selectedCell = null
  }

  selectCell(x, y) {
    if (this.selectedCell && !this.selectedCell.isFilled) this.selectedCell.color = "white"
    this.selectedCell = this.map[x][y]
    this.selectedCell.color = transparency[this.turn]
  }

  click() {
    if (!this.selectedCell) return
    this.selectedCell.isFilled = true
    this.selectedCell.color = this.turn
    this.checkWin()

    this.turn = this.turn == "red" ? "yellow" : "red"
    this.mouseOver(this.selectedCell)
  }

  mouseOut() {
    if (this.selectedCell) this.selectedCell.color = "white"
    this.selectedCell = null
  }

  checkWin() {
    if (!this.selectedCell) return
    let count = 0

    for (let i = -3; i <= 3; i++) {
      const x = this.selectedCell.x + i
      const y = this.selectedCell.y + i
      if (x < 0 || x > 6 || y < 0 || y > 5) continue
      const cell = this.map[x][y]
      if (cell.color === this.selectedCell.color) {
        count += 1
      }
    }

    if (count >= 4) {
      console.log("one")
      return this.won()
    }
    count = 0

    for (let i = -3; i <= 3; i++) {
      const x = this.selectedCell.x
      const y = this.selectedCell.y + i
      if (x < 0 || x > 6 || y < 0 || y > 5) continue
      const cell = this.map[x][y]
      if (cell.color === this.selectedCell.color) {
        count += 1
      }
    }

    if (count >= 4) {
      console.log("two")
      return this.won()
    }
    count = 0

    for (let i = -3; i <= 3; i++) {
      const x = this.selectedCell.x + i
      const y = this.selectedCell.y
      if (x < 0 || x > 6 || y < 0 || y > 5) continue
      const cell = this.map[x][y]
      if (cell.color === this.selectedCell.color) {
        count += 1
      }
    }

    if (count >= 4) {
      console.log("three")
      return this.won()
    }
    count = 0

    for (let i = -3; i <= 3; i++) {
      const x = this.selectedCell.x + i
      const y = this.selectedCell.y - i
      if (x < 0 || x > 6 || y < 0 || y > 5) continue
      const cell = this.map[x][y]
      if (cell.color === this.selectedCell.color) {
        count += 1
      }
    }

    if (count >= 4) {
      console.log("four")
      return this.won()
    }
  }

  won() {
    console.log("won")
  }
}
