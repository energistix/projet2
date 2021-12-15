const size = 50

let cellNumberVertical = Math.floor(window.screen.width / size)
let cellNumberHoryzontall = Math.floor(window.screen.height / size)

window.addEventListener("resize", () => {
    cellNumberVertical = Math.floor(window.screen.height / size)
    cellNumberHoryzontall = Math.floor(window.screen.width / size)
})

class Game {
    constructor() {
        this.grid = []
        this.cellNumberVertical = cellNumberVertical
        this.cellNumberHoryzontall = cellNumberHoryzontall
        this.createImages()
        console.table(
            this.grid.map((line) => line.map((cell) => (cell.bomb ? 1 : 0)))
        )
    }

    updateSize() {
        if (
            cellNumberHoryzontall != this.cellNumberHoryzontall ||
            cellNumberVertical != this.cellNumberVertical
        ) {
            this.cellNumberVertical = cellNumberVertical
            this.cellNumberHoryzontall = cellNumberHoryzontall
            this.grid.flat().map((cell) => cell.remove())
            this.grid = []
            this.createImages()
        }
    }

    createImages() {
        for (let x = 0; x < this.cellNumberVertical; x++) {
            this.grid[x] = []
            for (let y = 0; y < this.cellNumberHoryzontall; y++) {
                const img = document.createElement("img")
                img.style.top = `${y * size}px`
                img.style.left = `${x * size}px`
                this.grid[x][y] = new Cell(img, x, y)
                document.body.appendChild(img)
            }
        }
        this.placeBombs()
    }

    placeBombs() {
        this.grid.forEach((line) => {
            line.forEach((cell) => {
                if (Math.random() > 0.5) cell.bomb = true
            })
        })
        this.grid.forEach((line) => {
            line.forEach((cell) => {
                const neighboursBombs = this.checkNeighboringBombsCount(
                    cell.x,
                    cell.y
                )
                if (neighboursBombs > 4) {
                    this.removeAmontOfNeighboringBomb(
                        cell.x,
                        cell.y,
                        neighboursBombs - 4
                    )
                }
            })
        })
    }

    forEachNeighbor(x, y, f) {
        for (let xOffcet = -1; xOffcet < 2; xOffcet++) {
            for (let yOffcet = -1; yOffcet < 2; yOffcet++) {
                if (xOffcet === 0 && yOffcet === 0) continue
                let xCoord = x + xOffcet
                let yCoord = y + yOffcet
                if (
                    xCoord < 0 ||
                    xCoord >= this.cellNumberVertical ||
                    yCoord < 0 ||
                    yCoord >= this.cellNumberHoryzontall
                )
                    continue
                if (!this.grid[xCoord][yCoord]) return
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

    removeAmontOfNeighboringBomb(x, y, n) {
        let count = 0
        while (count < n) {
            this.forEachNeighbor(x, y, (cell) => {
                if (cell.bomb && count < n && Math.random() > 0.5) {
                    cell.bomb = false
                    count++
                }
            })
        }
    }
}

class Cell {
    /**
     *
     * @param {HTMLImageElement} element
     * @param {number} x
     * @param {number} y
     */
    constructor(element, x, y) {
        this.element = element
        this.x = x
        this.y = y
        this.element.src = "./assets/base.png"
        this._bomb = false
    }

    set bomb(bomb) {
        this._bomb = bomb
        if (bomb === false) this.element.src = "./assets/base.png"
        else this.element.src = "./assets/bomb.png"
    }

    get bomb() {
        return this._bomb
    }

    remove() {
        this.element.remove()
    }
}

const game = new Game()
