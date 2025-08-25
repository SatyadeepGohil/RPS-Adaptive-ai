import type { AttackType, DifficultyMode, GameData } from "./types/GameType";
import { userGameStore } from "./store/GameStore.js";

class Game implements GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    difficultModeType: DifficultyMode;

    constructor () {
        this.userAttackType = 'none';
        this.opponentAttackType = 'none';
        this.difficultModeType = 'easy';
    }

    processUserAttack(userAttack: AttackType) {
        this.userAttackType = userAttack;
        console.log(userGameStore.getState().attackHistory)
        console.log("History Length",userGameStore.getState().attackHistory.length);

        this.gameModeSelection();
    }

    gameModeSelection () {
        const { difficultModeType } = userGameStore.getState();
        switch(difficultModeType) {
            case 'easy':
                this.randomAttack();
                break;
            case 'medium':
                this.adaptiveAttack();
        }
    }

    randomAttack () {
        if (this.userAttackType === 'none') return;
        console.info('randomAttack running');

        const randomInt = Math.floor(Math.random() * 3);
        const choices: AttackType[] = ['rock', 'paper', 'scissors'];
        const opponentAttack = choices[randomInt];

        const { setOpponentAttack } = userGameStore.getState();
        this.opponentAttackType = opponentAttack;

        setOpponentAttack(opponentAttack);
    }

    adaptiveAttack() {
        console.info('adaptive attack initialize');

        const { attackHistory, setOpponentAttack } = userGameStore.getState();

        if (attackHistory.length < 5) return this.randomAttack();

        console.info('adaptiveAttack pass the histroy length check.')

        const counts = { rock: 0, paper: 0, scissors: 0} as Record<AttackType, number>;

        for (let move of attackHistory) counts[move]++;

        const mostCommon = Object.entries(counts).reduce((a, b) => 
            b[1] > a[1] ? b : a
        )[0] as AttackType;

        switch(mostCommon) {
            case 'rock':
                this.opponentAttackType = 'paper';
                break;
            case 'paper':
                this.opponentAttackType = 'scissors';
                break;
            case 'scissors':
                this.opponentAttackType = 'rock';
                break;
        }

        setOpponentAttack(this.opponentAttackType);
    }
}

export default Game;