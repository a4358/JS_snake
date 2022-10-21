export default class View{
    constructor(canvas,score,cellsize = 20){
        this.canvas = canvas;
        this.score = score;
        this.ctx = canvas.getContext('2d');
        this.cellsize = cellsize;
        this.drawnsegments = 0;
        this.board = null;
    }

    clear_view(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    initialise(snake){
        console.log("initialised");
        this.canvas.width = (snake.board.x) * this.cellsize;
        this.canvas.height = (snake.board.y) * this.cellsize;
        this.board = snake.board;
        this.drawsegment(snake.body[0]);
        this.drawnsegments = 1;
    }
    updatescore(newscore){
        score.innerText = newscore;
    }
    update(snake){
        console.log(`drawing head ${snake.body[0]}`);
        this.drawsegment(snake.body[0]);
        console.log(snake.length, this.drawnsegments);
        if (snake.length === this.drawnsegments+1){
            console.log(`removing tail ${snake.body[snake.length-1]}`);
            this.drawnsegments -=1;

            this.removesegment(snake.body[snake.length-1]);
        }
        for (let appleid of snake.board.apples){
            console.log("drawing apple");

            this.drawapple(appleid);
        }

        this.drawnsegments += 1;
    }

    drawsegment(segmentid){
        let x, y;
        [x,y] = this.board.xycoords(segmentid);
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(x*this.cellsize,y*this.cellsize,this.cellsize,this.cellsize);
    }

    drawapple(segmentid){
        let x, y;
        [x,y] = this.board.xycoords(segmentid);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(x*this.cellsize,y*this.cellsize,this.cellsize,this.cellsize);
    }

    removesegment(segmentid){
        let x, y;
        [x,y] = this.board.xycoords(segmentid);
        this.ctx.clearRect(x*this.cellsize,y*this.cellsize,this.cellsize,this.cellsize);
    }
}