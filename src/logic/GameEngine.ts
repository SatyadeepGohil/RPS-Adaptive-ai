import type { AttackType } from "../types/gameType.js";
import { gameState, setOpponentAttack, setCurrentWinner, setCurrentRound, setCurrentScore } from "../store/gameStore.js";

class Game {
    // State Accessor
    private get state() {
        return gameState.state;
    }

    // Main Entry Point
    processUserAttack() {
        this.gameModeSelection();
        this.updateRound();
        this.updateScore();
        this.checkWinningConditions();
    }

    // Game Mode Logic
    gameModeSelection() {
        const { difficultModeType } = this.state;

        switch (difficultModeType) {
            case 'easy':
                this.randomAttack();
                break;
            case 'medium':
                this.adaptiveAttack();
                break;
        }
    }

    // Attack Generation
    isCryptoAvaliable() {
        return (
            typeof window !== 'undefined' &&
            !!window.crypto &&
            typeof window.crypto.getRandomValues === 'function'
        );
    }

    randomAttack() {
        const { userAttackType } = this.state;

        if (userAttackType === 'none') return;

        const choices: AttackType[] = ['R', 'P', 'S'];
        let randomValue: number;

        if (this.isCryptoAvaliable()) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            randomValue = array[0] % choices.length;
        } else {
            console.warn('crypto.getRandomValues not available, falling back to Math.random()');
            randomValue = Math.floor(Math.random() * 3);
        }

        const opponentAttack = choices[randomValue];
        setOpponentAttack(opponentAttack);
    }

    adaptiveAttack() {
        const { attackHistory } = this.state;

        if (attackHistory.length < 5) return this.randomAttack();
        const recentMoves = attackHistory.slice(-6, -1);
        const lastMove = recentMoves[recentMoves.length - 1];
        console.info('Recent Moves', recentMoves);

        let streakCount = 1;
        for (let i = recentMoves.length; i >= 0; i--) {
            if (recentMoves[i] === lastMove) {
                streakCount++;
            } else {
                break;
            }
        }

        console.info('Last Move:', lastMove, 'Streak:', streakCount);

        // Count occurrences
        const counts = { R: 0, P: 0, S: 0 } as Record<AttackType, number>;
        for (const move of recentMoves) counts[move]++;

        // Apply weights to recent and common move
        /* interface weightType {
            rW: number,
            pW: number,
            sW: number
        }

        const weights: weightType = {rW: 0, pW: 0, sW: 0}; */

        // Ways to weight the moves: Recent two or three identical moves get higher weight then curruent common move

        // Most common move
        const mostCommon = Object.entries(counts).reduce((a, b) =>
            b[1] > a[1] ? b : a
        )[0] as AttackType;
        console.info('Most Common Move:', mostCommon);
        let currentCounterMove = this.counterMove(mostCommon);
        // Counter the most common move
        
        console.info('Counter Move', currentCounterMove);
        setOpponentAttack(currentCounterMove);
    }

    // Helpers
    counterMove(move: AttackType): AttackType {
        switch (move) {
            case 'R':
               return 'P';
            case 'P':
                return 'S';
            case 'S':
                return 'R';
            default:
                throw new Error(`Not Valid Move: ${move}`);
        }
    }
    
    didUserWinRound(user: AttackType, opponent: AttackType): boolean {
        return (
            (user === 'R' && opponent === 'S') ||
            (user === 'P' && opponent === 'R') ||
            (user === 'S' && opponent === 'P')
        );
    }

    didOpponentWinRound(user: AttackType, opponent: AttackType): boolean {
        return (
            (opponent === 'R' && user === 'S') ||
            (opponent === 'P' && user === 'R') ||
            (opponent === 'S' && user === 'P')
        );
    }

    isRoundLimitReached(): boolean {
        const {roundType, currentRound } = this.state;
        if (roundType === 'infinite') return false;

        const limit = parseInt(roundType, 10);
        return currentRound >= limit;
    }

    // Score & Rounds
    updateScore() {
        const { userAttackType, opponentAttackType, currentScore } = this.state;

        if (userAttackType === 'none') return;

        if (userAttackType === opponentAttackType) {
            setCurrentScore({ ...currentScore, tie: currentScore.tie + 1 });
        }

        if (this.didUserWinRound(userAttackType, opponentAttackType)) {
            setCurrentScore({ ...currentScore, user: currentScore.user + 1 });
        }

        if (this.didOpponentWinRound(userAttackType, opponentAttackType)) {
            setCurrentScore({ ...currentScore, opponent: currentScore.opponent + 1 });
        }
    }

    updateRound() {
        const { currentRound  } = this.state;
        setCurrentRound(currentRound + 1);
    }

    // Win Conditions
    checkWinningConditions() {
        const { currentScore } = this.state;
        if (!this.isRoundLimitReached()) return;

        const doesUserWin = currentScore.user > currentScore.opponent;
        const winnerName = doesUserWin ? 'You Win' : 'Opponent Win';
        const tieCheck = currentScore.user === currentScore.opponent ? 'Tie' : winnerName;

        setCurrentWinner(tieCheck);
    }
    
    reset() {
        setCurrentRound(0);
        setCurrentScore({ user: 0, opponent: 0, tie: 0});
        setCurrentWinner('');
    }
}

export default Game;