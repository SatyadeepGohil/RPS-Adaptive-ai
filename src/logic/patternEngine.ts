import { PatternDataType } from "@/types/PatternEngineType";
import { performance } from "perf_hooks";
import Trie from "./Trie.js";

class PatternEngine implements PatternDataType {
    patterns: any[];
    
    constructor () {
        this.patterns = [];
    }

    async getPattern_lib () {
        try {
            const response = await fetch('http://localhost:3000/pattern_lib');
            if (!response.ok) throw new Error('Network response was not ok');
            this.patterns = await response.json();
        } catch (error) {
            console.error('Failed to featch patterns:', error);
            this.patterns = [];
        }
    }

    storeInTrie() {
        if (!this.patterns || this.patterns.length === 0) {
            console.warn('No patterns loaded, skipping insert');
            return;
        }

        const trie = new Trie();
        
        for (let row of this.patterns){
            trie.insert(row.pattern);
        }
    }
}

const run = async () => {
    const engine = new PatternEngine();
    await engine.getPattern_lib();
    engine.storeInTrie();
};
let t1 = performance.now();
run();
let t2 = performance.now();

console.log('Trie storage timing', t2 - t1 + 'ms');

export default PatternEngine;