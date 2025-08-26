import Game from './GameEngine.js';
import { useGameStore } from './store/GameStore.js';
import { AttackType, DifficultyMode } from './types/GameType';

const game = new Game();

const { setUserAttack, setDifficultyModeType} = useGameStore.getState();

let modeBtn = document.getElementById('difficulty_mode_btn') as HTMLElement;
let roundBtn = document.getElementById('round_btn') as HTMLElement;
let scoreContianer = document.getElementById('score') as HTMLElement;

let modeType = ['easy', 'medium', 'hard', 'extreme'];
let roundType = ['infinite', '5', '10', '15'];
// -1 here because 0 isn't suitable in this case. if index is zero then medium is default mode.
let index = { difficultyModeIndex: -1, roundTypeIndex: -1};

let cards = document.getElementsByClassName('card');
let flipper = document.querySelector('.flipper') as HTMLElement;
let front = document.querySelector('.front') as HTMLElement;

function toggleDifficultyType () {
    index.difficultyModeIndex = (index.difficultyModeIndex + 1) % modeType.length;
    let modeString = modeType[index.difficultyModeIndex];
    setDifficultyModeType(modeString as DifficultyMode);
    modeBtn.innerText = `Difficulty Mode: ${modeString}`;
}

function toggleRoundType () {
    index.roundTypeIndex = (index.roundTypeIndex + 1) % roundType.length;
    let selectedRound = roundType[index.roundTypeIndex];
    roundBtn.innerText = `Round: ${selectedRound}`;
}

// Necessary call because to turn -1 to 0, so easy mode is default
toggleDifficultyType();
toggleRoundType();

modeBtn.addEventListener('click', toggleDifficultyType);
roundBtn.addEventListener('click', toggleRoundType);

function moveSelection (move: string) {
    setUserAttack(move as AttackType);
    game.processUserAttack(move as AttackType);
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

function updateScore () {
    const { currentScore } = useGameStore.getState();
    console.log(currentScore);
    scoreContianer.innerText = `Current Score: User: ${currentScore.user} point, Opponent: ${currentScore.opponent} point`;
}
// This triggers flip animation to show opponent's attack
function showOpponentAttack () {

    const { opponentAttackType } = useGameStore.getState();
    front.innerHTML = opponentAttackType;

    disableCards();
    flipper.classList.add('active');
    updateScore();

    setTimeout(() => {
        flipper.classList.remove('active');
        enableCards();
    }, 2500)
}