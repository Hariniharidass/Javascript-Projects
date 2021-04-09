const questions =
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

let quest = [];
let options = [];
let correct_ans = [];
let score = 0;
var quest_count = 0;
var local_counter = 0;

function start()
{
    if (quest_count < 10) {
        getData().then(extract_data);
        quest_count++;
    }
}

/**
 *
 * Function to get API response and store it as data
 */
async function getData()
{
    /**
* Used this API GENERATOR
*     https://opentdb.com/api_config.php
*/
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
    const data = await response.json();
    return data;
}

/**
 *
 * Function to extract data from API response as quest , options and correct_ans
 */
function extract_data(data)
{
    var i;
    console.log(data);
    for (i = 0; i < 10; i++) {
        quest.push(data.results[i].question);
        options.push(data.results[i].incorrect_answers[0]);
        options.push(data.results[i].correct_answer);
        options.push(data.results[i].incorrect_answers[2]);
        options.push(data.results[i].incorrect_answers[1]);
        correct_ans.push(data.results[i].correct_answer);
        prepareQuiz(quest, options, correct_ans, i);
    }

}
/**
 *
 * Function to store all questions as quest ,correct answers as correct_ans and inncorect answers as options
 */
function prepareQuiz(quest, options, correct_ans, counter)
{
    var count = 1;
    var options_array = [];
    var i = 0;
    var j = 4;
    while (count <= 10) {
        options_array.push(options.slice(i, j));
        count++;
        i = j;
        j = j + 4;
    }
    if (counter === 9) {
        startQuiz(quest, options_array, correct_ans, local_counter);
    }
}
/**
         * To shuffle options_array
         *
         * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
         *  */
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function startQuiz(quest, options_array, correct_ans, local_counter)
{
    //display the questions with multiple answer options to user
    shuffle(options_array[local_counter]);
    questions.innerHTML = (local_counter + 1) + " . " + quest[local_counter];
    a_label.innerHTML = options_array[local_counter][0];
    b_label.innerHTML = options_array[local_counter][1];
    c_label.innerHTML = options_array[local_counter][2];
    d_label.innerHTML = options_array[local_counter][3];
    submit.disabled = "disabled";

    submit.addEventListener("click", () =>
    {
        // Check if the user answer is correct answer
        //if correct => update score
        var radios = document.getElementsByTagName('input');
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].type === 'radio' && radios[j].checked) {
                var userAnswer;
                if ((j + 1) == "1") {
                    userAnswer = a_label.textContent;
                } else if ((j + 1) == "2") {
                    userAnswer = b_label.textContent;
                } else if ((j + 1) == "3") {
                    userAnswer = c_label.textContent;
                }
                else if ((j + 1) == "4") {
                    userAnswer = d_label.textContent;
                }
                radios[j].checked = false;
                if (userAnswer == correct_ans[local_counter]) {
                    score++;
                }
                local_counter++;
                if (local_counter < 10) {
                    // load the next question
                    startQuiz(quest, options_array, correct_ans, local_counter)
                }
                else if (local_counter >= 10) {
                    // Display the result and questions with correct answer
                    question.innerHTML = "";
                    quest.forEach((quests, index) =>
                    {
                        // question.innerHTML = "";
                        question.innerHTML += quests + " <p> ANSWER :" + correct_ans[index] + "</p>";
                    });
                    document.getElementById('submit_div').style.visibility = 'hidden';
                    document.getElementById('result').style.visibility = 'hidden';
                    document.getElementById('heading').style.visibility = 'hidden';
                    quiz.innerHTML = '<h1 style="text-align:center;"> Your score is ' + score + '/' +
                        '10' + '</h1><span><button class="submit" onclick= location.reload()>Reload Quiz</button></span>';
                }
            }
        }
    });
}
