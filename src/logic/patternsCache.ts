import Trie from "./trie.js";

let trie: Trie | null = null;
let patternMap: Map<string, any> | null = new Map();
let patternLibrary: any[] | null = null;

export function setPatternLibrary(patterns: any[]) {
    patternLibrary = patterns;
}

export function getPatternLibrary() {
    return patternLibrary;
}

export function hasPatternLibrary() {
    return patternLibrary !== null;
}

export function setTrie(patterns: any[]) {
    trie = new Trie();
    for (let row of patterns) {
        trie.insert(row.pattern);
    }
}

export function getTrie() {
    return trie;
}

export function setMap(patterns: any[]) {
    for (let item of patterns) {
        patternMap?.set(item.pattern, item);
    }
}

export function getMap() {
    return patternMap;
}