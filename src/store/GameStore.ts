import { GameData } from "@/types/GameType";
import State from "../logic/stateManager.js";
import { AttackType, DifficultyMode, Round, RoundType, Score, Winner } from "@/types/GameType";

export const gameState = new State<GameData>({
  userAttackType: 'none',
  opponentAttackType: 'none',
  difficultModeType: 'easy',
  roundType: 'infinite',
  currentScore: { user: 0, opponent: 0, tie: 0 },
  currentRound: 0,
  currentWinner: '',
  attackHistory: [],
});

export function setUserAttack(attack: AttackType) {
    gameState.setStates({
        userAttackType: attack,
        attackHistory: [...gameState.state.attackHistory, attack].slice(-20),
    })
}

export function setOpponentAttack(attack: AttackType) {
    gameState.setState('opponentAttackType', attack);
}

export function setDifficultyModeType(mode: DifficultyMode) {
    gameState.setStates({
        difficultModeType: mode,
        currentRound: 0,
        currentScore: { user: 0, opponent: 0, tie: 0 },
        currentWinner: '',
    })
}

export function setRoundType(rType: RoundType) {
    gameState.setStates({
        roundType: rType,
        currentRound: 0,
        currentScore: { user: 0, opponent: 0, tie: 0 },
        currentWinner: '',
    })
}

export function setCurrentRound(round: Round) {
    gameState.setState('currentRound', round);
}

export function setCurrentScore(point: Score) {
    gameState.setState('currentScore', point);
}

export function setCurrentWinner(winner: Winner) {
    gameState.setState('currentWinner', winner);
}