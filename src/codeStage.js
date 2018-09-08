

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

let files;

let fileSelector = document.getElementById("file-selector");
fileSelector.onchange = (ev) => {
    files = ev.currentTarget.files;
};

let highlightButton = document.getElementById("highlight-button");
highlightButton.onclick = () => {
    let file = files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
        let code = fileReader.result;
        let codeContainer = document.getElementById("code-container");
        codeContainer.innerHTML = hljs.highlightAuto(code).value;

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
        let sentenceParams = [];
        let len = sentenceArray.length;
        for(let i=0; i<len; i++){
            sentenceParams.push({
                length: lengthArray[i],
                hljsKeywords: keywordArray[i],
            });
        }
        console.log(sentenceParams);

        document.getElementById("code-stage").className += " bottom-active";

    }
    fileReader.readAsText(file);
}


// let testContainer = document.getElementById("test-container");

// sentenceElems.map((x)=>{
//     let c = document.createElement("code");
//     c.innerHTML = x;
//     let p = document.createElement("pre").appendChild(c);
//     testContainer.appendChild(p);
// })