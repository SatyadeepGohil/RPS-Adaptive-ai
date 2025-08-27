import { createStore } from "zustand/vanilla";
import type { GameData, AttackType, DifficultyMode, RoundType, Score } from "@/types/GameType";

// State Types are assinged here
export type GameStore = GameData & {
    attackHistory: AttackType[];
    setUserAttack: (attack: AttackType) => void;
    setOpponentAttack: (attack: AttackType) => void;
    setDifficultyModeType: (mode: DifficultyMode) => void;
    setRoundType: (round: RoundType) => void;
    setCurrentScore: (point: Score) => void;
}

export const useGameStore = createStore<GameStore>((set) => ({
    userAttackType: 'none',
    opponentAttackType: 'none',
    difficultModeType: 'easy',
    roundType: 'infinite',
    currentScore: { user: 0, opponent: 0 },
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
        })),
    setRoundType: (round) =>
        set(() => ({
            roundType: round,
        })),
    setCurrentScore: (point) =>
        set(() => ({
            currentScore: point,
        }))
}))