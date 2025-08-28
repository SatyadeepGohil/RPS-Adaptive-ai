import type { AttackType } from "./types/GameType";
import { useGameStore } from "./store/GameStore.js";

class Game {
    private get state() {
        return useGameStore.getState();
    }

    processUserAttack() {
        const { currentWinner, setCurrentWinner } = this.state;

        if (currentWinner !== '') setCurrentWinner('???');

        this.gameModeSelection();
        this.updateRound();
        this.updateScore();
        this.checkWinningConditions();
    }

    gameModeSelection() {
        const { difficultModeType } = this.state;

        switch(difficultModeType) {
            case 'easy':
                this.randomAttack();
                break;
            case 'medium':
                this.adaptiveAttack();
        }
    }

    checkWinningConditions() {
        const { roundType, currentRound, setCurrentWinner, currentScore } = this.state;
        if (roundType === 'infinite' || currentRound < 5) return;

        const doesUserWin = currentScore.user > currentScore.opponent ? true : false;
        const winnerName = doesUserWin ? 'You Win' : 'Opponent Win'

        switch(roundType) {
            case '5':
                if (currentRound === 5) setCurrentWinner(winnerName);
                break;
            case "10":
                if (currentRound === 10) setCurrentWinner(winnerName);
                break;
            case "15":
                if (currentRound === 15) setCurrentWinner(winnerName);
                break;
        }
    }

    isCryptoAvaliable() {
        return (
            typeof window !== 'undefined' && !!window.crypto &&
            typeof window.crypto.getRandomValues === 'function'
        );
    }

    randomAttack() {
        const { setOpponentAttack, userAttackType } = this.state;

        if (userAttackType === 'none') return;

        const choices: AttackType[] = ['rock', 'paper', 'scissors'];
        let randomValue;

        if (this.isCryptoAvaliable()) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            randomValue = array[0] % choices.length;
            console.log('Secure random:', array[0]);
        } else {
            console.warn('crypto.getRandomValues not avaliable, falling back to Math.random()');
            randomValue = Math.floor(Math.random() * 3);
        }

        const opponentAttack = choices[randomValue];

        setOpponentAttack(opponentAttack);
    }

    adaptiveAttack() {
        console.info('adaptive attack initialize');

        const { attackHistory, setOpponentAttack } = this.state;

        if (attackHistory.length < 5) return this.randomAttack();

        console.info('adaptiveAttack pass the histroy length check.')

        const counts = { rock: 0, paper: 0, scissors: 0} as Record<AttackType, number>;

        for (let move of attackHistory) counts[move]++;

        const mostCommon = Object.entries(counts).reduce((a, b) => 
            b[1] > a[1] ? b : a
        )[0] as AttackType;

        let commonMove: AttackType;

        switch(mostCommon) {
            case 'rock':
                commonMove = 'paper';
                break;
            case 'paper':
                commonMove = 'scissors';
                break;
            case 'scissors':
                commonMove = 'rock';
                break;
            default:
                throw new Error(`Not Valid Move: ${mostCommon}`)
        }

        setOpponentAttack(commonMove);
    }

    didUserWinRound(user: AttackType, opponent: AttackType): boolean {
        return (
            (user === 'rock' && opponent === 'scissors') ||
            (user === 'paper' && opponent === 'rock') ||
            (user === 'scissors' && opponent === 'paper')
        );
    }

    didOpponentWinRound(user: AttackType, opponent: AttackType): boolean {
        return (
            (opponent === 'rock' && user === 'scissors') ||
            (opponent === 'paper' && user === 'rock') ||
            (opponent === 'scissors' && user === 'paper')
        );
    }

    updateScore() {
       const { userAttackType, opponentAttackType, currentScore, setCurrentScore } = this.state;

       if (userAttackType === 'none') return;

       if (userAttackType === opponentAttackType) {
        setCurrentScore({ ...currentScore, tie: currentScore.tie + 1});
       }

       if (this.didUserWinRound(userAttackType, opponentAttackType)) {
        setCurrentScore({ ...currentScore, user: currentScore.user + 1});
       }

       if (this.didOpponentWinRound(userAttackType, opponentAttackType)) {
        setCurrentScore({...currentScore, opponent: currentScore.opponent + 1})
       }
    }

    updateRound() {
        const { currentRound ,setCurrentRound, roundType } = this.state;
        if (roundType === 'infinite') return;
        setCurrentRound(currentRound + 1);
    }
}

export default Game;