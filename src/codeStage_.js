import {Stage} from "./class/Stage.js";
import {Player} from "./class/Player.js";
import {Enemy} from "./class/Enemy.js";
import { EditGUI } from "./class/EditGUI.js";

let stage = new Stage();
let processCode = new ProcessCode();
let player = new Player();
let enemies = []; // Array(Enemy)

function init() {
    stage.init();
}

let main = function(p) {
    let editGUI = new EditGUI();

    p.setup = () => {
        let canvas = p.createCanvas(1000, 600);
        canvas.parent('#sketch-container');
        editGUI.init(p);
    }

    p.draw = () => {
        p.background(100);
        stage.drawMain(p);
        player.drawMain(p);
        enemies.forEach((enemy) => {
            enemy.draw(p);
        })
    }
}

let miniMap = (p) => {
    p.setup = () => {
        p.createCanvas(300, 300);
    }

    p.draw = () => {
        p.background(150, 150, 100);
        stage.drawMiniMap(p);
        player.drawMiniMap(p);
    }
}

init();
new p5(main, "mainContainer");
new p5(miniMap, "miniMapContainer");