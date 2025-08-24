export type AttackType = 'none' | 'rock' | 'paper' | 'scissors';
export type DifficultyMode = 'easy' | 'medium' | 'hard' | 'extreme';
export interface GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    modeType: DifficultyMode;
    attackHistory: AttackType[];
}
//# sourceMappingURL=GameType.d.ts.map