import { useGameStore } from "../store/GameStore.js";
import { N_Grams_Type } from "@/types/nGramsType.js";

class N_Grams implements N_Grams_Type {
    totalPatterns: number;
    rCount: number;
    pCount: number;
    sCount: number;

    constructor() {
        this.totalPatterns = 3279;
        this.rCount = 0;
        this.pCount = 0;
        this.sCount = 0;
    }

    calculateOccurence() {
        const { attackHistory } = useGameStore.getState();

        if (attackHistory.length === 0) return;

        for (let attack of attackHistory) {
            switch(attack) {
                case 'rock':
                    this.rCount++;
                    break;
                case 'paper':
                    this.pCount++;
                    break;
                case 'scissors':
                    this.sCount++;
                    break;
            }
        }
        console.log('Rock Probability:', this.rCount / this.totalPatterns);
        console.log('Paper Probability:', this.pCount / this.totalPatterns);
        console.log('Scissors Probability:', this.sCount / this.totalPatterns);
    }

}

export default N_Grams;