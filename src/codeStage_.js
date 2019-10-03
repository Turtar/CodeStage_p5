import {ProcessCode} from "./class/ProcessCode.js";
import {Stage} from "./class/Stage.js";
import {Player} from "./class/Player.js";
import {Enemy} from "./class/Enemy.js";
import { EditGUI } from "./class/EditGUI.js";

let stage = new Stage();
let processCode = new ProcessCode();
let player = new Player();
let enemies = []; // Array(Enemy)
let topEnemyNum = 0, bottomEnemyNum = 0;

function setupFileListener() {
    // document.getElementById("top-stage").style.zIndex = -1000;
    let topFiles = [];
    $("#top-file-selector").change((ev) => topFiles = ev.currentTarget.files);
    $("#add-top").click(() => {
        processCode.addStageParams(topFiles[0], true);
        // document.getElementById("top-stage").style.zIndex = 0;
    });

    // document.getElementById("bottom-stage").style.zIndex = -1000;
    let bottomFiles = [];
    $("#bottom-file-selector").change((ev) => bottomFiles = ev.currentTarget.files);
    $("#add-bottom").click(() => {
        processCode.addStageParams(bottomFiles[0], false);
        // document.getElementById("bottom-stage").style.zIndex = 0;
    });
}

function _pushEnemy(isTop) {
    const epArr = isTop ? processCode.enemyParams.top : processCode.enemyParams.bottom;
    const startNum = isTop ? topEnemyNum : bottomEnemyNum;
    for (let i=startNum; i<epArr.length; i++) {
        enemies.push(new Enemy(isTop, epArr[i].index, epArr[i].type, epArr[i].x, epArr[i].y));
    };
    if (isTop) topEnemyNum = epArr.length;
    else bottomEnemyNum = epArr.length;
}

// メインウィンドウ
let main = function(p) {
    let editGUI = new EditGUI();

    p.setup = () => {
        let canvas = p.createCanvas(1000, 600);
        canvas.parent('#sketch-container');
        editGUI.init(p);
    }

    p.draw = () => {
        if (processCode.enemyParams.top.length>topEnemyNum) _pushEnemy(true);
        if (processCode.enemyParams.bottom.length>bottomEnemyNum) _pushEnemy(false);

        p.background(100);
        stage.drawMain(p, processCode.stageParams);
        player.drawMain(p);
        enemies.forEach((enemy) => {
            enemy.draw(p);
        })
    }
}

// ミニマップ
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

setupFileListener();
new p5(main, "mainContainer");
new p5(miniMap, "miniMapContainer");