class Cell {
  constructor(x, y, game) {
    this.x = x
    this.y = y
    this.isFilled = false

    this.img = document.createElement("img")
    this.img.style.left = `${x}rem`
    this.img.style.top = `${y}rem`
    this.img.src = "./assets/slot.png"

    this.img.addEventListener("mouseover", () => {
      game.mouseOver(this)
    })

    document.body.appendChild(this.img)
  }

  set color(color) {
    console.log(color)
    this.img.style.backgroundColor = color
  }
}
