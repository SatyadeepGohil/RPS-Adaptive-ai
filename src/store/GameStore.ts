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
    let history = [...gameState.state.attackHistory, attack].slice(-20);
    gameState.setState('userAttackType', attack);
    gameState.setState('attackHistory', history);
}

export function setOpponentAttack(attack: AttackType) {
    gameState.setState('opponentAttackType', attack);
}

export function setDifficultyModeType(mode: DifficultyMode) {
   gameState.setState('difficultModeType', mode);
   gameState.setState('currentRound', 0);
   gameState.setState('currentScore', {user: 0, opponent: 0, tie: 0 });
   gameState.setState('currentWinner', '');
}

export function setRoundType(rType: RoundType) {
    gameState.setState('roundType', rType);
    gameState.setState('currentRound', 0);
    gameState.setState('currentScore', {user: 0, opponent: 0, tie: 0 });
    gameState.setState('currentWinner', '');
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