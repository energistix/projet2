const transparency = {
  red: "rgba(255,0,0,0.7)",
  yellow: "rgba(255,255,0,0.7)",
}
class Game {
  constructor() {
    this.turn = "red"
    this.selectedCell = null
    this.won = false

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
    document.getElementById("restart-button").addEventListener("click", this.restart.bind(this))
  }

  restart() {
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {
        this.map[x][y].color = "white"
        this.map[x][y].isFilled = false
      }
    }
    this.won = false
    document.getElementById("win-screen").style.visibility = "hidden"
  }

  mouseOver(cell) {
    if (this.won) return
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
    if (!this.selectedCell || this.won) return
    this.selectedCell.isFilled = true
    this.selectedCell.color = this.turn
    if (this.checkWin()) return
    this.turn = this.turn == "red" ? "yellow" : "red"
    this.mouseOver(this.selectedCell)
  }

  mouseOut() {
    if (this.selectedCell) this.selectedCell.color = "white"
    this.selectedCell = null
  }

  validateCords(x, y) {
    return x >= 0 && x < 7 && y >= 0 && y < 6
  }

  //TODO: optimizing this function by not checking the whole grid each time
  checkWin() {
    if (!this.selectedCell) return
    // horizontal
    for (let j = 0; j < 6 - 3; j++) {
      for (let i = 0; i < 7; i++) {
        if (
          this.map[i][j].color == this.selectedCell.color &&
          this.map[i][j + 1].color == this.selectedCell.color &&
          this.map[i][j + 2].color == this.selectedCell.color &&
          this.map[i][j + 3].color == this.selectedCell.color
        )
          return this.win()
      }
    }
    // vertical
    for (let i = 0; i < 7 - 3; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          this.map[i][j].color == this.selectedCell.color &&
          this.map[i + 1][j].color == this.selectedCell.color &&
          this.map[i + 2][j].color == this.selectedCell.color &&
          this.map[i + 3][j].color == this.selectedCell.color
        )
          return this.win()
      }
    }

    // first type of diagonal
    for (let i = 3; i < 7; i++) {
      for (let j = 0; j < 6 - 3; j++) {
        if (
          this.map[i][j].color == this.selectedCell.color &&
          this.map[i - 1][j + 1].color == this.selectedCell.color &&
          this.map[i - 2][j + 2].color == this.selectedCell.color &&
          this.map[i - 3][j + 3].color == this.selectedCell.color
        )
          return this.win()
      }
    }

    // second type of diagonal
    for (let i = 3; i < 7; i++) {
      for (let j = 3; j < 6; j++) {
        if (
          this.map[i][j].color == this.selectedCell.color &&
          this.map[i - 1][j - 1].color == this.selectedCell.color &&
          this.map[i - 2][j - 2].color == this.selectedCell.color &&
          this.map[i - 3][j - 3].color == this.selectedCell.color
        )
          return this.win()
      }
    }
    return false
  }

  win() {
    this.won = true
    this.selectedCell = null
    const winnerNameElt = document.getElementById("winner-color")
    winnerNameElt.innerText = this.turn == "red" ? "rouge" : "jaune"
    winnerNameElt.style.color = this.turn
    document.getElementById("win-screen").style.visibility = "visible"

    return true
  }
}
