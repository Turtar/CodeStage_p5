export class Stage {
  constructor() {
    this.stageScrollX = 0;
    this.isStarted = false;
    this.miniMap;
  }

  _drawMainOneSide(p, params, rates, isTop) {
    p.push();
    p.translate(this.stageScrollX, 0);
    if (this.isStarted) this.stageScrollX -= 1;

    if (params.length === 0) return;
    const barW = 18 * rates.w * 0.01;
    const barH = 7 * rates.h * 0.01 * (isTop ? 1 : -1);
    const canvasW = 1000;

    const drawnMin = Math.floor(-this.stageScrollX / barW) - 1;
    const drawnMax = drawnMin + Math.floor(canvasW / barW) + 2;
    for (let i = drawnMin; i <= drawnMax; i++) {
      if (i >= params.length) break;
      if (i < 0) continue;
      const v = params[i];
      p.blendMode(p.ADD);

      p.noStroke();
      p.fill(150);
      p.rect(i * barW, isTop ? 1 : p.height - 1, barW, barH * v.length);

      p.push();
      p.translate(i * barW + 10, isTop ? 1 : p.height - 1);
      p.rotate(isTop ? p.PI / 2.0 : -p.PI / 2.0);
      p.scale(1, isTop ? -1 : 1);
      p.fill(30);
      p.text(params[i].sentence, 0, 0);
      p.pop();

      p.blendMode(p.BLEND);
    }
    p.pop();
  }

  drawMain(p, stageParams, sliderValues) {
    this._drawMainOneSide(p, stageParams.top, sliderValues.top, true);
    this._drawMainOneSide(p, stageParams.bottom, sliderValues.bottom, false);
  }

  _drawMiniOneSide(p, mm, params, rates, isTop) {
    if (params.length === 0) return;
    mm.push();
    mm.scale(3.0 / 20);
    const barW = 18 * rates.w * 0.01;
    const barH = 7 * rates.h * 0.01 * (isTop ? 1 : -1);
    for (let i = 0; i < params.length; i++) {
      const v = params[i];
      mm.noStroke();
      mm.fill(150);
      mm.rect(i * barW, isTop ? 1 : 600 - 1, barW, barH * v.length);
    }
    mm.pop();
  }

  createMiniMap(p, stageParams, sliderValues) {
    this.miniMap = p.createGraphics(1000, 90);
    this._drawMiniOneSide(
      p,
      this.miniMap,
      stageParams.top,
      sliderValues.top,
      true
    );
    this._drawMiniOneSide(
      p,
      this.miniMap,
      stageParams.bottom,
      sliderValues.bottom,
      false
    );
  }

  drawMiniMap(p) {
    p.image(this.miniMap, 0, 0);
  }
}
