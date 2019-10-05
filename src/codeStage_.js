import { ProcessCode } from './module/ProcessCode.js';
import { Stage } from './module/Stage.js';
import { Player } from './module/Player.js';
import { Enemy } from './module/Enemy.js';
import { EditGUI } from './module/EditGUI.js';

let stage = new Stage();
let processCode = new ProcessCode();
let player = new Player();
let enemies = []; // Array(Enemy)
let topEnemyNum = 0,
  bottomEnemyNum = 0;
let editGUI = new EditGUI();
let needUpdate = true;

function setupFileListener() {
  let topFiles = [];
  $('#top-file-selector').change(ev => (topFiles = ev.currentTarget.files));
  $('#add-top').click(() => {
    processCode.addStageParams(topFiles[0], true);
    needUpdate = true;
    $('#top-stage').css('z-index', 1000);
    // processCode.initTop();
  });

  let bottomFiles = [];
  $('#bottom-file-selector').change(
    ev => (bottomFiles = ev.currentTarget.files)
  );
  $('#add-bottom').click(() => {
    processCode.addStageParams(bottomFiles[0], false);
    needUpdate = true;
    $('#bottom-stage').css('z-index', 1000);
    // processCode.initBottom();
  });
}

function _pushEnemy(isTop) {
  const epArr = isTop
    ? processCode.enemyParams.top
    : processCode.enemyParams.bottom;
  const startNum = isTop ? topEnemyNum : bottomEnemyNum;
  for (let i = startNum; i < epArr.length; i++) {
    enemies.push(
      new Enemy(
        isTop,
        epArr[i].index,
        epArr[i].type,
        epArr[i].word,
        epArr[i].pos.x,
        epArr[i].pos.y
      )
    );
  }
  if (isTop) topEnemyNum = epArr.length;
  else bottomEnemyNum = epArr.length;
}

// メインウィンドウ
let main = p => {
  p.setup = () => {
    p.createCanvas(1000, 600);
    editGUI.init(p);
    player.init(p);
  };

  p.draw = () => {
    if (processCode.enemyParams.top.length > topEnemyNum) _pushEnemy(true);
    if (processCode.enemyParams.bottom.length > bottomEnemyNum)
      _pushEnemy(false);

    p.background(20);
    stage.drawMain(
      p,
      processCode.stageParams,
      editGUI.sliderValues,
      editGUI.isStarted
    );
    enemies.forEach(enemy => {
      enemy.draw(p, editGUI.sliderValues, stage.stageScrollX);
    });
    player.draw(p);
    player.move(p);
    if (!editGUI.isStarted) editGUI.drawBackground(p);
    if (editGUI.isStarted) stage.stageScrollX -= 1;
  };

  function _isInBox(x, y, x1, x2, y1, y2) {
    return x > x1 && x < x2 && y > y1 && y < y2;
  }

  p.mouseDragged = () => {
    if (editGUI.isStarted) return;
    if (!_isInBox(p.mouseX, p.mouseY, 0, p.width, 0, p.height)) return;
    if (_isInBox(p.mouseX, p.mouseY, 0, 165, 0, 130)) return;
    stage.stageScrollX -= p.pmouseX - p.mouseX;
  };
};

// ミニマップ
let miniMap = p => {
  p.setup = () => {
    p.createCanvas(1000, 90);
  };

  p.draw = () => {
    p.background(20);

    if (needUpdate) {
      stage.createMiniMap(p, processCode.stageParams, editGUI.sliderValues);
      editGUI.sliderIsChanged = false;
      needUpdate = false;
    } else {
      needUpdate = editGUI.sliderIsChanged;
    }
    stage.drawMiniMap(p);
  };
};

setupFileListener();
new p5(main, 'main-container');
new p5(miniMap, 'mini-map-container');
