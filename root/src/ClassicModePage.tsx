import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClassicMode () {
    let navigate = useNavigate();

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


    return (
        <div id="classic_mode_container">
            <nav id="classic_mode_nav">
                <button onClick={() => navigate('/')}>Back to main menu</button>
            </nav>
            <div id="opponent_card_container">
                <div className="flipper">
                    <div className="front">Front</div>
                    <div className="back">Back</div>
                </div>
            </div>
            <hr />
            <div id="selection_card_container">
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
            </div>
        </div>
    )
}

export default ClassicMode;