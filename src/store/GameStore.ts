import { GameData, RoundType, AttackType,DifficultyMode, Round, Score, Winner  } from "@/types/gameType.js";
import State from "../logic/stateManager.js";

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
    let history = [...gameState.getState('attackHistory'), attack].slice(-20);
    gameState.batchSetState({
        userAttackType: attack,
        attackHistory: history,
    })
}

export function setOpponentAttack(attack: AttackType) {
    gameState.setState('opponentAttackType', attack);
}

export function setDifficultyModeType(mode: DifficultyMode) {
    gameState.batchSetState({
        difficultModeType: mode,
        currentRound: 0,
        currentScore: { user: 0, opponent: 0, tie: 0 },
        currentWinner: '',
    });
}

export function setRoundType(rType: RoundType) {
    gameState.batchSetState({
        roundType: rType,
        currentRound: 0,
        currentScore: { user: 0, opponent: 0, tie: 0 },
        currentWinner: '',
    });
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