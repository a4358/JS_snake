export default class View{
    constructor(canvas,score,cellSize = 20){
        this.canvas = canvas;
        this.score = score;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.drawnSegments = 0;
        this.board = null;
    }

    clearView(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    initialise(snake){
        console.log("initialised");
        this.canvas.width = (snake.board.x) * this.cellSize;
        this.canvas.height = (snake.board.y) * this.cellSize;
        this.board = snake.board;
        this.drawSegment(snake.body[0]);
        this.drawnSegments = 1;
    }
    updateScore(newscore){
        score.innerText = newscore;
    }
    update(snake){
        console.log(`drawing head ${snake.body[0]}`);
        this.drawSegment(snake.body[0]);
        console.log(snake.length, this.drawnSegments);
        if (snake.length === this.drawnSegments+1){
            console.log(`removing tail ${snake.body[snake.length-1]}`);
            this.drawnSegments -=1;

            this.removeSegment(snake.body[snake.length-1]);
        }
        for (let appleid of snake.board.apples){
            console.log("drawing apple");

            this.drawApple(appleid);
        }

        this.drawnSegments += 1;
    }

    drawSegment(segmentid){
        let x, y;
        [x,y] = this.board.xyCoords(segmentid);
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize);
    }

    drawApple(segmentid){
        let x, y;
        [x,y] = this.board.xyCoords(segmentid);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize);
    }

    removeSegment(segmentid){
        let x, y;
        [x,y] = this.board.xyCoords(segmentid);
        this.ctx.clearRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize);
    }
}