import { createStore } from "zustand/vanilla";
export const userGameStore = createStore((set) => ({
    userAttackType: 'none',
    opponentAttackType: 'none',
    modeType: 'easy',
    attackHistory: [],
    setUserAttack: (attack) => set((state) => ({
        userAttackType: attack,
        attackHistory: [...state.attackHistory, attack],
    })),
    setOpponentAttack: (attack) => set((state) => ({
        opponentAttackType: attack,
        attackHistory: [...state.attackHistory, attack],
    })),
    setModeType: (mode) => set(() => ({
        modeType: mode,
    }))
}));
//# sourceMappingURL=GameStore.js.map