import { createStore } from "zustand/vanilla";
import type { AttackType, DifficultyMode, GameData } from "../types/GameType";

export type GameStore = GameData & {
    setUserAttack: (attack: AttackType) => void;
    setOpponentAttack: (attack: AttackType) => void;
    setModeType: (mode: DifficultyMode) => void;
}

export const userGameStore = createStore<GameStore>((set) => ({
    userAttackType: 'none',
    opponentAttackType: 'none',
    modeType: 'easy',
    attackHistory: [],

    setUserAttack: (attack) => 
        set((state) => ({
            userAttackType: attack,
            attackHistory: [...state.attackHistory, attack],
        })),

    setOpponentAttack: (attack) => 
        set((state) => ({
            opponentAttackType: attack,
            attackHistory: [...state.attackHistory, attack],
        })),
    
    setModeType: (mode) => 
        set(() => ({
            modeType: mode,
        }))
}))