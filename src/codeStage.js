// import anime from '../node_modules/animejs/lib/anime.es.js';

const hljsKeywords = [
    "hljs-keyword",
    "hljs-string",
    "hljs-class",
    "hljs-attr",
    "hljs-literal",
    "hljs-built_in",
    "hljs-meta",
    "hljs-number",
    "hljs-function",
    "hljs-comment",
    "hljs-symbol",
    "hljs-title",
]

let sentenceParamsTop = [], sentenceParamsBottom = [];
let flag = true, isStarted = false;
let topWSlider, topHSlider;
let bottomWSlider, bottomHSlider;
let startButton;
let stageScrollX = 0;

let createParamsJson = (file, codeContainer, sentenceParams, isTop) => {
    if (file===null) return;
    let fileReader = new FileReader();
    fileReader.onload = () => {
        const code = fileReader.result;
        codeContainer.innerHTML = hljs.highlightAuto(code).value;

        const sentenceArray = codeContainer.innerText.split(/\r\n|\r|\n/);
        const lengthArray = sentenceArray.map((x)=>x.length);

        htmlArray = codeContainer.innerHTML.split(/\r\n|\r|\n/);
        const keywordArray = htmlArray.map((row)=>{
            resArray = [];
            hljsKeywords.map((key)=>{
                if (row.match(key)) {
                    resArray.push(key);
                }
            });
            return resArray;
        });

        // JSONの作成
        let len = sentenceArray.length;
        for(let i=0; i<len; i++){
            sentenceParams.push({
                length: lengthArray[i],
                hljsKeywords: keywordArray[i],
            });
        }

        const stagePart = isTop ? "top" : "bottom";
        const stageHeight = isTop ? -(10+document.getElementById("code-stage-top").offsetHeight) : 600;
        anime.timeline()
            .add({
                targets: `#code-stage-${stagePart}`,
                translateY: stageHeight,
                rotate: isTop ? {
                    value: 90,
                    duration: 1000,
                    easing: 'cubicBezier(0, 0, 0.58, 1.0)',
                } : {
                    value: -90,
                    duration: 1000,
                    easing: 'cubicBezier(0, 0, 0.58, 1.0)',
                },
            })
            .add({
                targets: `#code-stage-${stagePart}`,
                opacity: 0,
                delay: 100,
                duration: 5000,
                easing: 'easeOutSine',
            })
            .add({
                targets: `#code-stage-${stagePart}`,
                zIndex: -100,
                delay: 150,
            });
    }
    fileReader.readAsText(file);
}

function setup() {
    let canvas = createCanvas(1000, 600);
    canvas.parent('#sketch-container');
    topWSlider = createSlider(0, 300, 83);
    topWSlider.position(20, 140);
    topHSlider = createSlider(0, 300, 70);
    topHSlider.position(20, 160);
    bottomWSlider = createSlider(0, 300, 83);
    bottomWSlider.position(20, 180);
    bottomHSlider = createSlider(0, 300, 70);
    bottomHSlider.position(20, 200);
    startButton = createButton('START');
    startButton.position(20, 230);
    startButton.mousePressed(() => {
        stageScrollX = 0;
        isStarted = true;
        console.log(true);
    });
    
    document.getElementById("code-stage-top").style.zIndex = -10;
    document.getElementById("code-stage-bottom").style.zIndex = -10;

    let topFiles;
    select('#file-selector-top').elt.onchange = (ev) => topFiles = ev.currentTarget.files;
    let bottomFiles;
    select('#file-selector-bottom').elt.onchange = (ev) => bottomFiles = ev.currentTarget.files;
    select('#highlight-button').elt.onclick = () => {
        if (topFiles) {
            const codeContainerTop = document.getElementById("code-container-top");
            createParamsJson(topFiles[0], codeContainerTop, sentenceParamsTop, true);
            document.getElementById("code-stage-top").style.zIndex = 0;
        }
        if (bottomFiles) {
            const codeContainerBottom = document.getElementById("code-container-bottom");
            createParamsJson(bottomFiles[0], codeContainerBottom, sentenceParamsBottom, false);
            document.getElementById("code-stage-bottom").style.zIndex = 0;
        }
    };
}

function draw() {
    if (sentenceParamsTop.length>0 && flag) { 
        sentenceParamsTop.reverse();
        flag = false;
    }

    background(200);

    push();
    if (!isStarted) {
        translate(stageScrollX, 0);
    } else {
        translate(stageScrollX, 0);
        stageScrollX -= 1;
    }
    if (sentenceParamsTop) {
        sentenceParamsTop.forEach((v, i) => {
            const w = 18, h = 7;
            const wRate = topWSlider.value()*0.01, hRate = topHSlider.value()*0.01;
            noStroke();
            fill('#CF9848');
            rect(5+i*w*wRate, 1, w*wRate, h*v.length*hRate);
        });
    }

    if (sentenceParamsBottom) {
        sentenceParamsBottom.forEach((v, i) => {
            const w = 18, h = -7;
            const wRate = bottomWSlider.value()*0.01, hRate = bottomHSlider.value()*0.01;
            noStroke();
            fill('#CF9848');
            rect(7+i*w*wRate, height-1, w*wRate, h*v.length*hRate);
        });
    }
    pop();

    noStroke();
    fill(0, 100);
    rect(0, 0, 200, 120);
}

function mouseDragged() {
    if (isStarted) return;
    if (!(isInBox(mouseX, mouseY, 0, width, 0, height))) return;
    if (isInBox(mouseX, mouseY, 0, 200, 0, 100)) return;
    stageScrollX -= pmouseX - mouseX;
}

function isInBox(x, y, x1, x2, y1, y2) {
    return x>x1 && x<x2 && y>y1 && y<y2;
}