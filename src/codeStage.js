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
        })
        console.log(htmlArray);

        // JSONの作成
        // sentenceParams = [];
        let len = sentenceArray.length;
        for(let i=0; i<len; i++){
            sentenceParams.push({
                length: lengthArray[i],
                hljsKeywords: keywordArray[i],
            });
        }

        stagePart = isTop ? "top" : "bottom";
        document.getElementById(`code-stage-${stagePart}`).className += ` ${stagePart}-active`
        resizeCanvas(codeContainer.offsetHeight, 800);
    }
    fileReader.readAsText(file);
}

function setup() {
    let canvas = createCanvas(1000, 800);
    canvas.parent('#sketch-container');

    let topFiles;
    select('#file-selector-top').elt.onchange = (ev) => topFiles = ev.currentTarget.files;
    let bottomFiles;
    select('#file-selector-bottom').elt.onchange = (ev) => bottomFiles = ev.currentTarget.files;
    
    select('#highlight-button').elt.onclick = () => {
        if (topFiles) {
            const codeContainerTop = document.getElementById("code-container-top");
            createParamsJson(topFiles[0], codeContainerTop, sentenceParamsTop, true);
        }
        if (bottomFiles) {
            const codeContainerBottom = document.getElementById("code-container-bottom");
            createParamsJson(bottomFiles[0], codeContainerBottom, sentenceParamsBottom, false);
        }
    };
}

function draw() {
    background(200);

    if (sentenceParamsTop) {
        sentenceParamsTop.forEach((v, i) => {
            fill(0, 255, 0);
            rect(i*30, 1, 30, 10*v.length);
        });
    }

    if (sentenceParamsBottom) {
        sentenceParamsBottom.forEach((v, i) => {
            fill(255, 0, 0);
            rect(i*30, height-1, 30, -10*v.length);
        });
    }

    let bottomActive = document.getElementsByClassName('bottom-active')[0];
 
    let getTransformY = (elem) => {
        let matrix = getComputedStyle(elem).transform;
        console.log(matrix);
        console.log('hage');
        return matrix;
    }
    getTransformY(bottomActive);
}
