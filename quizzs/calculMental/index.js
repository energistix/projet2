const form = new Form()

form.addQuestion(
    "radio",
    "Les priorités de calcul :",
    [
        "Les multiplications passent avant les additions et soustractions",
        "L'odre des opérations n'a aucune importance",
        "Les opérations de même priorités sont calculées de droite à gauche",
        "Les opérations de même priorités sont calculées de gauche à droite",
    ],
    [0, 3]
)

for (let i = 0; i < 7; i++) {
    // generation d'une question de calcul mental aléatoire
    // (de 2 ou 3 termes avec des additions, soustractions et multiplications)
    let out = ""
    const l = Math.round(Math.random()) + 2
    for (let j = 0; j < l; j++) {
        out += Math.floor(Math.random() * 10)
        if (j != l - 1) out += ["+", "-", "*"][Math.floor(Math.random() * 3)]
    }

    form.addQuestion("text", out + "=", eval(out))
}
