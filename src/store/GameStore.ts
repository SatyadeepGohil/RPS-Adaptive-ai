import { createStore } from "zustand/vanilla";
import type { GameStore } from "@/types/GameType";

export const useGameStore = createStore<GameStore>((set) => ({
    userAttackType: 'none',
    opponentAttackType: 'none',
    difficultModeType: 'easy',
    roundType: 'infinite',
    currentScore: { user: 0, opponent: 0, tie: 0 },
    currentRound: 0,
    currentWinner: '',
    attackHistory: [],

    setUserAttack: (attack) => 
        set((state) => ({
            userAttackType: attack,
            attackHistory: [...state.attackHistory, attack].slice(-20),
        })),

    setOpponentAttack: (attack) => 
        set(() => ({
            opponentAttackType: attack,
        })),
    
    setDifficultyModeType: (mode) => 
        set(() => ({
            difficultModeType: mode,
            currentRound: 0,
            currentScore: { user: 0, opponent: 0, tie: 0 },
            currentWinner: '',
        })),

    setRoundType: (round) =>
        set(() => ({
            roundType: round,
            currentRound: 0,
            currentScore: { user: 0, opponent: 0, tie: 0 },
            currentWinner: '',
        })),

    setCurrentScore: (point) =>
        set(() => ({
            currentScore: point,
        })),

    setCurrentRound: (round) =>
        set(() => ({
            currentRound: round,
        })),

    setCurrentWinner: (winner) =>
        set(() => ({
            currentWinner: winner,
        })),
}))