if (!localStorage.getItem("score")) localStorage.setItem("score", 1);
let scoreLocalStorge = parseInt(localStorage.getItem("score"));
let begin = false;
let easyArray = [
    "Coding",
    "Funny",
    "Github",
    "Hello",
    "Code",
    "Town",
    "Python",
    "Roles",
    "Test",
    "Rust",
    "Task",
    "Scala",
];
let normalArray = [
    "Cascade",
    "Styling",
    "Runner",
    "Playing",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Leetcode",
    "Internet",
];
let hardArray = [
    "Programming",
    "Javascript",
    "Destructuring",
    "Paradigm",
    "Documentation",
    "Working",
    "Dependencies",
];
let words = easyArray;
// Setting Levels
const lvls = {
    Easy: 5,
    Normal: 3,
    Hard: 2,
};

// Default Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let threeLvlDiv = document.querySelector(".three-lvl");
let threeLvl = document.querySelectorAll(".three-lvl span");
let arrayOfLvl = Array.from(threeLvl);
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;
input.onpaste = function() {
    return false;
};
startButton.onclick = function() {
    this.remove();
    threeLvlDiv.remove();
    input.focus();
    genWords();
};
arrayOfLvl.forEach((ele) => {
    ele.addEventListener("click", function(e) {
        arrayOfLvl.forEach((ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        defaultLevelName = e.currentTarget.dataset.lvl;
        choseLvlArray(e.currentTarget.dataset.lvl);
        setNewValue(e.currentTarget.dataset.lvl);
    });
});

function setNewValue(newValue) {
    defaultLevelName = newValue;
    lvlNameSpan.innerHTML = newValue;
    defaultLevelSeconds = lvls[newValue];
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
}

function choseLvlArray(lvl1) {
    if (lvl1 == "Easy") {
        words = easyArray;
        scoreTotal.innerHTML = words.length;
    } else if (lvl1 === "Normal") {
        words = normalArray;
        scoreTotal.innerHTML = words.length;
    } else {
        words = hardArray;
        scoreTotal.innerHTML = words.length;
    }
}

function genWords() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = "";
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    if (!begin) {
        setTimeout(() => {
            begin = true;
            startPlay();
        }, 3000);
    } else startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = "";
                // Increase Score
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    // Call Generate Word Function
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("Congratz");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove Upcoming Words Box
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                localStorage.setItem(localStorage.getItem("score"), new Date());
                localStorage.setItem("score", (scoreLocalStorge + 1).toString());
            }
        }
    }, 1000);
}