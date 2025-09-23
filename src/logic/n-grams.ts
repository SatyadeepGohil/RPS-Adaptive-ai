import Trie from "./trie";
import { gameState } from "../store/GameStore.js";
import { AttackType } from "@/types/GameType";

class nGrams {
    totalPatterns: number;
    trie: Trie | null;
    history: string[];

    constructor(t: Trie | null) {
        this.totalPatterns = 3279;
        this.trie = t;
        this.history = gameState.state.attackHistory;
    }

    predict(): AttackType {
        if(!this.trie)  this.getRandomMove();

        for (let n = 5; n > 2; n--) {
            if (this.history.length > n) {
                const prediction = this.tryNGram(n);
                if (prediction) return prediction;
            }
        }
        console.log('No ngrams execute instead getRandomMove does');
        return this.getRandomMove();
    }

    private tryNGram(n: number): AttackType | null {
        console.log('tryNGram method initiated');
        const basePattern = this.history.slice(-n).join('');
        console.log('Base pattern:', basePattern)

        const rCount = this.trie!.countPatternWithPrefix(basePattern + 'R');
        const pCount = this.trie!.countPatternWithPrefix(basePattern + 'P');
        const sCount = this.trie!.countPatternWithPrefix(basePattern + 'S');

        const total = rCount + pCount + sCount;

        if (total === 0) return null;

        const rProb = rCount / total;
        const pProb = pCount / total;
        const sProb = sCount / total;

        const maxProb = Math.max(rProb, pProb, sProb);

        if (maxProb < 0.2) return null;

        if (rProb === maxProb) return 'R';
        if (pProb === maxProb) return 'P';
        return 'S';
    }

    private getRandomMove(): AttackType {
        console.log('Inside nGrams class getRandomMove method chosen');
        const moves: AttackType[] = ["R", "P", "S"];
        return moves[Math.floor(Math.random() * 3)];
    }
}

export default nGrams;