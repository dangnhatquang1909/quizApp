//Create OptionList
let questionsList = [
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
    {
        options: ["option1", "option2", "option3", "option4"],
    },
];

/*
function init() {
    const length = questionsList.length;
    const qWrap = document.querySelector(".listQues");
    questionsList.forEach((item, index) => {
        const innerQuestion = `
        <h2 class="question-index">Question ${index + 1} of ${length} </h2>
        <div class="question-text">question ${index + 1}</div>
        `;
        const optionList = document.createElement("div");
        optionList.classList.add("options-list");
        item.options.forEach((ques, quesIndex) => {
            const innerList = `
            <labeL class="option" for="question${index + 1}--option${quesIndex + 1
                }">
                <input type="radio" id="question${index + 1}--option${quesIndex + 1
                }" name="question-${index + 1}" value="option${quesIndex + 1}">
                <span>${ques}</span>
            </labeL>
            `;
            optionList.innerHTML += innerList;
        });
        qWrap.innerHTML += innerQuestion;
        qWrap.innerHTML += optionList.innerHTML;
    });
}
init();
*/
const btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", handleStartBtn);
const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.addEventListener("click", handleSubmitBtn);
const btnTryAgain = document.querySelector("#btn-try-again");
btnTryAgain.addEventListener("click", handleTryAgainBtn);

// Handle user action: selecting an answer
// const options = document.querySelectorAll("input");
// console.log(options.length);
// options.forEach((option) => {
//     return option.addEventListener("click", onChange);
// });
// Handle user action: changing an answer
function onChange() {
    let questions = document.querySelectorAll('.question-wrap');
    questions.forEach((question) => {
        console.log("Question :  ");
        console.log(question);
        let inputs = question.querySelectorAll('input');
        for (let input of inputs) {
            if (input.checked) {
                console.log("This is selected");
                console.log(input);
                let label = question.querySelector("label[for=" + input.id + "]")
                label.classList.add("option-selected");
            } else {
                let label = question.querySelector("label[for=" + input.id + "]")
                if (!label) console.log("This is not selected");
                console.log(input)
                label.classList.remove("option-selected");
            }
        }

    });
}
const userAnswers = { userAnswers: {} };

var id_Attempt;

appendData();
/*
TODO_1  Screen 1: Introduction
    Handle user action: starting the quiz & displaying questions on Screen 2
*/
function handleStartBtn() {
    document.querySelector("header").scrollIntoView();
    const screen1 = document.querySelector("#introduction");
    screen1.classList.add("hidden");
    // page1.setAttribute("style", "display: none");
    const screen2 = document.querySelector("#attempt-quiz");
    screen2.classList.remove("hidden");
    // page2.setAttribute("style", "display: block");
    const listQues = document.querySelector('.listQues');
    listQues.classList.remove("hidden");
    // listQues.setAttribute('style', 'display: block');
    const submitBox = document.querySelector('#box-submit');
    submitBox.classList.remove("hidden");
    // submitBox.setAttribute('style', 'display: block');
    console.log("handleStartBtn()run");
}

// TODO_2  Screen 2: Attempt quiz
// Handle user action: submitting your answers & display result, review questions on
function handleSubmitBtn() {
    const isConfirmed = confirm("Do you really want to finish attempt?");
    if (isConfirmed) {
        showReview();
        document.querySelector("header").scrollIntoView();
        const boxSubmit = document.querySelector("#box-submit");
        boxSubmit.classList.add("hidden");
        // page2.setAttribute("style", "display: none");
        const quesReview = document.querySelector("#review-quiz");
        quesReview.classList.remove("hidden");
        // quesReview.setAttribute("style", "display:block");
        console.log("handleSubmitBtn()run");
    }
}

/*
// TODO  clicking the answer
// get ref to attempt-quiz - querySelector()
const options = document.querySelectorAll('.option');
// for each option in options-list
for (const option of options) {
    const inputs = options.querySelectorAll('input');
    for (input of inputs) {
        if (input.checked) {
            const ans = input.parentNode;
            ans.style.backgroundColor = '#ddd';
        }
    }
}


function clickAnswer(event) {
    // get prev selected answer
    const selected = attemptQuiz.querySelector(".option-selected");

    if (selected) {
        //unselected
        selected.classList.remove("option-selected");
    }

    const label = event.currentTarget; // get user click label
    label.classList.add("option-selected");
    console.log("clicked");
}
*/


