import type { AttackType, DifficultyMode, RoundType, Score, GameData } from "./types/GameType";
import { useGameStore } from "./store/GameStore.js";

class Game implements GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    difficultModeType: DifficultyMode;
    roundType: RoundType;
    currentScore: Score;

    constructor () {
        this.userAttackType = 'none';
        this.opponentAttackType = 'none';
        this.difficultModeType = 'easy';
        this.roundType = 'infinite';
        this.currentScore = { user: 0, opponent: 0};
    }

    processUserAttack(userAttack: AttackType) {
        this.userAttackType = userAttack;
        console.log(useGameStore.getState().attackHistory)
        console.log("History Length",useGameStore.getState().attackHistory.length);

        this.gameModeSelection();

        this.processWinner();
    }

    gameModeSelection () {
        const { difficultModeType } = useGameStore.getState();
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

        const { setOpponentAttack } = useGameStore.getState();
        this.opponentAttackType = opponentAttack;

        setOpponentAttack(opponentAttack);
    }

    adaptiveAttack() {
        console.info('adaptive attack initialize');

        const { attackHistory, setOpponentAttack } = useGameStore.getState();

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

    processWinner() {
       const { userAttackType, opponentAttackType, currentScore, setCurrentScore } = useGameStore.getState();

       if (userAttackType === 'none' || userAttackType === opponentAttackType) return;

       if (this.didUserWinRound(userAttackType, opponentAttackType)) {
        setCurrentScore({ ...currentScore, user: currentScore.user + 1});
       }

       if (this.didOpponentWinRound(userAttackType, opponentAttackType)) {
        setCurrentScore({...currentScore, opponent: currentScore.opponent + 1})
       }
    }
}

export default Game;