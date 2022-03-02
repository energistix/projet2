class Game {
  constructor() {
    this.turn = "red"
    this.selectedCell = null

    this.map = []
    for (let y = 0; y < 6; y++) {
      const col = []
      for (let x = 0; x < 7; x++) {
        col.push(new Cell(x, y, this))
      }
      this.map.push(col)
    }
  }

  mouseOver(x, y) {
    this.selectCell(x, 0)
  }

  selectCell(x, y) {
    console.log(x, y)
    this.selectedCell = this.map[x][y]
    this.selectedCell.color = this.turn
  }

  deselectCell() {
    if (this.selectedCell) this.selectedCell.color = "white"
    this.selectedCell = null
  }
}
