export const NORTH = 0;
export const WEST = 1;
export const SOUTH = 2;
export const EAST = 3;
// coordinate system: 
// 0x ->
// y
// |
// V
export class Board {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.apples = [];
    }

    flatcoords(_x,_y){
        return (this.x*_y+_x);
    }

    xycoords(flat){
        let ry = 0
        while (flat >= this.x) {
            flat -= this.x;
            ry += 1;
        }
        return [flat, ry];
    }

    checkWallCollision(_x,_y){
        if (_x < 0 || _x>=this.x || _y < 0 || _y >= this.y) return true;
        else return false;
    }
    
    addapple(appleid){
        //let appleid = this.flatcoords((_x,_y));
        if (!this.apples.includes(appleid)) this.apples.push(appleid);
    }

    removeapple(appleid){
        if (this.apples.includes(appleid)){
            const removalindex = this.apples.indexOf(appleid);
            this.apples.splice(removalindex,1);
        }
    }

}
export class Snake{
    constructor(board, startinglength = 3,startingx = 0,startingy = 0){
        this.dead = false;
        this.board = board;
        this.length = startinglength;
        this.body = [];
        for (let i = 0; i < startinglength; i++){
            this.body[i]=this.board.flatcoords(startingx,startingy);
        }
    }
    die(){
        this.dead = true;
    }
    checkselfcollision(){
        //console.log("checking self-collision");

        if (this.body.slice(1).includes(this.body[0])) {
            this.die();
            console.log("snake ran into itself!");
    }
    }
    move(direction){
        console.log(`moving ${direction}`);
        let x, y;
        [x,y] = this.board.xycoords(this.body[0]);
        //console.log(this.body[0]);
        switch (direction) {
            case NORTH:
                if (!this.board.checkWallCollision(x, y - 1)) this.body.unshift(this.board.flatcoords(x,y-1));
                else this.die();
                break;
            case SOUTH:
                if (!this.board.checkWallCollision(x, y + 1)) this.body.unshift(this.board.flatcoords(x,y+1));
                else this.die();
                break;
            case WEST:
                if (!this.board.checkWallCollision(x - 1, y)) this.body.unshift(this.board.flatcoords(x-1,y));
                else this.die();
                break;
            case EAST:
                if (!this.board.checkWallCollision(x + 1, y)) this.body.unshift(this.board.flatcoords(x+1,y));
                else this.die();
                break;
        }
        //console.log(this.body[0]);

        this.checkselfcollision();
        this.checkApple();
        if (this.body.length > this.length) this.body.pop();
    }

    checkApple(){
        const appleid = this.body[0];
        if (this.board.apples.includes(appleid)){
            this.length += 1;
            this.board.removeapple(appleid);
        }
    }

}