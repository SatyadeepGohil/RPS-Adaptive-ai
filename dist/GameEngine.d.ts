import type { AttackType, DifficultyMode, GameData } from "./types/GameType";
declare class Game implements GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    modeType: DifficultyMode;
    attackHistory: AttackType[];
    constructor();
    processUserAttack(userAttack: AttackType): void;
    gameModeSelection(mode?: DifficultyMode): void;
    randomAttack(): void;
    adaptiveAttack(): void;
}
export default Game;
//# sourceMappingURL=GameEngine.d.ts.map