/*
TODO_3  Screen 3: Review quiz
    Handle user action: restart the quiz
*/
function handleTryAgainBtn() {
    document.querySelector('header').scrollIntoView();
    const node = document.querySelector(".listQues");
    node.querySelectorAll('*').forEach(n => n.remove());
    const listQues = document.querySelector('.listQues');
    listQues.classList.add("hidden");
    // listQues.setAttribute('style', 'display: none');
    const screen3 = document.querySelector('#review-quiz');
    screen3.classList.add("hidden");
    // page3.setAttribute('style', 'display:none');
    const screen1 = document.querySelector('#introduction');
    screen1.classList.remove("hidden");
    // page1.setAttribute('style', 'display:block');
    appendData();
    userAnswers.answers = {};
    console.log("handleTryAgainBtn()run");
}

async function getData() {
    const response = await fetch('https://wpr-quiz-api.herokuapp.com/attempts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

function appendAnswer(data, i, j) {
    const answerDiv = document.createElement('label');
    answerDiv.setAttribute('for', 'question' + i + '--option' + j);
    answerDiv.setAttribute('class', 'option');
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = 'question' + i + '--option' + j;
    input.name = 'question-' + i;
    input.value = j;
    const label = document.createElement('span');
    label.textContent = data[i].answers[j];
    answerDiv.appendChild(input);
    answerDiv.appendChild(label);
    return answerDiv;
}
function appendQues(data, i) {
    const question = document.createElement('div');
    question.setAttribute('class', 'question-wrap');
    question.setAttribute('id', data[i]._id);
    const titleQues = document.createElement('h2');
    titleQues.setAttribute('class', 'question-index');
    titleQues.textContent = 'Question ' + (i + 1) + " of 10";
    const pText = document.createElement('div');
    pText.setAttribute('class', 'question-text')
    pText.textContent = data[i].text;
    question.appendChild(titleQues);
    question.appendChild(pText);
    return question;
}
function appendQuesAns(data) {
    const container = document.querySelector('.listQues');
    for (let i = 0; i < 10; i++) {
        const question = appendQues(data, i);
        for (let j = 0; j < data[i].answers.length; j++) {
            const answer = appendAnswer(data, i, j);
            question.appendChild(answer);
        }
        container.appendChild(question);
    }
}

function appendData() {
    getData().then(data => {
        appendQuesAns(data.questions);
        id_Attempt = data._id;
        // Handle user action: selecting an answer
        const options = document.querySelectorAll("input");
        console.log(options.length);
        options.forEach((option) => {
            return option.addEventListener("click", onChange);
        });
    });

}
// ---------------------------------------------------------
function getUserResult() {
    const questions = document.querySelectorAll('.question-wrap');
    for (ques of questions) {
        const inputs = ques.querySelectorAll('input');
        for (input of inputs) {
            if (input.checked) {
                // const ans = input.parentNode;
                userAnswers.userAnswers[ques.id] = input.value;
            }
        }
    }
}
async function postData() {
    getUserResult();
    const response = await fetch(`https://wpr-quiz-api.herokuapp.com/attempts/${id_Attempt}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAnswers)
    });
    return response.json();
}
function disabledOption() {
    let inputs = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = 'true';
    }
}
function reviewAnswer(ans, color, text) {
    const answer = document.createElement('div');
    answer.setAttribute('class', 'review-answer');
    const divAns = document.createElement('div');
    divAns.textContent = text;
    answer.appendChild(divAns);
    const label = ans.querySelector('span');
    label.appendChild(answer);
    ans.style.backgroundColor = color;
}
function markAnswer(data) {
    const correctAns = data.correctAnswers;
    const userAns = userAnswers.userAnswers;
    const ques = document.querySelectorAll('.question-wrap');
    for (let i = 0; i < ques.length; i++) {
        const inputs = ques[i].querySelectorAll('input');
        for (input of inputs) {
            const divAns = input.parentNode;
            if (ques[i].id in userAns) {
                if (input.value == correctAns[ques[i].id] && input.value == userAns[ques[i].id]) {
                    reviewAnswer(divAns, '#d4edda', 'Correct Answer');
                } else if (input.value == correctAns[ques[i].id] && input.value != userAns[ques[i].id]) {
                    reviewAnswer(divAns, '#ddd', 'Correct Answer');
                } else if (input.value != correctAns[ques[i].id] && input.value == userAns[ques[i].id]) {
                    reviewAnswer(divAns, '#f8d7da', 'Your Answer');
                }
            } else {
                if (input.value == correctAns[ques[i].id]) {
                    reviewAnswer(divAns, '#ddd', 'Correct Answer');
                }
            }
        }
    }
}
function showReview() {
    disabledOption();
    const result = document.querySelector('#score');
    postData().then(data => {
        markAnswer(data);
        const correctAnswer = document.createElement('div');
        result.textContent = data.score + "/10";
        result.appendChild(correctAnswer);
        const percentageAnswer = document.createElement('div');
        percentageAnswer.textContent = data.score * 10 + "%";
        result.appendChild(percentageAnswer);
    });
}