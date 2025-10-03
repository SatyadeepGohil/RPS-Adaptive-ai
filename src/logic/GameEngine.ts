import type { AttackType } from "../types/gameType.js";
import AdaptiveEngine from "./adaptiveEngine.js";
import { gameState, setCurrentWinner, setCurrentRound, setCurrentScore } from "../store/gameStore.js";

let adaptiveEngine = new AdaptiveEngine();

class Game {
    // State Accessor
    private get state() {
        return gameState.getAllState();
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
                adaptiveEngine.randomAttack();
                break;
            case 'medium':
                adaptiveEngine.adaptiveAttack();
                break;
        }
    }

    // Helpers
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