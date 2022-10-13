const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Hachi";
let gameRunning = false;
let cellIndex;
let myMusic;

initializeGame();


function dogFunction() {
    const dogPic = document.createElement("IMG");
    dogPic.setAttribute("src", "/images/dog.png");
    dogPic.setAttribute("width", "150");
    dogPic.setAttribute("alt", "dog image");
    cells[cellIndex].appendChild(dogPic);

    console.log("PRINTING A DOG !!!");
}

function catFunction() {
    const catPic = document.createElement("IMG");
    catPic.setAttribute("src", "/images/cat.webp");
    catPic.setAttribute("width", "106");
    catPic.setAttribute("alt", "cat image");
    catPic.style.paddingTop = "15px";
    cells[cellIndex].appendChild(catPic);

    console.log("PRINTING A CAT !!!");
}

function confetti(boolean) {
    let newDiv;
    
    if (boolean === true) {     
        const boom = document.createElement("IMG");
        newDiv = document.createElement("div")
        newDiv.setAttribute("id", "fullpage")
        boom.setAttribute("src", "/images/confetti2.gif");
        boom.setAttribute("alt", "confetti");
        newDiv.appendChild(boom);
        document.body.append(newDiv)
        console.log("HORAYYY CONFETTTI !!!")        
    }
    else {
        const elementExists = document.querySelector("#fullpage")
        if(elementExists !== null) {
            elementExists.remove();
        }        
    }  
}



function initializeGame() {
    restartBtn.addEventListener("click", restartGame);
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    

    statusText.innerHTML = `${currentPlayer}'s turn`;

    gameRunning = true;
}

function cellClicked() {
    cellIndex = this.getAttribute("cellIndex"); // this will return 0 to 8
    //   cellIndex === 7
    console.log("cellIndex is: ", cellIndex);
    if (options[cellIndex] != "" || !gameRunning) {
        console.log("OPTIONS ARRAY IN CELL CLICKED FUNCTION IS: ", options);
        // if options with cellindex value empty OR gameRunning is true
        console.log("ERROR: YOU CANT CLICK THE SAME CELL TWICE !!!! OR THIS GAME HAS ENDED");
        return; // if existing options array has 'X' or 'O' value, stop or don't do anything!
    } else {
        updateCell(this, cellIndex); // this the code to update options array that affects line 127-139
        console.log("THIS IS:", this);

        checkWinner();
    }
}


function updateCell(cell, index) { //to display the image of cat and dog
    options[index] = currentPlayer;
    currentPlayer == "Hachi" ? dogFunction() : catFunction(); // display Jerry or dog in clicked cell
    console.log("currentPlayer Line 96 is: ", currentPlayer);

    console.log("OPTIONS ARRAY IS:    ", options);
    //   cell.textContent = currentPlayer; // this code prints 'X' or 'O' in the cells clicked
}

function changePlayer() { //update options array (for the back in order for the code to know wheter is hachi or jerry)
    currentPlayer = currentPlayer == "Hachi" ? "Jerry" : "Hachi";

    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]; // example winConditions = [3,4,5]
        // condition is [3,4,5]
        // console.log("this is condition", condition)

        // winConditions[1] => [3,4,5]
        // condition === [3,4,5]
        // condition[0] === 3
        // let options = ["", "", "", "", "", "", "", "", ""];

        // Purpose of all these cells are to get the value 'X' or 'O' from each index position of winConditions. ie [3,4,5]
        const cellA = options[condition[0]]; // if condition[0] will return '3'. options[3] means (cellA = "")
        // console.log("cellA is : ", cellA)

        const cellB = options[condition[1]]; // (cellB = 4)
        // console.log("cellB is: ", cellB)

        const cellC = options[condition[2]]; // (cellC = 5)
        // console.log("cellC is: ", cellC)

        // [0, 1, 2],
        // [3, 4, 5],
        // [6, 7, 8],
        // [0, 3, 6],
        // [1, 4, 7],
        // [2, 5, 8],
        // [0, 4, 8],
        // [2, 4, 6],

        if (cellA == "" || cellB == "" || cellC == "") {
            // if at least one of cellA or cellB or cellC is empty, continue
            console.log("THIS IS LINE 143");
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            // if all the cells are not empty and have the same value, we have a winner
            console.log("THIS IS LINE 148");
            roundWon = true;
            break; // loop will break/stop
        }
    }

    // if continue from line 139, the code will continue to below:
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        playMusic();
        confetti(true);
        gameRunning = false;
        console.log("Game Over");
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        gameRunning = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    confetti(false)
    
    currentPlayer = "Hachi";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    gameRunning = true;
}

function playMusic() {
    let audio = new Audio("childrenyay.mp3");
    audio.play()
}





