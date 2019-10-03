const HLJS_KEYWORDS = [
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

export class ProcessCode {
    constructor() {
        this.sentenceParams = {
            top: [],
            bottom: [],
        };
    }

    _addStageParams(file, isTop) {
        if (file===null) return;
        const containerId = isTop ? "top-container" : "bottom-container";
        const codeContainer = document.getElementById(containerId);
        let fileReader = new FileReader();
        
        fileReader.onload = () => {
            codeContainer.innerHTML = hljs.highlightAuto(fileReader.result).value;

            // ハイライトのキーワードリストを作成
            const keywordArray = codeContainer.innerHTML.split(/\r\n|\r|\n/).map((row) => {
                const resArray = [];
                HLJS_KEYWORDS.forEach((key) => {
                    if (row.match(key)) {
                        resArray.push(key);
                    }
                });
                return resArray;
            });

            // sentenceParamsに文字長、キーワードリストを登録
            const sentenceArray = codeContainer.innerText.split(/\r\n|\r|\n/);
            sentenceArray.forEach((v, i) => {
                if (isTop) {
                    this.sentenceParams.top.push({
                        length: v.length,
                        hljsKeywords: keywordArray[i],
                    });
                } else {
                    this.sentenceParams.bottom.push({
                        length: v.length,
                        hljsKeywords: keywordArray[i],
                    });
                }
            });
        }
        fileReader.readAsText(file);
    }

    _setupFileListener() {
        // document.getElementById("top-stage").style.zIndex = -1000;
        let topFiles = [];
        $("#top-file-selector").change((ev) => topFiles = ev.currentTarget.files);
        document.getElementById("add-top").onclick = () => {
            this._addStageParams(topFiles[0], true);
            // document.getElementById("top-stage").style.zIndex = 0;
        }

        // document.getElementById("bottom-stage").style.zIndex = -1000;
        let bottomFiles = [];
        $("#bottom-file-selector").change((ev) => bottomFiles = ev.currentTarget.files);
        document.getElementById("add-bottom").onclick = () => {
            this._addStageParams(bottomFiles[0], false);
            // document.getElementById("bottom-stage").style.zIndex = 0;
        }
    }

    init() {
        this._setupFileListener();
    }
}