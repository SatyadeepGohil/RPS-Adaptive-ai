export type AttackType = 'none' | 'rock' | 'paper' | 'scissors';

export type DifficultyMode = 'easy' | 'medium' | 'hard' | 'extreme';

// GameData, because it's snapshot of game's current data
export interface GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    difficultModeType: DifficultyMode;
}