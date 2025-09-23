import Trie from "../logic/trie.js";
import State from "../logic/stateManager.js";

interface patternData {
    trie: Trie | null;
    patternMap: Map<string, any> | null;
    patternLibrary: any[] | null;
}

export const patternState = new State<patternData> ({
    trie: null,
    patternMap: null,
    patternLibrary: null,
})

export function setPatternLibrary(patterns: any[]) {
    patternState.setState('patternLibrary', patterns);
}

export function setTrie(patterns: any[]) {
    const trie = new Trie();
    for (const row of patterns) {
        trie.insert(row.pattern);
    }
    patternState.setState('trie', trie);
}

export function setMap(patterns: any[]) {
    const map = new Map<string, any>();
    for (const item of patterns) {
        map.set(item.pattern, item);
    }
    patternState.setState('patternMap', map);
}