const quizQuestions = [{
        question: "What type of animal is a seahorse?",
        a: "Crustacean",
        b: "Arachnid",
        c: "Fish",
        d: "Shell",
        answer: "3"
    }, {
        question: "Which of the following dog breeds is the smallest?",
        a: "Dachshund",
        b: "Poodle",
        c: "Pomeranian",
        d: "Chihuahua",
        answer: "4"
    },
    {
        question: "What color are zebras?",
        a: "White with black stripes",
        b: "Black with white stripes",
        c: "Both of the above",
        d: "None of the above",
        answer: "2"
    },
    {
        question: "What are female elephants called?",
        a: "Mares",
        b: "Sows",
        c: "Cows",
        d: "Dams",
        answer: "3"
    },
    {
        question: "What is the fastest water animal?",
        a: "Porpoise",
        b: "Sailfish",
        c: "Flying fish",
        d: "Tuna",
        answer: "2"
    }
];
const question =
    document.getElementById("question");
const a_label =
    document.getElementById("a_label");
const b_label =
    document.getElementById("b_label");
const c_label =
    document.getElementById("c_label");
const d_label =
    document.getElementById("d_label");

const submit =
    document.getElementById("submit");
const quiz = document.getElementById("quiz");

let currentQuiz = 0;


startQuiz();

function startQuiz() {

    const currentQuizQuestion = quizQuestions[currentQuiz];
    question.innerHTML = currentQuiz + 1 + ". " +
        currentQuizQuestion.question;
    a_label.innerHTML = currentQuizQuestion.a;
    b_label.innerHTML = currentQuizQuestion.b;
    c_label.innerHTML = currentQuizQuestion.c;
    d_label.innerHTML = currentQuizQuestion.d;
    submit.disabled = "disabled";

}
let score = 0;
submit.addEventListener("click", () => {


    var radios = document.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {

        if (radios[i].type === 'radio' && radios[i].checked) {
            radios[i].checked = false;
            const userAnswer = i + 1;
            if (userAnswer == quizQuestions[currentQuiz].answer) {
                score++;
            }
        }
    }
    currentQuiz++;
    if (currentQuiz < quizQuestions.length) {
        startQuiz();
    } else {
        quiz.innerHTML = '<h1 style="text-align:center;"> Your score is ' + score + '/' +
            quizQuestions.length + '</h1><span><button class="submit" onclick= location.reload()>Reload Quiz</button></span>'






    }


});