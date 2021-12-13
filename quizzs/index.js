// verifiquations si deux arrays on le meme contenu
function arraysEqual(a, b) {
    if (a instanceof Array && b instanceof Array) {
        if (a.length != b.length) return false
        for (var i = 0; i < a.length; i++) if (a[i] != b[i]) return false
        return true
    }
}
// une classe formulaire qui regroupe les questions enssembles
class Form {
    constructor(parent = document.body) {
        this.parentElement = document.createElement("div")
        this.questionsElements = document.createElement("div")
        this.scoreDisplay = document.createElement("div")
        this.parentElement.classList.add("form")
        parent.appendChild(this.parentElement)
        this.parentElement.appendChild(this.questionsElements)
        this.parentElement.appendChild(this.scoreDisplay)
        this.scoreDisplay.classList.add("scoreDisplay")
        this.completedDisplay = document.createElement("div")
        this.succededDisplay = document.createElement("div")
        this.winDisplay = document.createElement("div")
        this.questionNumber = 0
        this.succededNumber = 0
        this.appliedNumber = 0
        this.updateScoreDisplay()
        this.scoreDisplay.appendChild(this.completedDisplay)
        this.scoreDisplay.appendChild(this.succededDisplay)
        this.scoreDisplay.appendChild(this.winDisplay)
    }

    updateScoreDisplay() {
        this.completedDisplay.innerText = `Quesstions complétés : ${
            this.appliedNumber
        }/${this.questionNumber} ${Math.round(
            (this.appliedNumber / this.questionNumber) * 100
        )}%`
        this.succededDisplay.innerText = `Questions réussis : ${
            this.succededNumber
        }/${this.questionNumber} ${Math.round(
            (this.succededNumber / this.questionNumber) * 100
        )}%`
        if (this.succededNumber === this.questionNumber)
            this.winDisplay.innerText = "Bravo !"
    }

    addQuestion(kind, ...args) {
        if (kind === "radio") {
            new radioQuestion(this, ...args)
        } else if (kind === "text") {
            new textQuestion(this, ...args)
        } else if (kind === "QCM") {
            new QCMQuestion(this, ...args)
        }
    }

    addResource(text) {
        const div = document.createElement("div")
        div.innerText = text
        div.classList.add("ressource")
        this.questionsElements.appendChild(div)
    }
}

class Question {
    constructor(question, form, kind) {
        this.question = question
        this.form = form
        form.questionNumber++
        form.updateScoreDisplay()
        this.kind = kind
        this.element = document.createElement("div")
        this.element.classList.add("question")
    }
}

class radioQuestion extends Question {
    constructor(form, question, answers, correctAnswers) {
        super(question, form, "radio")
        this.answers = answers
        this.correctAnswers = []
        for (let i in correctAnswers) {
            const element = correctAnswers[i]
            if (typeof element === "number")
                this.correctAnswers.push(answers[element])
            else if (typeof element === "string")
                this.correctAnswers.push(element)
        }
        this.tickedAnswers = []

        this.questionDisplay = document.createElement("div")
        this.questionDisplay.innerText = question

        this.answersContainer = document.createElement("form")
        this.answersContainer.addEventListener("click", (event) => {
            this.onclick(event)
        })
        this.createAllAnswersElements()

        this.resultLabel = document.createElement("div")
        this.applyButton = document.createElement("button")
        this.applyButton.addEventListener("click", () => {
            this.apply()
        })
        this.applyButton.innerText = "apply"

        this.element.appendChild(this.questionDisplay)
        this.element.appendChild(this.answersContainer)
        this.element.appendChild(this.resultLabel)
        this.element.appendChild(this.applyButton)

        this.form.questionsElements.appendChild(this.element)
    }

    onclick(event) {
        if (this.tickedAnswers.includes(event.target.value)) {
            this.tickedAnswers = this.tickedAnswers.filter(
                (a) => a !== event.target.value
            )
            event.target.checked = false
        } else {
            this.tickedAnswers.push(event.target.value)
        }
    }

