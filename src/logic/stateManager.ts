type Observer<T> = {
    observer: (state: T) => void;
    dependencies: Set<keyof T>;
};

class State<T extends Record<string, any>> {
    state: T;
    observers: Observer<T>[];

    constructor(initialState: T) {
        this.state = initialState;
        this.observers = [];
    }

    setState<K extends keyof T>(prop: K, value: T[K]) {
        if (prop in this.state && this.state[prop] !== value) {
            this.state[prop] = value;

            this.observers.forEach(({observer, dependencies}) => {
                if (dependencies.has(prop)) {
                    observer(this.state);
                }
            });
        }
    }

    observe(observer: (proxy: T) => void) {
        const dependencies = new Set<keyof T>();

        const proxy = new Proxy(this.state, {
            get: (target, prop: string) => {
                if (typeof prop === 'string' && prop in target) {
                    dependencies.add(prop as keyof T);
                }
                return target[prop];
            },
        });

        observer(proxy as T);
        this.observers.push({ observer, dependencies });
    }
}

export default State;