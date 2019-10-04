const HLJS_KEYWORDS = [
  'hljs-keyword',
  'hljs-string',
  'hljs-class',
  'hljs-attr',
  'hljs-literal',
  'hljs-built_in',
  'hljs-meta',
  'hljs-number',
  'hljs-function',
  'hljs-comment',
  'hljs-symbol',
  'hljs-title'
];
let sentenceParamsTop = [];
sentenceParamsBottom = [];
let isTopReversed = true,
  isStarted = false;
let topWSlider, topHSlider, bottomWSlider, bottomHSlider;
let startButton;
let stageScrollX = 0;
let playerX = (playerY = 0);
let enemyParams = [];

function setup() {
  const createSentenceParams = (file, codeContainer, sentenceParams, isTop) => {
    if (file === null) return;
    let fileReader = new FileReader();
    fileReader.onload = () => {
      codeContainer.innerHTML = hljs.highlightAuto(fileReader.result).value;

      // JSONの作成
      const keywordArray = codeContainer.innerHTML
        .split(/\r\n|\r|\n/)
        .map(row => {
          resArray = [];
          HLJS_KEYWORDS.map(key => {
            if (row.match(key)) {
              resArray.push(key);
            }
          });
          return resArray;
        });
      const sentenceArray = codeContainer.innerText.split(/\r\n|\r|\n/);
      for (let i = 0; i < sentenceArray.length; i++) {
        sentenceParams.push({
          length: sentenceArray[i].length,
          hljsKeywords: keywordArray[i]
        });
      }

      const stagePart = isTop ? '#code-stage-top' : '#code-stage-bottom';
      const stageHeight = isTop
        ? -(10 + $('#code-stage-top').offsetHeight())
        : 600;
      anime
        .timeline()
        .add({
          targets: stagePart,
          translateY: stageHeight,
          rotate: isTop
            ? {
                value: 90,
                duration: 1000,
                easing: 'cubicBezier(0, 0, 0.58, 1.0)'
              }
            : {
                value: -90,
                duration: 1000,
                easing: 'cubicBezier(0, 0, 0.58, 1.0)'
              }
        })
        .add({
          targets: stagePart,
          opacity: 0,
          delay: 100,
          duration: 5000,
          easing: 'easeOutSine'
        })
        .add({
          targets: stagePart,
          zIndex: -100,
          delay: 150
        });
    };
    fileReader.readAsText(file);
  };

  const setupStageMaker = () => {
    document.getElementById('code-stage-top').style.zIndex = -1000;
    document.getElementById('code-stage-bottom').style.zIndex = -1000;

    let topFiles, bottomFiles;
    select('#file-selector-top').elt.onchange = ev =>
      (topFiles = ev.currentTarget.files);
    select('#file-selector-bottom').elt.onchange = ev =>
      (bottomFiles = ev.currentTarget.files);
    select('#highlight-button').elt.onclick = () => {
      if (topFiles) {
        const codeContainerTop = document.getElementById('code-container-top');
        createSentenceParams(
          topFiles[0],
          codeContainerTop,
          sentenceParamsTop,
          true
        );
        document.getElementById('code-stage-top').style.zIndex = 0;
      }
      if (bottomFiles) {
        const codeContainerBottom = document.getElementById(
          'code-container-bottom'
        );
        createSentenceParams(
          bottomFiles[0],
          codeContainerBottom,
          sentenceParamsBottom,
          false
        );
        document.getElementById('code-stage-bottom').style.zIndex = 0;
      }
    };
  };

  const setupGUI = () => {
    topWSlider = createSlider(0, 300, 83);
    topWSlider.position(20, 140);
    topHSlider = createSlider(0, 300, 70);
    topHSlider.position(20, 160);
    bottomWSlider = createSlider(0, 300, 83);
    bottomWSlider.position(20, 180);
    bottomHSlider = createSlider(0, 300, 70);
    bottomHSlider.position(20, 200);
    startButton = createButton('Play Game');
    startButton.position(20, 230);
    startButton.mousePressed(() => {
      stageScrollX = 0;
      isStarted = true;
    });
  };

  const setupGameObjects = () => {
    playerX = 10.0;
    playerY = height / 2.0;
    colorMode(HSB, 360, 100, 100, 100);
  };

  let canvas = createCanvas(1000, 600);
  canvas.parent('#sketch-container');
  window.addEventListener('keydown', event => event.preventDefault());

  setupStageMaker();
  setupGUI();
  setupGameObjects();
  console.log('setup');
}

