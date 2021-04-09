const lista = document.querySelector("ul");
let cardNumbers;
let conditionsToPlay;

do {
    cardNumbers = prompt("Digite a quantidade de cartas \n\n Permitido apenas pares entre 4 e 14");

    let firstConditionToPlay = cardNumbers >= 4 && cardNumbers <= 14;
    let secondConditionToPlay = cardNumbers % 2 === 0;
    conditionsToPlay = firstConditionToPlay && secondConditionToPlay;

} while (!conditionsToPlay);

const optionsToBackFace = ["bobrossparrot", "explodyparrot", "fiestaparrot", 
                            "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
let chosenRandomlyToBackFace = [];

let count = 0;
while(count !== (cardNumbers) / 2) {
    let indexToChooseRandomlyACard = Math.round(Math.random() * (optionsToBackFace.length - 1));

    let indexToChooseRandomlyAPositionOdd  = Math.round(Math.random() * (cardNumbers - 1));
    let indexToChooseRandomlyAPositionEven = Math.round(Math.random() * (cardNumbers - 1));

    let areDiffPositions = indexToChooseRandomlyAPositionEven !== indexToChooseRandomlyAPositionOdd;
    let areDefined       = chosenRandomlyToBackFace[indexToChooseRandomlyAPositionEven] == undefined && 
    chosenRandomlyToBackFace[indexToChooseRandomlyAPositionOdd] == undefined;

    if(areDiffPositions && areDefined) {

    chosenRandomlyToBackFace[indexToChooseRandomlyAPositionOdd] = optionsToBackFace[indexToChooseRandomlyACard];
    chosenRandomlyToBackFace[indexToChooseRandomlyAPositionEven] = optionsToBackFace[indexToChooseRandomlyACard];

    optionsToBackFace.splice(indexToChooseRandomlyACard, 1);
    count++;
    };
};

for(let i = 0; i < cardNumbers; i++) {
lista.innerHTML += `<li>      
       <div class="front-face face">
               <img src="images/front.png">
       </div>
       <div class="back-face face">
               <img src="images/${chosenRandomlyToBackFace[i]}.gif"
       </div>
   </li>`;
}


const itemsArray = document.querySelectorAll("li");
let chosenCards = [];
let countChosenCards = 0;

function play(event) {
    const item = event.currentTarget;
    let cardOne;
    let cardTwo;
    let equalCards;

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

