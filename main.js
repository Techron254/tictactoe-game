

const overlay = document.querySelector('.overlay');
const namesModal = document.querySelector('.take-player-names-modal');
const boxes = document.querySelectorAll('[class ^="box"]');
let player1Name = document.querySelector('#player1-name');
let player2Name = document.querySelector('#player2-name');
    player1Name.textContent = "Player 1";
    player2Name.textContent = "Player 2";
let playerNumber = document.querySelector(".player-number")
    playerNumber.innerText = `${player1Name.textContent}`

// Take player names from the form modal and append them to the DOM.
function takePlayerNames(){

        const submitPlayerNamesButton = document.querySelector('#submit-player-names');
        submitPlayerNamesButton.addEventListener('click', () => {


            let player1NameInput = document.querySelector('#player1').value;
            let player2NameInput = document.querySelector('#player2').value;
            if (player1NameInput === '' || player2NameInput === '') {
                alert('Please enter names for both players.');
                return;
            }

            player1Name.textContent = player1NameInput;
            player2Name.textContent = player2NameInput;

            overlay.style.display = 'none';
            namesModal.style.display = 'none';
});
};
// Resets everything back to default
function resetGame(){
    document.querySelector('#player1-name').textContent = "Player 1";
            document.querySelector('#player2-name').textContent = "Player 2";
    let player1NameInput = document.querySelector('#player1');
    let player2NameInput = document.querySelector('#player2');
    player1NameInput.value = '';
    player2NameInput.value = '';

    const boxes = document.querySelectorAll('[class ^="box"]');
    for(box of boxes){
        box.innerText = '';
        box.classList.remove("active");
    };
    player1Name.classList.remove("active");
    player2Name.classList.remove("active");

    playerNumber.innerText = `${player1Name.textContent}`
    playerNumber.style.color = "aquamarine";
    document.querySelector(".player-turn").style.color = "aquamarine";
    [...boxes].forEach((box)=>{
        box.style.pointerEvents = "auto";
    });

}

// Take player names and append them on the DOM and prevent the default form action, also initiate the gameplay.
function startGame(){
    resetGame();
        overlay.style.display = 'block';
        namesModal.style.display = 'block';
    takePlayerNames();
    gamePlay();
    }


    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    });


const startGameButton = document.querySelector('button.start-game');
startGameButton.addEventListener('click', startGame);
// Listen for clicks in the boxes and marks them accordingly, and check the winner.
function gamePlay(){
    let firstPlayer = false;
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if(firstPlayer === false){
                box.innerText = 'X';
                box.style.color = "aquamarine";
                player1Name.classList.remove("active");
                player2Name.classList.add("active");
                playerNumber.innerText = `${player2Name.textContent}`
                playerNumber.style.color = "#ff8800";
                document.querySelector(".player-turn").style.color = "#ff8800";
                firstPlayer = true;

            } else {
            box.innerText = 'O';
            box.style.color = "#ff8800";
            player2Name.classList.remove("active");
            player1Name.classList.add("active");
             playerNumber.innerText = `${player1Name.textContent}`
             playerNumber.style.color = "aquamarine"
             document.querySelector(".player-turn").style.color = "aquamarine";
            firstPlayer = false ;

        }

        checkWinner();

    }, {once: true});


})};

//Check the rows, columns and diagonals for a winning combination

const showWinnerModal = document.querySelector(".show-winner");
function checkWinner(){

    const board = [
        [boxes[0], boxes[1], boxes[2]],
        [boxes[3], boxes[4], boxes[5]],
        [boxes[6], boxes[7], boxes[8]]
    ];
    function checkLines(a,b,c){
        if (a.textContent !== "" && a.textContent === b.textContent  && b.textContent === c.textContent){
            visualizeWinner(a,b,c);
            [...boxes].forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            setTimeout(() => {

                if (a.textContent === "X") {

                    showWinnerModal.firstElementChild.textContent =
                        `${player1Name.textContent} wins!`;

                } else {

                    showWinnerModal.firstElementChild.textContent =
                        `${player2Name.textContent} wins!`;
                }

                showWinnerModal.showModal();

            }, 500);
        return true
        }
        return false;
    }
        //  Highlight the winning boxes
    function visualizeWinner(a,b,c){
        setTimeout(()=>a.classList.add("active"),100);
        setTimeout(()=>b.classList.add("active"),200);
        setTimeout(()=>c.classList.add("active"),300);
    }



//   Check rows
    for (let r = 0; r < 3; r++){
    if (checkLines(board[r][0], board[r][1], board[r][2])){
        return;
    };
    }

//   Check columns
    for (let c = 0; c < 3; c++){
    if(checkLines(board[0][c],board[1][c],board[2][c])){
        return;
    };
    }

    // Check diagonals
    if(checkLines(board[0][0], board[1][1], board[2][2])){
        return;
    }
    if(checkLines(board[0][2], board[1][1], board[2][0])){
        return;
    }

    // check for a tie

    if([...boxes].every (box => box.textContent.trim() !== "")){
        setTimeout(()=>{
        showWinnerModal.firstElementChild.textContent = "It's a tie!";
        showWinnerModal.showModal();
        }, 500);
        }
}

const newGameButton = document.querySelector("#new-game");
    newGameButton.addEventListener("click", ()=>{
    showWinnerModal.close();
    resetGame();
})
const skipButton = document.querySelector("#skip");
skipButton.addEventListener("click", () => {
    namesModal.style.display = "none";
    overlay.style.display = "none";
    gamePlay();
})
