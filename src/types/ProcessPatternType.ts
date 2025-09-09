import Trie from "@/logic/trie";

export interface ProcessPatternsType {
    patterns: any[];
    trie: Trie | null;
    map: Map<string, any>
}