import { ProcessPatternsType } from "@/types/ProcessPatternType.js";
import Trie from "./trie.js";

class ProcessPatterns implements ProcessPatternsType {
    patterns: any[];
    trie: Trie | null;
    map: Map<string, any>;
    
    constructor () {
        this.patterns = [];
        this.trie = null;
        this.map = new Map();
    }

    async getPattern_lib () {
        if (!window.Worker) {
            try {
                const response = await fetch('http://localhost:3000/pattern_lib');
                if (!response.ok) throw new Error('Network response was not ok');
                this.patterns = await response.json();
            } catch (error) {
                console.error('Failed to featch patterns:', error);
                this.patterns = [];
            }
        } else {
            const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

            worker.postMessage({ action: 'fetch_patterns'});

            worker.onmessage = (e) => {
                console.log('Main: Message received from worker', e.data);
                console.log(e.data.patterns)
            }

            worker.onerror = (error) => {
                console.error('Worker error:', error);
            }
        }
    }

    createTrie() {
        if (!this.patterns || this.patterns.length === 0) {
            console.warn('No patterns loaded, skipping insert');
            return;
        }

        this.trie = new Trie();
        
        for (let row of this.patterns){
            this.trie.insert(row.pattern);
        }
        return this.trie;
    }

    storeInMap() {
        for(let item of this.patterns) {
            this.map.set(item.pattern, item);
        }
        return this.map;
    }
}

export default ProcessPatterns;