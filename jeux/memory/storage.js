let bestGames = JSON.parse(localStorage.getItem("bestGames")) || []

function addGame(game) {
    if (bestGames.length < 2 || game.turns < bestGames[0].turns) {
        console.log("test")
        bestGames.push({
            ...game,
            time: Date.now(),
        })
        bestGames = bestGames.sort((a, b) => a.turns - b.turns)
        bestGames = bestGames.slice(0, 2)
        localStorage.setItem("bestGames", JSON.stringify(bestGames))
    }
    console.log(game)
    console.log(bestGames)
}
