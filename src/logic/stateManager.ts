type Listener<T> = (newValue: T, oldValue: T) => void;
type Unsubscribe = () => void;

class State<T extends Record<string, any>> {
    private state: T;
    private listeners: Map<keyof T, Set<Listener<any>>> = new Map();
    private batchQueue: Array<{prop: keyof T, value: any}> = [];
    private batchScheduled: boolean = false;

    constructor(initialState: T) {
        this.state = initialState;
    }

    getState<K extends keyof T>(prop: K): T[K] {
        return this.state[prop];
    }

    getAllState(): Readonly<T> {
        return this.state;
    }

    // Single updates optimized
    setState<K extends keyof T>(prop: K, value: T[K], slient: boolean = false): void {
        const oldValue = this.state[prop];

        if(oldValue === value) return; // Skip if state unchanged

        this.state[prop] = value; // direct mutation if state changed

        if (!slient && this.listeners.has(prop)) {
            this.notifyListeners(prop, value, oldValue);
        }
    }

    // Change detection in batch updates
    batchSetState(updates: Partial<T>, slient: boolean = false): void {
        const changes: Array<{prop: keyof T, newValue: any, oldValue: any}> = [];

        for (const [prop, value] of Object.entries(updates) as [keyof T, any][]) {
            const oldValue = this.state[prop];

            if (oldValue !== value) {
                this.state[prop] = value; // Direct mutation
                changes.push({prop, newValue: value, oldValue});
            }
        }

        if (!slient && changes.length > 0) {
            for (const {prop, newValue, oldValue} of changes) {
                this.notifyListeners(prop, newValue, oldValue);
            }
        }
    }

    queueUpdate<K extends keyof T>(prop: K, value: T[K]): void {
        this.batchQueue.push({prop, value});

        if (!this.batchScheduled) {
            this.batchScheduled = true;
            requestAnimationFrame(() => this.flushQueue());
        }
    }

    private flushQueue(): void {
        if (this.batchQueue.length === 0) {
            this.batchScheduled = false;
            return;
        }

        const updates: Partial<T> = {};
        for (const {prop, value} of this.batchQueue) {
            updates[prop] = value;
        }

        this.batchSetState(updates);
        this.batchQueue = [];
        this.batchScheduled = false;
    }

    // Subscribe to specific property changes
    subscribe<K extends keyof T>(prop: K, listener: Listener<T[K]>): Unsubscribe {
        if (!this.listeners.has(prop)) {
            this.listeners.set(prop, new Set());
        }

        this.listeners.get(prop)!.add(listener);

        return () => {
            const propListeners = this.listeners.get(prop);
            if (propListeners) {
                propListeners.delete(listener);
                if (propListeners.size === 0) {
                    this.listeners.delete(prop);
                }
            }
        }
    }

    private notifyListeners<K extends keyof T>(prop: K, newValue: T[K], oldValue: T[K]): void {
        const propListeners = this.listeners.get(prop);
        
        if (propListeners) {
            propListeners.forEach(listener => listener(newValue, oldValue));
        }
    }

    replaceState(newState: T): void {
        this.state = newState;
    }
 }

export default State;