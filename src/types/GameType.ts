export type AttackType = 'none' | 'rock' | 'paper' | 'scissors';

export type DifficultyMode = 'easy' | 'medium' | 'hard';

// GameData, because it's snapshot of game's current data
export interface GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    modeType: DifficultyMode;
    attackHistory: AttackType[];
}