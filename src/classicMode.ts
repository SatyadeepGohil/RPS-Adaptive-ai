import Game from './GameEngine.js';
import { useGameStore } from './store/GameStore.js';
import { AttackType, DifficultyMode, RoundType } from './types/GameType';

const game = new Game();

const { setUserAttack, setDifficultyModeType, setRoundType} = useGameStore.getState();

// ids
let flipper = document.getElementById('flipper') as HTMLElement;
let front = document.getElementById('front') as HTMLElement;
let DifficultyBtn = document.getElementById('difficulty_mode_btn') as HTMLElement;
let roundBtn = document.getElementById('round_btn') as HTMLElement;
let roundCount = document.getElementById('round_counter') as HTMLElement;
let userScore = document.getElementById('user_score') as HTMLElement;
let tieCount = document.getElementById('tie_count') as HTMLElement;
let opponentScore = document.getElementById('opponent_score') as HTMLElement;
let winnerDisplay = document.getElementById('winner_display') as HTMLElement;

// classes
let cards = document.getElementsByClassName('card');

let modeType = ['easy', 'medium', 'hard', 'extreme'];
let roundType = ['infinite', '5', '10', '15'];
// -1 here because 0 isn't suitable in this case. if index is zero then medium is default mode.
let index = { difficultyModeIndex: -1, roundTypeIndex: -1};
let isAnimating = true;


function toggleDifficultyType () {
    index.difficultyModeIndex = (index.difficultyModeIndex + 1) % modeType.length;
    let modeString = modeType[index.difficultyModeIndex];
    setDifficultyModeType(modeString as DifficultyMode);
    DifficultyBtn.innerText = `Difficulty Mode: ${modeString}`;
}

function toggleRoundType () {
    index.roundTypeIndex = (index.roundTypeIndex + 1) % roundType.length;
    let selectedRound = roundType[index.roundTypeIndex];
    setRoundType(selectedRound as RoundType);
    roundBtn.innerText = `Round: ${selectedRound}`;

    updateStatus();
}

// Necessary call because to turn -1 to 0, so easy mode is default
toggleDifficultyType();
toggleRoundType();

DifficultyBtn.addEventListener('click', toggleDifficultyType);
roundBtn.addEventListener('click', toggleRoundType);

function moveSelection (move: AttackType) {
    setUserAttack(move);
    game.processUserAttack();
}

function isAttackType (value: string): value is AttackType {
    return ['rock', 'paper', 'scissors', 'none'].includes(value);
}

function handleCardClick (event: Event) {
    const card = event.currentTarget as HTMLElement;
    const move = card.dataset.attack!;

    if (!move || !isAttackType(move)) return;
    
    moveSelection(move);
    
    setTimeout(showOpponentAttack, 100);
}

for (let card of cards) {
    card.addEventListener('click', handleCardClick);
}

function toggleDisableClass () {
    for (let card of cards) {
        isAnimating ? card.classList.add('disable') : card.classList.remove('disable');
    }
}

function updateStatus () {
    const { currentScore, currentRound, currentWinner } = useGameStore.getState();
    roundCount.innerText = `Current Round: ${currentRound}`;
    userScore.innerText = `User: ${currentScore.user}`;
    tieCount.innerHTML = `Tie: ${currentScore.tie}`;
    opponentScore.innerHTML = `Opponent: ${currentScore.opponent}`;
    winnerDisplay.innerText = `Winner: ${currentWinner}`;
}

// This triggers flip animation to show opponent's attack
function showOpponentAttack () {

    const { opponentAttackType } = useGameStore.getState();
    front.innerHTML = opponentAttackType;

    flipper.classList.add('active');
    isAnimating = true;
    toggleDisableClass();
    updateStatus();

    setTimeout(() => {
        flipper.classList.remove('active');
        isAnimating = false;
        toggleDisableClass();
    }, 2500)
}