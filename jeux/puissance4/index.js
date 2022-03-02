//TODO: finish this game

let selectedColumn = 0
const elementsMap = []
const gameMap = []

for (let y = 0; y < 6; y++) {
  const column = []
  const gameColumn = []

  for (let x = 0; x < 7; x++) {
    const img = document.createElement("img")
    img.style.left = `${x}rem`
    img.style.top = `${y}rem`
    img.src = "./assets/slot.png"
    img.addEventListener("mouseover", () => {
      selectedColumn = x
    })

    column.push(img)
    gameColumn.push(null)
    document.body.appendChild(img)
  }

  elementsMap.push(column)
  gameMap.push(gameColumn)
}
