const size = 50

let cellNumberVertical = Math.floor(window.innerWidth / size) / 4
let cellNumberHorizontal = Math.floor(window.innerHeight / size) / 2

window.addEventListener("resize", () => {
    cellNumberVertical = Math.floor(window.innerWidth / size)
    cellNumberHorizontal = Math.floor(window.innerHeight / size)
})

class Game {
    constructor() {
        this.grid = []
        this.cellNumberVertical = cellNumberVertical
        this.cellNumberHorizontal = cellNumberHorizontal
        this.createImages()
    }

    updateSize() {
        if (
            cellNumberHorizontal != this.cellNumberHorizontal ||
            cellNumberVertical != this.cellNumberVertical
        ) {
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
                img.style.top = `${y * size}px`
                img.style.left = `${x * size}px`
                this.grid[x][y] = new Cell(this, img, x, y)
                document.body.appendChild(img)
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
                const neighborsBombs = this.checkNeighboringBombsCount(
                    cell.x,
                    cell.y
                )
                if (neighborsBombs > 4) {
                    this.removeAmontOfNeighboringBomb(
                        cell.x,
                        cell.y,
                        neighborsBombs - 4
                    )
                }
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
                if (
                    xCoord < 0 ||
                    xCoord >= this.cellNumberVertical ||
                    yCoord < 0 ||
                    yCoord >= this.cellNumberHorizontal
                )
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
    }

    set bomb(bomb) {
        this._bomb = bomb
        if (bomb === false) this.updateNumber()
        else {
            this.element.src = "./assets/bomb.png"
            console.log("changing src to :", this.src)
        }
    }

    get bomb() {
        return this._bomb
    }

    updateNumber() {
        if (this._bomb) return
        const neighboring = this.game.checkNeighboringBombsCount(this.x, this.y)
        if (neighboring) this.element.src = `./assets/${neighboring}.png`
        else this.src = "./assets/base.png"
        console.log("changing src to :", this.src)
    }

    remove() {
        this.element.remove()
    }
}

const game = new Game()
