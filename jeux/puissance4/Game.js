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
    this.turn = this.turn == "red" ? "yellow" : "red"
    this.mouseOver(this.selectedCell)
  }

  mouseOut() {
    if (this.selectedCell) this.selectedCell.color = "white"
    this.selectedCell = null
  }
}
