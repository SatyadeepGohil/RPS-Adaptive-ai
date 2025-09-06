import { PatternDataType } from "@/types/PatternEngineType";

class PatternEngine implements PatternDataType {
    patterns: Object;
    
    constructor () {
        this.patterns = {};
    }

    async getPattern_lib () {
        try {
            const response = await fetch('http://localhost:3000/pattern_lib');
            if (!response.ok) throw new Error('Network response was not ok');
            this.patterns = await response.json();
        } catch (error) {
            console.error('Failed to featch patterns:', error);
            this.patterns = {};
        }
    }
}

export default PatternEngine;