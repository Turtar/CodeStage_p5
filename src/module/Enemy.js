const KEYWORDS_COLOR = {
  'hljs-keyword': "#569CD6",
  'hljs-literal': "#569CD6",
  'hljs-symbol': "#569CD6",
  'hljs-name': "#569CD6",

  'hljs-link': "#569CD6",
  
  'hljs-built_in': "#4EC9B0",
  'hljs-type': "#4EC9B0",
  
  'hljs-number': "#B8D7A3",
  'hljs-class': "#B8D7A3",
  
  'hljs-string': "#D69D85",
  'hljs-meta-string': "#D69D85",
  
  'hljs-regexp': "#9A5334",
  'hljs-template-tag': "#9A5334",
  
  'hljs-subst': "#DCDCDC",
  'hljs-function': "#DCDCDC",
  'hljs-title': "#DCDCDC",
  'hljs-params': "#DCDCDC",
  'hljs-formula': "#DCDCDC",
  
  'hljs-comment': "#57A64A",
  'hljs-quote': "#57A64A",
  
  'hljs-doctag': "#608B4E",
  
  'hljs-meta': "#9B9B9B",
  'hljs-meta-keyword': "#9B9B9B",
  'hljs-tag': "#9B9B9B",
  
  'hljs-variable': "#BD63C5",
  'hljs-template-variable': "#BD63C5",
  
  'hljs-attr': "#9CDCFE",
  'hljs-attribute': "#9CDCFE",
  'hljs-builtin-name': "#9CDCFE",
    
  'hljs-bullet': "#D7BA7D",
  'hljs-selector-tag': "#D7BA7D",
  'hljs-selector-id': "#D7BA7D",
  'hljs-selector-class': "#D7BA7D",
  'hljs-selector-attr': "#D7BA7D",
  'hljs-selector-pseudo': "#D7BA7D", 
};

export class Enemy {
  constructor(isTop, num, type, word, x, y) {
    this.isTop = isTop;
    this.sentenceNum = num;
    this.type = type;
    this.word = word;
    this.x = x;
    this.y = y;
  }

  draw(p, sliderValues, stageScrollX) {
    const barW = 18 * (this.isTop ? sliderValues.top.w : sliderValues.bottom.w) * 0.01;
    p.push();
    p.translate(stageScrollX, 0);
    p.fill(KEYWORDS_COLOR[this.type]);
    // p.ellipse(
    //   5 + this.sentenceNum * barW + barW / 2.0 + this.x,
    //   p.height / 2.0 + this.y,
    //   10,
    //   10
    // );
    p.text(
      this.word,
      5 + this.sentenceNum * barW + barW / 2.0 + this.x,
      p.height / 2.0 + this.y,
    )
    p.pop();
  }

  move() {}

  shot() {}
}
