import { codeAnime } from './AnimeFunc.js'

const HLJS_KEYWORDS = [
  'hljs-keyword',
  'hljs-literal',
  'hljs-symbol',
  'hljs-name',

  'hljs-link',
  
  'hljs-built_in',
  'hljs-type',
  
  'hljs-number',
  'hljs-class',
  
  'hljs-string',
  'hljs-meta-string',
  
  'hljs-regexp',
  'hljs-template-tag',
  
  'hljs-subst',  
  'hljs-function',
  'hljs-title',
  'hljs-params',
  'hljs-formula',
  
  'hljs-comment',
  'hljs-quote',
  
  'hljs-doctag',
  
  'hljs-meta',
  'hljs-meta-keyword',
  'hljs-tag',
  
  'hljs-variable',
  'hljs-template-variable',
  
  'hljs-attr',
  'hljs-attribute',
  'hljs-builtin-name',
  
  'hljs-selection',
  
  'hljs-bullet',
  'hljs-selector-tag',
  'hljs-selector-id',
  'hljs-selector-class',
  'hljs-selector-attr',
  'hljs-selector-pseudo', 
];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/* 
stageParams = {
    top: [{ length, sentence, hljsKeywords }], 
    bottom: [{ length, sentence, hljsKeywords }]
}

enemyParams = {
    top: [{ index, type, pos: {x, y} }], 
    bottom: [{ index, type, pos: {x, y} }]
}
*/

export class ProcessCode {
  constructor() {
    this.stageParams = {
      top: [],
      bottom: []
    };
    this.enemyParams = {
      top: [],
      bottom: []
    };
  }

  addStageParams(file, isTop) {
    if (file === null) return;
    const containerId = isTop ? 'top-container' : 'bottom-container';
    const codeContainer = document.getElementById(containerId);
    let fileReader = new FileReader();

    fileReader.onload = () => {
      codeContainer.innerHTML = hljs.highlightAuto(fileReader.result).value;

      // ハイライトのキーワードリストを作成
      const keywordArray = codeContainer.innerHTML
        .split(/\r\n|\r|\n/)
        .map(row => {
          const resArray = [];
          HLJS_KEYWORDS.forEach(key => {
            if (row.match(key)) {
              resArray.push(key);
            }
          });
          return resArray;
        });

      // sentenceParamsに文字長、キーワードリストを登録
      let spArr = [],
        epArr = [];
      const sentenceArray = codeContainer.innerText.split(/\r\n|\r|\n/);
      sentenceArray.forEach((senVal, senId) => {
        spArr.push({
          length: senVal.length,
          sentence: senVal,
          hljsKeywords: keywordArray[senId]
        });

        keywordArray[senId].forEach(keyVal => {
          epArr.push({
            index: senId,
            type: keyVal,
            pos: {
              x: getRandomArbitrary(-50, 50),
              y: getRandomArbitrary(-200, 200),
            }
          });
        });
      });

      if (isTop) {
        this.stageParams.top = this.stageParams.top.concat(spArr);
        this.enemyParams.top = this.enemyParams.top.concat(epArr);
      } else {
        this.stageParams.bottom = this.stageParams.bottom.concat(spArr);
        this.enemyParams.bottom = this.enemyParams.bottom.concat(epArr);
      }

      codeAnime(isTop);
    };
    fileReader.readAsText(file);
  }
}
