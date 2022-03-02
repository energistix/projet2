for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 7; x++) {
    const img = document.createElement("img")
    img.style.left = `${x}rem`
    img.style.top = `${y}rem`
    img.style.backgroundColor = ["red", "yellow", "white"][Math.floor(Math.random() * 3)]
    img.src = "./assets/slot.png"
    document.body.appendChild(img)
  }
}
