class State<T extends Record<string, any>> {
    private state: T;

    constructor(initialState: T) {
        this.state = initialState;
    }

    getState<K extends keyof T>(prop: K): T[K] {
        return this.state[prop];
    }

    getAllState(): Readonly<T> {
        return this.state;
    }

    setState<K extends keyof T>(prop: K, value: T[K]) {
        if (this.state[prop] !== value) {
            this.state[prop] = value;
        }
    }

    batchSetState(updates: Partial<T>): void {
        this.state = {...this.state, ...updates};
    }

    replaceState(newState: T): void {
        this.state = newState;
    }
 }

export default State;