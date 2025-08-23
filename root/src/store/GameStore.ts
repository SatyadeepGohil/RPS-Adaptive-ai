import { create } from "zustand";
import type { AttackType, GameData } from "../types/GameTypes";

export type GameStore = GameData & {
    setUserAttack: (attack: AttackType) => void;
    setOpponentAttack: (attack: AttackType) => void;
}

export const userGameStore = create<GameStore>((set) => ({
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
}))