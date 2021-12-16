const images = ["paper", "rock", "scisors"]
const frenchNames = ["le papier", "la pierre", "les sciseaux"]

images.forEach((name, index) => {
    const img = document.createElement("img")
    img.src = `./assets/${name}.png`
    document.body.appendChild(img)
    img.addEventListener("click", () => {
        play(index)
    })
})

const PlayerChoiseDiv = document.getElementById("playerChoise")
const AIChoiseDiv = document.getElementById("AIChoice")
const winnerDisplayDiv = document.getElementById("winnerDisplay")

function play(playerChoiceIndex) {
    const AIChoiceIndex = Math.floor(Math.random() * images.length)
    const AIChoice = images[AIChoiceIndex]
    const AIWon = AIChoiceIndex % 3 < playerChoiceIndex % 3

    PlayerChoiseDiv.innerText = `Vous avez choisi ${frenchNames[playerChoiceIndex]}`
    AIChoiseDiv.innerText = `L'IA as choisi ${frenchNames[AIChoiceIndex]}`
    winnerDisplayDiv.innerText = AIWon
        ? "l'ia a gagnée"
        : AIChoiceIndex === playerChoiceIndex
        ? "C'est une égalité"
        : "Vous avez gagnés"
}
