import type { AttackType, DifficultyMode, GameData } from "../types/GameType";
export type GameStore = GameData & {
    setUserAttack: (attack: AttackType) => void;
    setOpponentAttack: (attack: AttackType) => void;
    setModeType: (mode: DifficultyMode) => void;
};
export declare const userGameStore: import("zustand/vanilla").StoreApi<GameStore>;
//# sourceMappingURL=GameStore.d.ts.map