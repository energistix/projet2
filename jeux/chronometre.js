function formatNumber(n = 0) {
    return n.toString().padStart(2, "0")
}

class Chrono {
    /**
     *
     * @param {HTMLElement} parent
     */
    constructor(parent = document.body) {
        this.element = document.createElement("div")
        parent.appendChild(this.element)
        this.element.innerHTML = "00:00"
        this.seconds = 0
        this.minutes = 0
        this.hours = 0

        this.intervalID = setInterval(() => {
            this.tick()
        }, 1000)
    }

    /**
     * @private
     */
    tick() {
        this.seconds++
        if (this.seconds >= 60) {
            this.seconds -= 60
            this.minutes++
            if (this.minutes >= 60) {
                this.minutes -= 60
                this.hours++
            }
        }
        this.render()
    }

    render() {
        return (this.element.innerText =
            (this.hours > 0 ? `${formatNumber(this.hours)}:` : "") +
            `${formatNumber(this.minutes)}:${formatNumber(this.seconds)}`)
    }

    stop() {
        clearInterval(this.intervalID)
        this.intervalID = undefined
    }

    restart() {
        if (!this.intervalID)
            this.intervalID = setInterval(() => {
                this.tick()
            }, 1000)
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
        this.render()
    }
}
