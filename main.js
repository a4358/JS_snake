import Controller from "./controller.js";
import View from "./view.js";
import { Board, Snake, NORTH, WEST, EAST, SOUTH } from "./model.js";
const newgamebtn = document.getElementById('newgamebtn');
const pausebtn = document.getElementById('pausebtn');
const snakecanvas = document.getElementById('canvas');
const score = document.getElementById('score');
const view = new View(snakecanvas,score);
const controller = new Controller(view);
snakecanvas.width = (40) * 20;
snakecanvas.height = (30) * 20;
newgamebtn.addEventListener('click', newgame);

pausebtn.addEventListener('click', pause);

document.addEventListener('keydown', e => {
    if ((controller.moving === true)) {
        switch (e.code) {
            case 'ArrowUp':
                e.preventDefault();
                move(NORTH);
                break;

            case 'ArrowDown':
                e.preventDefault();
                move(SOUTH);
                break;

            case 'ArrowLeft':
                e.preventDefault();
                move(WEST);
                break;

            case 'ArrowRight':
                e.preventDefault();
                move(EAST);
                break;

            case 'KeyW':
                e.preventDefault();
                move(NORTH);
                break;

            case 'KeyS':
                e.preventDefault();
                move(SOUTH);
                break;

            case 'KeyA':
                e.preventDefault();
                move(WEST);
                break;

            case 'KeyD':
                e.preventDefault();
                move(EAST);
                break;

        }
    }
});

function move(direction){
    controller.setdirection(direction);
}

function pause(){
    if (controller.moving){
        controller.pause();
        pausebtn.innerText = "Resume";
    }
    else {
        controller.unpause();
        pausebtn.innerText = "Pause";
    }
}

function newgame(){
    pausebtn.innerText = "Pause";
    controller.newgame();
}