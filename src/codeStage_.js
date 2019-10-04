import {ProcessCode} from "./class/ProcessCode.js";
import {Stage} from "./class/Stage.js";
import {Player} from "./class/Player.js";
import {Enemy} from "./class/Enemy.js";
import {EditGUI} from "./class/EditGUI.js";

let stage = new Stage();
let processCode = new ProcessCode();
let player = new Player();
let enemies = []; // Array(Enemy)
let topEnemyNum = 0, bottomEnemyNum = 0;
let editGUI = new EditGUI();


function setupFileListener() {
    document.getElementById("top-stage").style.zIndex = -1000;
    let topFiles = [];
    $("#top-file-selector").change((ev) => topFiles = ev.currentTarget.files);
    $("#add-top").click(() => {
        processCode.addStageParams(topFiles[0], true);
        document.getElementById("top-stage").style.zIndex = 0;
    });

    document.getElementById("bottom-stage").style.zIndex = -1000;
    let bottomFiles = [];
    $("#bottom-file-selector").change((ev) => bottomFiles = ev.currentTarget.files);
    $("#add-bottom").click(() => {
        processCode.addStageParams(bottomFiles[0], false);
        document.getElementById("bottom-stage").style.zIndex = 0;
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
let main = (p) => {
    p.setup = () => {
        // let canvas = p.createCanvas(1000, 600);
        p.createCanvas(1000, 600);
        editGUI.init(p);
    }

    p.draw = () => {
        if (processCode.enemyParams.top.length>topEnemyNum) _pushEnemy(true);
        if (processCode.enemyParams.bottom.length>bottomEnemyNum) _pushEnemy(false);

        p.background(20);
        stage.drawMain(p, processCode.stageParams, editGUI.sliderValues);
        player.drawMain(p);
        enemies.forEach((enemy) => {
            enemy.draw(p);
        })
        editGUI.drawBackground(p);

    }
}


// ミニマップ
let miniMap = (p) => {
    p.setup = () => {
        p.createCanvas(1000, 90);
    }

    p.draw = () => {
        p.background(20);
        // p.push();
        // p.translate(p.width-300, p.height-90);
        // p.strokeWeight(5);
        // p.stroke(150, 150, 100);
        // p.rect(0, 0, 300, 90);
        // p.fill(20, 240);
        // p.rect(5, 5, 290, 80, 1);


        if (editGUI.sliderIsChanged) {
            console.log(true)
            stage.createMiniMap(p, processCode.stageParams, editGUI.sliderValues);
            editGUI.sliderIsChanged = false;
        }
        stage.drawMiniMap(p);
        // p.pop();
    }
}


setupFileListener();
new p5(main, "main-container");
new p5(miniMap, "mini-map-container");
