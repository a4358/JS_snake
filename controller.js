import { Board, Snake, NORTH, WEST, EAST, SOUTH } from "./model.js";
export default class Controller {
    constructor(view) {
        this.view = view;
        this.snake = null;
        this.moving = false;
        this.currentdirection = null;
        this.gametickrate = 400;
        this.acceleration = 20;
        this.mintickrate = 150;
        this.movingid = null;
        this.score = 0;

    }

    newgame() {
        clearInterval(this.movingid);
        const board = new Board(40, 30);
        this.snake = new Snake(board, 5, 20, 15);
        //console.log(this.snake);

        this.currentdirection = NORTH;
        this.view.initialise(this.snake);
        this.movingid = setInterval(() => {
            this.game_tick();
        },this.gametickrate);
        this.moving = true;
        this.oldlength = this.snake.length
    }

    game_tick(){
        console.log('tick starting');
        this.snake.move(this.currentdirection);
        if (this.oldlength < this.snake.length){
            this.oldlength = this.snake.length;
            this.scoreupdate();
            
        }
        if (this.snake.dead === true) {
            this.defeat();
            return;
        }
        if (this.snake.length === this.snake.board.x*this.snake.board.y){
            this.victory();
            return;
        }
        if (this.snake.board.apples.length === 0) this.spawnapple();
        this.view.update(this.snake);

    }
    
    scoreupdate(){
        this.score += 500 - this.gametickrate;
        if (this.gametickrate > this.mintickrate) {
            this.gametickrate -= this.acceleration;
            console.log(`new tick rate = ${this.gametickrate}`);
            clearInterval(this.movingid);
            this.movingid = setInterval(() => {
                this.game_tick();
            },this.gametickrate);

        }
        this.view.updatescore(this.score);
    }
    setdirection(direction){
        if ((direction +this.currentdirection)%2 === 1){ //change dir only if its not forward or back relative to current
            this.currentdirection = direction;
        }
    }

    pause(){
        clearInterval(this.movingid);
        this.moving = false;

    }

    unpause(){
        if (this.snake.dead === false){
            this.movingid = setInterval(() => {
                this.game_tick();
            },this.gametickrate);
            this.moving = true;
        }
    }

    spawnapple(){
        let appleid = Math.floor(Math.random()*this.snake.board.x*this.snake.board.y);
        while (this.snake.body.includes(appleid)){
            console.log('failed apple placement, retrying');
            if (this.snake.length < this.snake.board.x*this.snake.board.y /2) appleid = Math.floor(Math.random()*this.snake.board.x*this.snake.board.y);
            else {
                if (appleid = this.snake.board.x*this.snake.board.y-1) appleid = 0;
                else appleid+=1;
            }
        }
        this.snake.board.addapple(appleid);
    }
    defeat(){
        alert("oops! you are dead");
        this.end_game();
    }
    end_game(){
        console.log("game ended");
        clearInterval(this.movingid);
        this.view.clear_view();
    }

    victory(){
        alert("congratulations! you ate all the apples there are");
        this.end_game();
    }
}