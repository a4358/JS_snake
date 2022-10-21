import { Board, Snake, NORTH} from "./model.js";
export default class Controller {
    constructor(view) {
        this.view = view;
        this.snake = null;
        this.moving = false;
        this.currentDirection = null;
        this.gameTickRate = 300;
        this.acceleration = 20;
        this.minTickRate = 150;
        this.movingIntervalId = null;
        this.score = 0;
        this.previousDirection = NORTH;

    }

    newGame() {
        clearInterval(this.movingIntervalId);
        const board = new Board(40, 30);
        this.snake = new Snake(board, 5, 20, 15);
        this.score = 0;
        this.view.updateScore(this.score);
        //console.log(this.snake);
        this.gameTickRate = 300;
        this.currentDirection = NORTH;
        this.view.initialise(this.snake);
        this.movingIntervalId = setInterval(() => {
            this.gameTick();
        },this.gameTickRate);
        this.moving = true;
        this.oldlength = this.snake.length
    }

    gameTick(){
        console.log('tick starting');
        this.snake.move(this.currentDirection);
        this.previousDirection = this.currentDirection;
        if (this.oldlength < this.snake.length){
            this.oldlength = this.snake.length;
            this.scoreUpdate();
            
        }
        if (this.snake.dead === true) {
            this.defeat();
            return;
        }
        if (this.snake.length === this.snake.board.x*this.snake.board.y-1){
            this.victory();
            return;
        }
        if (this.snake.board.apples.length === 0) this.spawnApple();
        this.view.update(this.snake);

    }
    
    scoreUpdate(){
        this.score += 500 - this.gameTickRate;
        if (this.gameTickRate > this.minTickRate) {
            this.gameTickRate -= this.acceleration;
            console.log(`new tick rate = ${this.gameTickRate}`);
            clearInterval(this.movingIntervalId);
            this.movingIntervalId = setInterval(() => {
                this.gameTick();
            },this.gameTickRate);

        }
        this.view.updateScore(this.score);
    }
    setdirection(direction){
        if ((direction + this.previousDirection)%2 === 1){ //change dir only if its not forward or back relative to current
            this.currentDirection = direction;
        }
    }

    pause(){
        clearInterval(this.movingIntervalId);
        this.moving = false;

    }

    unpause(){
        if (this.snake.dead === false){
            this.movingIntervalId = setInterval(() => {
                this.gameTick();
            },this.gameTickRate);
            this.moving = true;
        }
    }

    spawnApple(){
        let appleid = Math.floor(Math.random()*this.snake.board.x*this.snake.board.y);
        while (this.snake.body.includes(appleid)){
            console.log('failed apple placement, retrying');
            if (this.snake.length < this.snake.board.x*this.snake.board.y /2) appleid = Math.floor(Math.random()*this.snake.board.x*this.snake.board.y);
            else {
                if (appleid = this.snake.board.x*this.snake.board.y-1) appleid = 0;
                else appleid+=1;
            }
        }
        this.snake.board.addApple(appleid);
    }
    defeat(){
        alert("oops! you are dead");
        this.endGame();
    }
    endGame(){
        console.log("game ended");
        clearInterval(this.movingIntervalId);
        this.view.clearView();
    }

    victory(){
        alert("congratulations! you ate all the apples there are");
        this.endGame();
    }
}