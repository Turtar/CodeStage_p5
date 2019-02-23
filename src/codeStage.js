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

let sentenceParamsTop = [];
let sentenceParamsBottom = [];
let flag = true;
let topWSlider, topHSlider;
let bottomWSlider, bottomHSlider;

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
        // console.log(htmlArray);

        // JSONの作成
        // sentenceParams = [];
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
        // document.getElementById(`code-stage-${stagePart}`).className += ` ${stagePart}-active`
        const canvasHeight = parseInt(canvas.style.height.match(/\d+/)[0], 10);
        const canvasWidth = parseInt(canvas.style.width.match(/\d+/)[0], 10);
        if (canvasHeight===400 || canvasWidth<codeContainer.offsetHeight) {
            resizeCanvas(codeContainer.offsetHeight, 600);
        }
    }
    fileReader.readAsText(file);
}

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('#sketch-container');
    topWSlider = createSlider(0, 300, 83);
    topWSlider.position(20, 150);
    topHSlider = createSlider(0, 300, 70);
    topHSlider.position(20, 170);
    bottomWSlider = createSlider(0, 300, 83);
    bottomWSlider.position(20, 190);
    bottomHSlider = createSlider(0, 300, 70);
    bottomHSlider.position(20, 210);
    
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


    if (sentenceParamsTop) {
        push();
        sentenceParamsTop.forEach((v, i) => {
            const w = 18, h = 7;
            const wRate = topWSlider.value()*0.01, hRate = topHSlider.value()*0.01;
            noStroke();
            fill('#CF9848');
            rect(5+i*w*wRate, 1, w*wRate, h*v.length*hRate);
        });
        pop();
    }

    if (sentenceParamsBottom) {
        push();
        sentenceParamsBottom.forEach((v, i) => {
            const w = 18, h = -7;
            const wRate = bottomWSlider.value()*0.01, hRate = bottomHSlider.value()*0.01;
            noStroke();
            fill('#CF9848');
            rect(7+i*w*wRate, height-1, w*wRate, h*v.length*hRate);
        });
        pop();
    }

    noStroke();
    fill(0, 100);
    rect(0, 0, 200, 100);

    // let bottomActive = document.getElementsByClassName('bottom-active')[0];
 
    // let getTransformY = (elem) => {
    //     let matrix = getComputedStyle(elem).transform;
    //     console.log(matrix);
    //     console.log('hage');
    //     return matrix;
    // }
    // getTransformY(bottomActive);
}
