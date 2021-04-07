let lista = document.querySelector("ul");
let conditionsToPlay;

do {
    let cardNumbers = prompt("Digite a quantidade de cartas \n\n Permitido apenas pares entre 4 e 14");

    let firstConditionToPlay = cardNumbers >= 4 && cardNumbers <= 14;
    let secondConditionToPlay = cardNumbers % 2 === 0;
    conditionsToPlay = firstConditionToPlay && secondConditionToPlay;

    let optionsToBackFace = ["bobrossparrot", "explodyparrot", "fiestaparrot", 
                             "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
    let chosenRandomlyToBackFace = [];

    let count = 0;
    while(count !== (cardNumbers) / 2) {
        console.log(chosenRandomlyToBackFace)
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

    if(conditionsToPlay) {
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
    }
} while (!conditionsToPlay);
