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

    patternRecognition() {
    }
}

export default N_Grams;