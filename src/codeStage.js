
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
let resizeParam = 0;


function setup() {
    let canvas = createCanvas(1000, 800);
    canvas.parent('#sketch-container');

    let files;
    let fileSelector = select('#file-selector');
    // console.log(fileSelector);
    fileSelector.elt.onchange = (ev) => {
        files = ev.currentTarget.files;
    };

    let highlightButton = select('#highlight-button');
    highlightButton.elt.onclick = () => {
        let file = files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let code = fileReader.result;
            let codeContainer = document.getElementById("code-container");
            codeContainer.innerHTML = hljs.highlightAuto(code).value;

            // console.log(codeContainer.offsetHeight);
            // console.log(codeContainer.height);
            resizeParam = codeContainer.offsetHeight;

            let sentenceArray = codeContainer.innerText.split(/\r\n|\r|\n/);
            let lengthArray = sentenceArray.map((x)=>x.length);

            htmlArray = codeContainer.innerHTML.split(/\r\n|\r|\n/);
            let keywordArray = htmlArray.map((x)=>{
                h = [];
                hljsKeywords.map((k)=>{
                    x.match(k) && h.push(k);
                });
                return h;
            })
            // console.log(hljsArray);

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

        }
        fileReader.readAsText(file);
    };
}

function draw() {
    // console.log(resizeParam);
    if (resizeParam !== 0) {
        // console.log(true);
        resizeCanvas(resizeParam, 800);
        resizeParam = 0;
        // console.log(resizeParam);
    };

    background(255);
    // sentenceParams && console.log(sentenceParams);
    sentenceParams && sentenceParams.forEach((v, i) => {
        // console.log(v, i);
        fill(255, 0, 0);
        rect(i*30, height-1, 30, -10*v.length);
    });
}
