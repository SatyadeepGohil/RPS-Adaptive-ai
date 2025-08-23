import { useState, useEffect, useRef, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { userGameStore } from "./store/GameStore";
import Game from '../src/GameEngine';
import type { AttackType } from "./types/GameTypes";

function ClassicMode () {
    let navigate = useNavigate();
    let { setUserAttack, opponentAttackType} = userGameStore();
    let [isActive, setActive] = useState(false);
    let [isGameLocked, setIsGameLocked] = useState(false);

    const gameRef = useRef(new Game());
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        function handleKeydown (e: { key: string; }) {
            if (e.key === 'Escape') {
                navigate('/');
            }
        }

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        }
    }, [navigate]);

    useEffect(() => {
        if (opponentAttackType !== 'none') {

            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            setActive(true);
            
            animationTimeoutRef.current = setTimeout(() => {
                setActive(false);
                setIsGameLocked(false);
            }, 1500);

            return () => {
                if (animationTimeoutRef.current) {
                    clearTimeout(animationTimeoutRef.current);
                }
            }
        }

    }, [opponentAttackType]);

    const handleUserAttack = useCallback((attack: AttackType) => {
        if (isGameLocked) return;

        setIsGameLocked(true);

        setTimeout(() => {
            gameRef.current.processUserAttack(attack);
        }, 100);
    }, [isGameLocked]);

    return (
        <div id="classic_mode_container">
            <nav id="classic_mode_nav">
                <button onClick={() => navigate('/')}>Back to main menu</button>
            </nav>
            <div id="opponent_card_container">
                <div className={`flipper ${isActive ? 'active' : ''}`}>
                    <div className="front">{opponentAttackType}</div>
                    <div className="back">Back</div>
                </div>
            </div>
            <hr />
            <div id="selection_card_container">

                <div
                className={`card ${isGameLocked ? 'disabled' : ''}`}
                onClick={() => handleUserAttack('rock')}
                >
                    Rock
                </div>

                <div
                className={`card ${isGameLocked ? 'disabled' : ''}`}
                onClick={() => handleUserAttack('paper')}
                >
                    Paper
                </div>

                <div
                className={`card ${isGameLocked ? 'disabled' : ''}`}
                onClick={() => setUserAttack('scissors')}
                >
                    Scissors
                </div>

            </div>
            
        </div>
    )
}

export default ClassicMode;