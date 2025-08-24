import Game from './GameEngine.js';
import { userGameStore } from './store/GameStore.js';
let game = new Game();
let { setUserAttack, setModeType } = userGameStore.getState();
let modeBtn = document.getElementById('difficulty_mode_btn');
let mode = ['easy', 'medium', 'hard', 'extreme'];
// -1 here because 0 isn't suitable in this case. if index is zero then medium is default mode.
let index = -1;
let cards = document.getElementsByClassName('card');
let flipper = document.querySelector('.flipper');
let front = document.querySelector('.front');
function moveSelection(move) {
    setUserAttack(move);
    game.processUserAttack(move);
}
// This triggers flip animation to show opponent's attack
function showOpponentAttack() {
    const { opponentAttackType } = userGameStore.getState();
    front.innerHTML = opponentAttackType;
    flipper.classList.add('active');
    setTimeout(() => {
        flipper.classList.remove('active');
    }, 2000);
}
for (let card of cards) {
    card.addEventListener('click', () => {
        const move = card.dataset.attack;
        console.log(move);
        moveSelection(move);
        setTimeout(showOpponentAttack, 100);
    });
}
function toggleMode() {
    index = (index + 1) % mode.length;
    let modeString = mode[index];
    setModeType(modeString);
    modeBtn.innerText = `Difficulty Mode: ${mode[index]}`;
}
// Necessary call because to turn -1 to 0, so easy mode is default
toggleMode();
modeBtn.addEventListener('click', toggleMode);
//# sourceMappingURL=classicMode.js.map