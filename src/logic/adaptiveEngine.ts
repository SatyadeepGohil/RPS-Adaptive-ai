import { gameState, setOpponentAttack } from "../store/gameStore.js"
import { AttackType } from "../types/gameType.js";

class AdaptiveEngine {

    private get state() {
        return gameState.getAllState();
    }

    // Attack Generators
    randomAttack() {
        const { userAttackType } = this.state;

        if (userAttackType === 'none') return;
        
        const choices: AttackType[] = ['R', 'P', 'S'];
        let randomValue: number;

        if (this.isCryptoAvailable()) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            randomValue = array[0] % choices.length;
        } else {
            console.warn('crypto.getRandwomvalues() not available, falling back to Math.random()');
            randomValue = Math.floor(Math.random() * 3);
        }

        const opponentAttack = choices[randomValue];
        setOpponentAttack(opponentAttack);
    };

    adaptiveAttack() {
        const { attackHistory } = this.state;
        
        if (attackHistory.length < 5) return this.randomAttack();

        const recentMoves = attackHistory.slice(-6, -1);
        const counts = { R: 0, P: 0, S: 0 } as Record<AttackType, number>;
        for (const move of recentMoves) counts[move] += 1;

        const mostCommon = Object.entries(counts).reduce((a, b) =>
            b[1] > a[1] ? b : a
        )[0] as AttackType;

        let currentCounterMove = this.counterMove(mostCommon);

        setOpponentAttack(currentCounterMove);
    }

    //Helpers
    private isCryptoAvailable() {
        return (
            typeof window !== 'undefined' &&
            !!window.crypto &&
            typeof window.crypto.getRandomValues === 'function'
        );
    }

    private counterMove(move: AttackType): AttackType {
        switch(move) {
            case 'R':
                return 'P';
            case 'P':
                return 'S';
            case 'S':
                return 'R';
            default:
                throw new Error(`Note valid move:, ${move}`);
        }
    }
}

export default AdaptiveEngine;