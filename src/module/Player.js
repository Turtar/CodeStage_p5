export class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  init(p) {
    this.x = 50;
    this.y = p.height / 2.0;
  }

  draw(p) {
    p.push();
    p.translate(this.x, this.y);
    p.fill(255, 0, 0);
    p.ellipse(0, 0, 20, 20);
    p.pop();
  }

  move(p) {
    if (p.keyIsDown(p.LEFT_ARROW)) this.x -= 1;
    if (p.keyIsDown(p.RIGHT_ARROW)) this.x += 1;
    if (p.keyIsDown(p.UP_ARROW)) this.y -= 1;
    if (p.keyIsDown(p.DOWN_ARROW)) this.y += 1;
  }
}