    createAllAnswersElements() {
        this.answers.forEach((answer) => {
            const container = document.createElement("div")

            const input = document.createElement("input")
            input.setAttribute("type", "radio")
            input.setAttribute("id", answer)
            input.setAttribute("value", answer)

            const label = document.createElement("label")
            label.setAttribute("for", answer)
            label.innerText = answer

            container.appendChild(input)
            container.appendChild(label)
            this.answersContainer.appendChild(container)
        })
    }

    apply() {
        if (arraysEqual(this.tickedAnswers, this.correctAnswers)) {
            this.resultLabel.innerText = "bonne réponse"
            this.resultLabel.style.color = "green"
            this.form.succededNumber++
        } else {
            this.resultLabel.innerText = "mauvaise réponse"
            this.resultLabel.style.color = "red"
        }
        this.applyButton.remove()
        Array.from(this.answersContainer.children).forEach(
            (child) => (child.children[0].disabled = true)
        )
        this.form.appliedNumber++
        this.form.updateScoreDisplay()
    }
}

class QCMQuestion extends Question {
    constructor(form, question, answers, correctAnswer) {
        super(question, form, "QCM")
        this.answers = answers
        if (typeof correctAnswer === "string") {
            this.correctAnswer = correctAnswer
        } else if (typeof correctAnswer === "number") {
            this.correctAnswer = answers[correctAnswer]
        }

        this.questionDisplay = document.createElement("div")
        this.questionDisplay.innerText = question

        this.answersContainer = document.createElement("select")
        this.createAllAnswersElements()

        this.resultLabel = document.createElement("div")
        this.applyButton = document.createElement("button")
        this.applyButton.addEventListener("click", () => {
            this.apply()
        })
        this.applyButton.innerText = "apply"

        this.element.appendChild(this.questionDisplay)
        this.element.appendChild(this.answersContainer)
        this.element.appendChild(this.resultLabel)
        this.element.appendChild(this.applyButton)

        this.form.questionsElements.appendChild(this.element)
    }

    createAllAnswersElements() {
        const el = document.createElement("option")
        el.value = "Veuillez choisir"
        el.innerText = "Veuillez choisir"
        this.answersContainer.appendChild(el)
        this.answers.forEach((answer) => {
            const answerElement = document.createElement("option")
            answerElement.value = answer
            answerElement.innerText = answer

            this.answersContainer.appendChild(answerElement)
        })
    }

    apply() {
        if (this.answersContainer.value == this.correctAnswer) {
            this.resultLabel.innerText = "bonne réponse"
            this.resultLabel.style.color = "green"
            this.form.succededNumber++
        } else {
            this.resultLabel.innerText = "mauvaise réponse"
            this.resultLabel.style.color = "red"
        }
        this.applyButton.remove()

        this.answersContainer.disabled = true
        this.form.appliedNumber++
        this.form.updateScoreDisplay()
    }
}

class textQuestion extends Question {
    constructor(form, question, correctAnswer) {
        super(question, form, "QCM")
        this.correctAnswer = correctAnswer

        this.questionDisplay = document.createElement("div")
        this.questionDisplay.innerText = question

        this.answerContainer = document.createElement("input")
        this.answerContainer.type = "text"

        this.resultLabel = document.createElement("div")
        this.applyButton = document.createElement("button")
        this.applyButton.addEventListener("click", () => {
            this.apply()
        })
        this.applyButton.innerText = "apply"

        this.element.appendChild(this.questionDisplay)
        this.element.appendChild(this.answerContainer)
        this.element.appendChild(this.resultLabel)
        this.element.appendChild(this.applyButton)

        this.form.questionsElements.appendChild(this.element)
    }

    apply() {
        if (this.answerContainer.value == this.correctAnswer) {
            this.resultLabel.innerText = "bonne réponse"
            this.resultLabel.style.color = "green"
            this.form.succededNumber++
        } else {
            this.resultLabel.innerText = "mauvaise réponse"
            this.resultLabel.style.color = "red"
        }
        this.applyButton.remove()

        this.answerContainer.disabled = true
        this.form.appliedNumber++
        this.form.updateScoreDisplay()
    }
}
