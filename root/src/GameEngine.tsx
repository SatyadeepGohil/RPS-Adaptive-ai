class Game {
    userAttackType: string;
    opponentAttackType: string
    difficultyMode: string
    attackHistory: string[];
    constructor () {
        this.userAttackType = 'none';
        this.opponentAttackType = 'none';
        this.difficultyMode = 'easy';
        this.attackHistory = [];
    }

    gameModeSelection (mode = this.difficultyMode) {
        switch(mode) {
            case 'easy':
                this.randomAttack();
                break;
            case 'medium':
                this.adaptiveAttack();
        }
    }

    randomAttack () {
        if (this.userAttackType === 'none') return;
        const randomInt = Math.floor(Math.random() * 3);
        switch(randomInt) {
            case 1:
                this.opponentAttackType = 'rock';
                break;
            case 2:
                this.opponentAttackType = 'paper';
                break;
            case 3:
                this.opponentAttackType = 'scissors'
        }
    }

    adaptiveAttack() {

    }
}

new Game();