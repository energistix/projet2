const images = ["paper", "rock", "scissors"]
const frenchNames = ["le papier", "la pierre", "les ciseaux"]

images.forEach((name, index) => {
    const img = document.createElement("img")
    img.src = `./assets/${name}.png`
    document.getElementById("game").appendChild(img)
    img.addEventListener("click", () => {
        play(index)
    })
})

const PlayerChoiceDiv = document.getElementById("playerChoice")
const AIChoiceDiv = document.getElementById("AIChoice")
const winnerDisplayDiv = document.getElementById("winnerDisplay")

function play(playerChoiceIndex) {
    const AIChoiceIndex = Math.floor(Math.random() * images.length)
    const AIChoice = images[AIChoiceIndex]
    const AIWon = ["01", "12", "20"].some(
        (a) => a === `${AIChoiceIndex}${playerChoiceIndex}`
    )

    PlayerChoiceDiv.innerText = `Vous avez choisi ${frenchNames[playerChoiceIndex]}`
    AIChoiceDiv.innerText = `L'IA as choisi ${frenchNames[AIChoiceIndex]}`
    winnerDisplayDiv.innerText = AIWon
        ? "l'ia a gagnée"
        : AIChoiceIndex === playerChoiceIndex
        ? "C'est une égalité"
        : "Vous avez gagnés"
    console.log("Player", playerChoiceIndex)
    console.log("AI", AIChoiceIndex)
}
