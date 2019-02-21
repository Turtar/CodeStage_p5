
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

let sentenceParams;

function setup() {
    let canvas = createCanvas(1000, 800);
    canvas.parent('#sketch-container');

    let files;
    let fileSelector = select('#file-selector-top');
    fileSelector.elt.onchange = (ev) => {
        files = ev.currentTarget.files;
    };

    let highlightButton = select('#highlight-button-top');
    highlightButton.elt.onclick = () => {
        if (files[0]===null) return;
        const file = files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            const code = fileReader.result;
            let codeContainer = document.getElementById("code-container");
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
            sentenceParams = [];
            let len = sentenceArray.length;
            for(let i=0; i<len; i++){
                sentenceParams.push({
                    length: lengthArray[i],
                    hljsKeywords: keywordArray[i],
                });
            }

            document.getElementById("code-stage").className += " bottom-active";
            resizeCanvas(codeContainer.offsetHeight, 800);
        }
        fileReader.readAsText(file);
    };
}

function draw() {    
    background(200);

    if (sentenceParams) {
        sentenceParams.forEach((v, i) => {
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