function draw() {
  if (
    sentenceParamsTop.length > 0 &&
    sentenceParamsBottom.length > 0 &&
    isTopReversed
  ) {
    sentenceParamsTop.reverse();
    sentenceParamsTop.forEach((v, i) => {
      v.hljsKeywords.forEach(type => {
        enemyParams.push({
          stage: 'top',
          index: i,
          type: type,
          pos: {
            x: random(-50, 50),
            y: random(-200, 200)
          }
        });
      });
    });
    sentenceParamsBottom.forEach((v, i) => {
      v.hljsKeywords.forEach(type => {
        enemyParams.push({
          stage: 'bottom',
          index: i,
          tyle: type,
          pos: {
            x: random(-50, 50),
            y: random(-200, 200)
          }
        });
      });
    });
    isTopReversed = false;
    console.log('draw');
  }

  background('#C4A381');

  push();
  translate(stageScrollX, 0);
  if (isStarted) stageScrollX -= 1;

  if (sentenceParamsTop.length > 0) {
    const barW = 18 * topWSlider.value() * 0.01;
    const barH = 7 * topHSlider.value() * 0.01;
    const canvasWidth = 1000;

    const drawnTopMin = Math.floor(-stageScrollX / barW) - 1;
    const drawnTopMax = drawnTopMin + Math.floor(canvasWidth / barW) + 2;

    for (let i = drawnTopMin; i <= drawnTopMax; i++) {
      if (i >= sentenceParamsTop.length) break;
      if (i < 0) continue;
      const v = sentenceParamsTop[i];
      noStroke();
      fill('#874E30');
      rect(5 + i * barW, 1, barW, barH * v.length);
      // v.hljsKeywords.forEach((item) => {
      //     fill(360.0 / (1+HLJS_KEYWORDS.indexOf(item)), 100, 100);
      //     ellipse(5+i*barW + barW/2.0 + random(-10, 10), height/2.0+random(-10, 10), 10, 10);
      // });
    }
  }
  if (sentenceParamsBottom.length > 0) {
    const barW = 18 * bottomWSlider.value() * 0.01;
    const barH = -7 * bottomHSlider.value() * 0.01;
    const canvasWidth = 1000;

    const drawnBottomMin = Math.floor(-stageScrollX / barW) - 1;
    const drawnBottomMax = drawnBottomMin + Math.floor(canvasWidth / barW) + 2;

    for (let i = drawnBottomMin; i <= drawnBottomMax; i++) {
      if (i >= sentenceParamsBottom.length) break;
      if (i < 0) continue;
      const v = sentenceParamsBottom[i];
      noStroke();
      fill('#874E30');
      rect(7 + i * barW, height - 1, barW, barH * v.length);
      // v.hljsKeywords.forEach((item) => {
      //     fill(360.0 / (1+HLJS_KEYWORDS.indexOf(item)), 100, 100);
      //     ellipse(5+i*barW + barW/2.0 + random(-10, 10), height/2.0+random(-10, 10), 10, 10);
      // });
    }
  }

  if (enemyParams.length > 0) {
    enemyParams.forEach(v => {
      const barW =
        v.stage === 'top'
          ? 18 * topWSlider.value() * 0.01
          : 18 * bottomWSlider.value() * 0.01;
      fill(360.0 / (1 + HLJS_KEYWORDS.indexOf(v.type)), 100, 100);
      ellipse(
        5 + v.index * barW + barW / 2.0 + v.pos.x,
        height / 2.0 + v.pos.y,
        10,
        10
      );
    });
  }
  pop();

  push();
  translate(playerX, playerY);
  ellipse(0, 0, 30, 30);
  if (keyIsDown(LEFT_ARROW)) playerX -= 1;
  if (keyIsDown(RIGHT_ARROW)) playerX += 1;
  if (keyIsDown(UP_ARROW)) playerY -= 1;
  if (keyIsDown(DOWN_ARROW)) playerY += 1;
  pop();

  // 調整バーの背景
  noStroke();
  fill(0, 0, 0, 50);
  rect(0, 0, 200, 120);

  // if (enemyParams.length>0) {
  //     enemyParams.find((v) => {
  //         const barW = v.stage==="top" ? 18 * topWSlider.value() * 0.01 : 18 * bottomWSlider.value() * 0.01;
  //         const enemyX = 5+v.index*barW + barW/2.0 + v.pos.x;
  //         const enemyY = height/2.0+v.pos.y;
  //         if (dist(playerX, playerY, enemyX, enemyY)) {
  //             return true;
  //         }
  //     });

  // }
}

function isInBox(x, y, x1, x2, y1, y2) {
  return x > x1 && x < x2 && y > y1 && y < y2;
}

function mouseDragged() {
  if (isStarted) return;
  if (!isInBox(mouseX, mouseY, 0, width, 0, height)) return;
  if (isInBox(mouseX, mouseY, 0, 200, 0, 100)) return;
  stageScrollX -= pmouseX - mouseX;
}
