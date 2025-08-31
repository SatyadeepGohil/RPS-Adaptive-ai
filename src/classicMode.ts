import Game from './GameEngine.js';
import { useGameStore } from './store/GameStore.js';
import { AttackType, DifficultyMode, RoundType } from './types/GameType';

// Initialization
const game = new Game();
const { setUserAttack, setDifficultyModeType, setRoundType } = useGameStore.getState();

// DOM Elements
const flipper       = document.getElementById('flipper') as HTMLElement;
const front         = document.getElementById('front') as HTMLElement;
const DifficultyBtn = document.getElementById('difficulty_mode_btn') as HTMLElement;
const roundBtn      = document.getElementById('round_btn') as HTMLElement;
const roundCount    = document.getElementById('round_counter') as HTMLElement;
const userScore     = document.getElementById('user_score') as HTMLElement;
const tieCount      = document.getElementById('tie_count') as HTMLElement;
const opponentScore = document.getElementById('opponent_score') as HTMLElement;
const overlay       = document.getElementById('overlay') as HTMLElement;
const winnerModal   = document.getElementById('winner_modal') as HTMLElement;
const winnerText    = document.getElementById('winner_text') as HTMLElement;
const playAgainBtn  = document.getElementById('play_again_btn') as HTMLElement;

// Card collection
const cards = document.getElementsByClassName('card');

// State
const modeType  = ['easy', 'medium', 'hard', 'extreme'];
const roundType = ['infinite', '5', '10', '15'];

// -1 so first toggle sets index to 0 and applies defaults
const index = { difficultyModeIndex: -1, roundTypeIndex: -1 };

let isAnimating = true;

// Functions

function toggleDifficultyType(): void {
    index.difficultyModeIndex = (index.difficultyModeIndex + 1) % modeType.length;
    const modeString = modeType[index.difficultyModeIndex];
    setDifficultyModeType(modeString as DifficultyMode);
    DifficultyBtn.innerText = `Difficulty Mode: ${modeString}`;
}

function toggleRoundType(): void {
    index.roundTypeIndex = (index.roundTypeIndex + 1) % roundType.length;
    const selectedRound = roundType[index.roundTypeIndex];
    setRoundType(selectedRound as RoundType);
    roundBtn.innerText = `Round: ${selectedRound}`;
    updateStatus();
}

function moveSelection(move: AttackType): void {
    setUserAttack(move);
    game.processUserAttack();
}

function isAttackType(value: string): value is AttackType {
    return ['rock', 'paper', 'scissors', 'none'].includes(value);
}

function handleCardClick(event: Event): void {
    const card = event.currentTarget as HTMLElement;
    const move = card.dataset.attack!;

    if (!move || !isAttackType(move)) return;
    
    moveSelection(move);
    setTimeout(showOpponentAttack, 100);
}

function toggleCards(): void {
    for (const card of cards) {
        isAnimating 
            ? card.classList.add('disable') 
            : card.classList.remove('disable');
    }
}

function toggleClass(el: HTMLElement, className: string, toggler: boolean): void {
    toggler ? el.classList.add(className) : el.classList.remove(className);
}

function winnerModalUpdate(): void {
    const { currentScore } = useGameStore.getState();
    let winnerChecker;

    if (currentScore.user === currentScore.opponent) winnerChecker = 'TIE!';
    if (currentScore.user > currentScore.opponent) winnerChecker = 'You Win!';
    else { winnerChecker = 'Opponent Win!'}

    winnerText.innerText = `
    ${winnerChecker}
    \nUser: ${currentScore.user}
    \nOpponent: ${currentScore.opponent}
    \nTie: ${currentScore.tie}
    `;
}

function handlePlayAgain() {
    game.reset();
    updateStatus();
    toggleClass(overlay, 'active', false);
    toggleClass(winnerModal, 'active', false);
}

function updateStatus(): void {
    const { currentScore, currentRound } = useGameStore.getState();
    roundCount.innerText    = `Current Round: ${currentRound}`;
    userScore.innerText     = `User: ${currentScore.user}`;
    tieCount.innerText      = `Tie: ${currentScore.tie}`;
    opponentScore.innerText = `Opponent: ${currentScore.opponent}`;
}

// Flip animation to reveal opponent's attack
function showOpponentAttack(): void {
    const { opponentAttackType } = useGameStore.getState();
    front.innerText = opponentAttackType;

    flipper.classList.add('active');
    isAnimating = true;
    if(game.isRoundLimitReached()) {
        toggleClass(overlay, 'active', true);
        toggleClass(winnerModal, 'active', true);
        winnerModalUpdate();
    }
    toggleCards();
    updateStatus();

    setTimeout(() => {
        flipper.classList.remove('active');
        isAnimating = false;
        toggleCards();
    }, 2500);
}

// Event Listeners & Defaults

// Necessary to set default (easy mode & first round option)
toggleDifficultyType();
toggleRoundType();

DifficultyBtn.addEventListener('click', toggleDifficultyType);
roundBtn.addEventListener('click', toggleRoundType);
playAgainBtn.addEventListener('click', handlePlayAgain);

for (const card of cards) {
    card.addEventListener('click', handleCardClick);
}