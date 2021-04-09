const itemsArray = document.querySelectorAll("li");
let firstTime = true;
let seconds = 0;
let chosenCards = [];
let countChosenCards = 0;
let id;

function startTheCount() {
    const id = setInterval(function(){
                                        seconds++;
                                        let time = document.querySelector("span");
                                        time.innerHTML = `${seconds}s`;
                                    }, 1000);
    return id;
}

function removeListener() {
    itemsArray.forEach(item => {
        item.removeEventListener("click", play);
    });
};

function addListener() {
    itemsArray.forEach(item => {
        item.addEventListener("click", play);
    });
}

addListener();

function play(event) {
    const item = event.currentTarget;
    let cardOne;
    let cardTwo;
    let equalCards;

    if(firstTime) {
        firstTime = false;
        id = startTheCount();
    }

    if(!chosenCards.includes(item)) {
        flip(item);
        chosenCards.push(item);
        countChosenCards++;
    } else if(chosenCards.includes(item)) {
        return console.log('carta ja foi escolhida');
    }

    let even = countChosenCards % 2 === 0;
    if(even) {

        cardTwo = chosenCards[chosenCards.indexOf(item)];
        cardOne = chosenCards[chosenCards.indexOf(item) - 1];
        equalCards = verifyCards(cardOne, cardTwo);
        if(!equalCards) {
            chosenCards.splice(chosenCards.length - 2, 2);
        }
        if(equalCards) {
            endgame(id);
        }
    }
};

function verifyCards(cardOne, cardTwo) {
    let cardOneImage = cardOne.children[1].children[0].getAttribute("src");
    let cardTwoImage = cardTwo.children[1].children[0].getAttribute("src");

    removeListener();
    if(cardOneImage !== cardTwoImage) {
        setTimeout(function() {
            flip(cardOne);
            flip(cardTwo);
            addListener();
        }, 1000);
        return false;
    } else {
        setTimeout(addListener, 400);
        return true;
    };
};

function flip(item) {
    let face = item.children[0];
    let back = item.children[1];

    if(face.classList.contains("front-face") === true) {
        face.classList.remove("front-face");
        face.classList.add("back-face");
        back.classList.add("front-face");
        back.classList.remove("back-face");
    } else {
        face.classList.remove("back-face");
        face.classList.add("front-face");
        back.classList.add("back-face");
        back.classList.remove("front-face");
    };
};


function endgame(id) {

    if(chosenCards.length === cardNumbers) {
        clearInterval(id);
        setTimeout(alert, 500,`Voce ganhou em ${countChosenCards} jogadas! \n\n  demorou ${seconds} segundos!`);
        setTimeout(function () {restart()}, 1000);
    }
}

function restart() {
    const userAnswer = prompt("Gostaria de comecar o jogo de novo?");
    if(userAnswer === 'sim') {
        location.reload();
    };
};