class Cell {
  constructor(x, y, game) {
    this.img = document.createElement("img")
    this.img.style.left = `${x}rem`
    this.img.style.top = `${y}rem`
    this.img.src = "./assets/slot.png"

    this.img.addEventListener("mouseover", () => {
      game.mouseOver(x, y)
    })

    document.body.appendChild(this.img)
  }

  set color(color) {
    this.img.style.color = color
  }
}
