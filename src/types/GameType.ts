export type AttackType = 'none' | 'rock' | 'paper' | 'scissors';

export type DifficultyMode = 'easy' | 'medium' | 'hard' | 'extreme';

export type RoundType = 'infinite' | '5' | '10' | '15';

export type Score = { user: number, opponent: number, tie: number };

export type Round = number;

export type Winner = string;

export type AttackHistory = AttackType[];

// GameData, because it's snapshot of game's current data
export interface GameData {
    userAttackType: AttackType | 'none';
    opponentAttackType: AttackType | 'none';
    difficultModeType: DifficultyMode;
    roundType: RoundType;
    currentScore: Score;
    currentRound: Round;
    currentWinner: Winner;
    attackHistory: AttackType[];
}

// State Types are assinged here
export type GameStore = GameData & {
    setUserAttack: (attack: AttackType) => void;
    setOpponentAttack: (attack: AttackType) => void;
    setDifficultyModeType: (mode: DifficultyMode) => void;
    setRoundType: (round: RoundType) => void;
    setCurrentScore: (point: Score) => void;
    setCurrentRound: (round: Round) => void;
    setCurrentWinner: (winner: Winner) => void;
}