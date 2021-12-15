const form = new Form()
form.addResource("On considère une équation ax² + bx + c = 0")
form.addQuestion(
    "QCM",
    "Quel est le discriminant Δ de cette équation",
    ["b² - 4ac", "b² - 4", "a² - bc"],
    0
)
form.addQuestion(
    "QCM",
    "Cette équation possède deux solutions si...",
    ["Δ = 0", "Δ < 0", "Δ > 0"],
    2
)
form.addQuestion(
    "QCM",
    "Cette équation possède qu'une solution si...",
    ["Δ = 0", "Δ < 0", "Δ > 0"],
    0
)
form.addQuestion(
    "QCM",
    "Dans le cas ou l'équation ne possède qu'une solution, cette solution est de",
    ["Δ", "-b/2a", "-a/3b"],
    1
)
form.addResource("On considère une équation x² = k")
form.addQuestion(
    "QCM",
    "Cette équation n'a pas de solution si",
    ["k = 0", "k < 0", "k > 0"],
    1
)
