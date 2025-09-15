import { useGameStore } from "../store/GameStore.js";
import { N_Grams_Type } from "@/types/nGramsType.js";

class N_Grams implements N_Grams_Type {
    totalPatterns: number;
    rProb: number;
    pProb: number;
    sProb: number;

    constructor() {
        this.totalPatterns = 3279;
        this.rProb = 0;
        this.pProb = 0;
        this.sProb = 0;
    }

    calculateOccurencDistribution() {
        const { attackHistory } = useGameStore.getState();

        if (attackHistory.length === 0) return;

        let rCount = 0, pCount = 0, sCount = 0;

        for (let attack of attackHistory) {
            switch(attack) {
                case 'rock':
                    rCount++;
                    this.rProb = rCount / attackHistory.length;
                    break;
                case 'paper':
                    pCount++;
                    this.pProb = pCount / attackHistory.length;
                    break;
                case 'scissors':
                    sCount++;
                    this.sProb = sCount / attackHistory.length;
                    break;
            }
        }
    }

}

export default N_Grams;