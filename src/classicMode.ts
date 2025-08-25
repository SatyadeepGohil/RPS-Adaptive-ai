import Game from './GameEngine.js';
import { userGameStore } from './store/GameStore.js';
import { AttackType, DifficultyMode } from './types/GameType';

let game = new Game();
let { setUserAttack, setDifficultyModeType} = userGameStore.getState();
let modeBtn = document.getElementById('difficulty_mode_btn') as HTMLElement;
let mode = ['easy', 'medium', 'hard', 'extreme'];
// -1 here because 0 isn't suitable in this case. if index is zero then medium is default mode.
let index = -1; 

let cards = document.getElementsByClassName('card');
let flipper = document.querySelector('.flipper') as HTMLElement;
let front = document.querySelector('.front') as HTMLElement;

function moveSelection (move: string) {
    setUserAttack(move as AttackType);
    game.processUserAttack(move as AttackType);
}

// This triggers flip animation to show opponent's attack
function showOpponentAttack () {

    const { opponentAttackType } = userGameStore.getState();
    front.innerHTML = opponentAttackType;

    disableCards();
    flipper.classList.add('active');

    setTimeout(() => {
        flipper.classList.remove('active');
        enableCards();
    }, 2000)
}

function enableCards() {
    for (let card of cards) {
        card.classList.remove('disable');
        card.classList.add('enable')
        card.addEventListener('click',handleCardClick);
    }
}

enableCards();

function disableCards() {
    for (let card of cards) {
        card.classList.remove('enable');
        card.classList.add('disable');
        card.removeEventListener('click', handleCardClick);
    }
}

function handleCardClick (event: Event) {
    const card = event.currentTarget as HTMLElement;
    const move = card.dataset.attack!;
    moveSelection(move);

    setTimeout(showOpponentAttack, 100);
}


function toggleMode () {
    index = (index + 1) % mode.length;
    let modeString = mode[index];
    setDifficultyModeType(modeString as DifficultyMode);
    modeBtn.innerText = `Difficulty Mode: ${mode[index]}`;
}

// Necessary call because to turn -1 to 0, so easy mode is default
toggleMode();

modeBtn.addEventListener('click', toggleMode);