const startButton = document.getElementById('startButton');
const titleScreen = document.querySelector('.title-screen');
const questionScreen = document.getElementById('questionScreen');


startButton.addEventListener('click', () => {
    // titleScreen.style.display = 'block';
    questionScreen.style.display = 'block';
    displayQuestion();
    startTimer();
});




const sciQuestions = [
    {
        question: 'The concept of gravity was discovered by which famous physicist?',
        options: ['Galileo Galilei', 'Albert Einstein', 'Isaac Newton', 'Ernest Rutherford'],
        answer: 2 //'Isaac Newton'
    },
    {
        question: 'How many colors are in the rainbow?',
        options: [3, 10, 25, 7],
        answer: 3    //7
    },
    {
        question: `On what continent will you not find bees?`,
        options: ['North America', 'Asia', 'Anartica', 'Europe'],
        answer:  2   //'Anartica'
    },
    {
        question: 'How long is the memory of a goldfish?',
        options: ['Five hours', 'A few seconds', ' A month', 'Several days'],
        answer:  3   //'Several days'
    },
    {
        question: 'How does fat leave your body when you lose weight?',
        options: ['Sweat, breath, and urine', 'Calorie deficient diet', 'Weight lifting', 'Increased water intake'],
        answer:  0  //'Sweat, breath, and urine'
    },
    {
        question: 'Which blood tyoe is the rarest?',
        options: ['O negative', 'A positive', 'AB negative', 'AB positive'],
        answer:  2   //'AB negative'
    },
    {
        question: 'What is the only planet that spins clockwise?',
        options: ['Venus', 'Mercury', 'Neptune', 'Mars'],
        answer:    0  //'Venus'
    },
    {
        question: 'What was the name of the first man-made satellite launched by the Soviet Union in 1957?',
        options: ['Laika', 'Sputnik 1', 'Sputnik', 'Sputnik 0'],
        answer: 1  //'Sputnik 1'
    },
    {
        question: 'At what temperature are Celsius and Fahrenheit equal?',
        options: [-40, 0, 32, -28],
        answer:  0  //-40
    },
    {
        question: 'What is chalk made of?',
        options: ['Sandstone', 'Limestone', 'Basalt', 'Shale'],
        answer:  1  //'Limestone'
    }

];


let currentQuestionIndex = 0;
let score = 0;
let timer;



function displayQuestion() {
    const questionNumberElement = document.getElementById('questionNumber');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    // Clears previous question 
    questionNumberElement.textContent = '';
    questionElement.textContent = '';
    optionsElement.innerHTML = '';

    // Displays question number
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;

    // Displays question text
    questionElement.textContent = sciQuestions[currentQuestionIndex].question;

    // Displays options, why I used a for loop, to iterate thru the options
    const options = sciQuestions[currentQuestionIndex].options;
    for (let i = 0; i < options.length; i++) {
        const optionButton = document.createElement('button');
        optionButton.textContent = options[i];
        optionButton.addEventListener('click', () => checkAnswer(i));
        optionsElement.appendChild(optionButton);
    }

    startTimer();

}


// clear interval is to make sure any previous timers are vleared before starting new one
//setInterval is self explanatory, sets up timer to run 5 seconds for each question
// Below, timer function to increment currentquestionindex to move to next question
//then it checks if there are more questions left, if so, call displayquestion func
//else endgame function is called.

function startTimer() {
    clearInterval(timer);

    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Time left: 5';

    let timeLeft = 5; 

    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft >= 0) {
            timerElement.textContent = `Time left: ${timeLeft}`;
        } else {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < sciQuestions.length) {
                displayQuestion();
            } else {
                endGame();
            }
        }
    }, 1000); 


}



function checkAnswer(selectedOptionIndex) {

    const correctAnswerIndex = sciQuestions[currentQuestionIndex].answer;

    if(selectedOptionIndex === correctAnswerIndex) {
        score += 10;
    }

    currentQuestionIndex++;

    if(currentQuestionIndex < sciQuestions.length) {
        displayQuestion();
    } else {
        
        endGame();

    }
}


function endGame() {
    questionScreen.style.display = 'none'; // Hides the question screen
    const resultScreen = document.querySelector('.result-screen');
    const resultMessage = document.getElementById('resultMessage');
    const scoreDisplay = document.getElementById('scoreDisplay');

    // Calculate and display the final result message and score
    if (score >= 70) {
        resultMessage.textContent = 'You passed!';
    } else {
        resultMessage.textContent = 'Better luck next time!';
    }
    scoreDisplay.textContent = `Your Score: ${score}`;

    resultScreen.style.display = 'block'; // Display the result screen
}