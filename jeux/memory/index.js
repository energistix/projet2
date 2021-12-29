class Game {
    constructor(parent = document.body) {
        this.size = 6

        this.mainElement = document.createElement("div")
        this.gameView = document.createElement("table")
        this.gameView.setAttribute("border", "1")
        this.scoreDisplay = document.createElement("div")
        this.resetButton = document.createElement("button")
        this.resetButton.innerText = "Recommencer"

        this.mainElement.appendChild(this.gameView)
        this.mainElement.appendChild(this.scoreDisplay)
        this.mainElement.appendChild(this.resetButton)
        this.chrono = new Chrono(this.mainElement)

        parent.appendChild(this.mainElement)

        this.images = []
        this.shownImages = []
        this.won = false

        this.stats = {
            turns: 0,
            totalPairs: this.size ** 2 / 2,
            foundPairs: 0,
        }

        this.createAllImages()

        this.resetButton.addEventListener("click", () => {
            this.reset()
        })

        this.updateScore()
    }

    removeAllImages() {
        this.images.forEach((image) => image.remove())
        this.images = []
        for (let i = this.gameView.children.length - 1; i >= 0; i--) {
            this.gameView.children[i].parentNode.removeChild(
                this.gameView.children[i]
            )
        }
    }

    createAllImages() {
        const values = []
        for (let i = 0; i < this.size ** 2 / 2; i++) {
            values.push(i)
        }
        let alreadyPlaced = []

        for (let i = 0; i < this.size; i++) {
            const tr = document.createElement("tr")
            for (let j = 0; j < this.size; j++) {
                const td = document.createElement("td")
                const img = document.createElement("img")
                const index = Math.floor(Math.random() * values.length)
                const value = values[index]

                if (alreadyPlaced.includes(value)) values.splice(index, 1)
                else alreadyPlaced.push(value)

                this.images.push(new GameImage(img, this, value))

                td.appendChild(img)
                tr.appendChild(td)
            }
            this.gameView.appendChild(tr)
        }
    }

    /**
     * @param {number} size
     */
    changeSize(size) {
        this.removeAllImages()

        this.size = size

        this.createAllImages()
    }

    /**
     * @param {GameImage} image
     */
    onclick(image) {
        if (image.won || this.shownImages.includes(image)) return
        if (this.shownImages.length === 0) {
            image.show()
        } else if (this.shownImages.length === 1) {
            image.show()
            this.checkPair()
        }
    }

    checkPair() {
        if (this.shownImages.length < 2) return
        this.stats.turns++
        if (this.shownImages[0].value === this.shownImages[1].value) {
            this.shownImages[0].won = true
            this.shownImages[1].won = true
            this.stats.foundPairs++
            if (this.stats.totalPairs === this.stats.foundPairs) {
                this.won = true
                this.chrono.stop()
            }
            this.shownImages = []
        } else {
            setTimeout(() => {
                this.shownImages[0].hide()
                this.shownImages[1].hide()
                this.shownImages = []
            }, 1000)
        }
        this.updateScore()
    }

    updateScore() {
        this.scoreDisplay.innerText = `Pairs trouvées : ${
            this.stats.foundPairs
        }/${this.stats.totalPairs}-${Math.round(
            (this.stats.foundPairs / this.stats.totalPairs) * 100
        )}%
        Nombre de tours : ${this.stats.turns}${
            this.won ? "\nPartie gagné !!" : ""
        }`
    }

    reset() {
        this.won = false

        this.stats = {
            turns: 0,
            totalPairs: this.size ** 2 / 2,
            foundPairs: 0,
        }

        const values = []
        for (let i = 0; i < this.size ** 2 / 2; i++) {
            values.push(i)
        }
        const alreadyPlaced = []

        this.images.forEach((img) => {
            const index = Math.floor(Math.random() * values.length)
            const value = values[index]

            if (alreadyPlaced.includes(value)) values.splice(index, 1)
            else alreadyPlaced.push(value)

            img.value = value
            img.element.src = "./assets/base.png"
            img.won = false
        })

        this.updateScore()
        this.chrono.restart()
    }
}

class GameImage {
    /**
     *
     * @param {HTMLImageElement} element
     * @param {Game} game
     * @param {number} value
     */
    constructor(element, game, value) {
        this.element = element
        this.game = game
        this.value = value
        this.won = false
        this.element.src = "./assets/base.png"
        element.addEventListener("click", () => {
            game.onclick(this)
        })
    }

    show() {
        this.game.shownImages.push(this)
        this.element.src = `./assets/${this.value}.png`
    }

    hide() {
        if (!this.won) {
            this.element.src = "./assets/base.png"
        }
    }

    remove() {
        this.element.remove()
    }
}
const game = new Game()
