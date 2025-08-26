export type AttackType = 'none' | 'rock' | 'paper' | 'scissors';

export type DifficultyMode = 'easy' | 'medium' | 'hard' | 'extreme';

export type RoundType = 'infinite' | '5' | '10' | '15';

export type Score = { user: number, opponent: number };

// GameData, because it's snapshot of game's current data
export interface GameData {
    userAttackType: AttackType;
    opponentAttackType: AttackType;
    difficultModeType: DifficultyMode;
    roundType: RoundType;
    currentScore: Score;
}