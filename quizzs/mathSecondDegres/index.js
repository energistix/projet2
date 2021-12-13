const form = new Form()
form.addResource("On concidère équation ax² + bx + c = 0")
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
    "Cette équation possède une solutions si...",
    ["Δ = 0", "Δ < 0", "Δ > 0"],
    0
)
form.addQuestion(
    "QCM",
    "Dans le cas ou la solution ne possède qu'une solution, cette solution est de",
    ["Δ", "-b/2a", "-a/3b"],
    1
)
form.addResource("On concidère une équation x² = k")
form.addQuestion(
    "QCM",
    "Cette équation n'as pas de solution si",
    ["k = 0", "k < 0", "k > 0"],
    1
)
