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
    constructor() {
        this.root = new TrieNode();
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

    isPrefix(prefix: string) {
        let currentPointer = this.root;

        for (let char of prefix) {
            if (!currentPointer.children[char]) return false;

            currentPointer = currentPointer.children[char];
        }

        return true;
    }
}

export default Trie;