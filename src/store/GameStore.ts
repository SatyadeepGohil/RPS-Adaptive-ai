import { createStore } from "zustand/vanilla";
import type { AttackType, DifficultyMode, GameData } from "../types/GameType";

export type GameStore = GameData & {
    attackHistory: AttackType[];
    setUserAttack: (attack: AttackType) => void;
    setOpponentAttack: (attack: AttackType) => void;
    setDifficultyModeType: (mode: DifficultyMode) => void;
}

export const userGameStore = createStore<GameStore>((set) => ({
    userAttackType: 'none',
    opponentAttackType: 'none',
    difficultModeType: 'easy',
    attackHistory: [],

    setUserAttack: (attack) => 
        set((state) => ({
            userAttackType: attack,
            attackHistory: [...state.attackHistory, attack],
        })),

    setOpponentAttack: (attack) => 
        set(() => ({
            opponentAttackType: attack,
        })),
    
    setDifficultyModeType: (mode) => 
        set(() => ({
            difficultModeType: mode,
        }))
}))