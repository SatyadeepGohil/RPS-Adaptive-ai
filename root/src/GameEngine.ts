import type { AttackType, DifficultyMode, GameData } from "./types/GameTypes";
import { userGameStore } from "./store/GameStore";

class Game implements GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    modeType: DifficultyMode;
    attackHistory: AttackType[];

    constructor () {
        this.userAttackType = 'none';
        this.opponentAttackType = 'none';
        this.modeType = 'easy';
        this.attackHistory = [];
    }

    processUserAttack(userAttack: AttackType) {
        this.userAttackType = userAttack;
        this.gameModeSelection();
    }

    gameModeSelection (mode = this.modeType) {
        switch(mode) {
            case 'easy':
                this.randomAttack();
                break;
            case 'medium':
                this.adaptiveAttack();
        }
    }

    randomAttack () {
        if (this.userAttackType === 'none') return;

        const randomInt = Math.floor(Math.random() * 3) + 1; // Adding 1 to not get 0
        let opponentAttack: AttackType = 'rock';

        switch(randomInt) {
            case 1:
                opponentAttack = 'rock';
                break;
            case 2:
                opponentAttack = 'paper';
                break;
            case 3:
                opponentAttack = 'scissors';
                break;
        }

        const { setOpponentAttack } = userGameStore.getState();
        this.opponentAttackType = opponentAttack;

        setOpponentAttack(opponentAttack);
    }

    adaptiveAttack() {

    }
}

export default Game;