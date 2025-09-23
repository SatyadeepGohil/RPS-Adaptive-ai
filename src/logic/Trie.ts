class TrieNode {
    children: Record<string, TrieNode>;
    isEnd: boolean;

    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    root: TrieNode;
    count: number;
    constructor() {
        this.root = new TrieNode();
        this.count = 0;
    }

    insert(word: string) {
        let currentPointer = this.root;

        for (const char of word) {

            if (!currentPointer.children[char]) {
                currentPointer.children[char] = new TrieNode();
            }

            currentPointer = currentPointer.children[char];
        }
        currentPointer.isEnd = true;
    }

    search(key: string) {
        let currentPointer = this.root;

        for (let char of key) {

            if (!currentPointer.children[char]) return false;

            currentPointer = currentPointer.children[char];
        }
        return currentPointer.isEnd;
    }

    countPatternWithPrefix(prefix: string): number {
        let currentPointer = this.root;

        for (let char of prefix) {
            if (!currentPointer.children[char]) return 0;

            currentPointer = currentPointer.children[char];
        }

        return this.countEndNodes(currentPointer);
    }

    private countEndNodes(node: TrieNode): number {
        this.count = 0;
        if (node.isEnd) this.count++;

        for (let child of Object.values(node.children)) {
            this.count += this.countEndNodes(child);
        }

        return this.count;
    }
}

export default Trie;