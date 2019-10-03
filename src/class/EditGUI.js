export class EditGUI {
    constructor() {
        this.x = 20;
        this.y = 140;
        this.w = 300;
        this.topWSlider;
        this.topHSlider;
        this.bottomWSlider;
        this.bottomHSlider;
        this.startButton;
        this.isStarted = false;
    }
    
    init(p) {
        const setSlider = (min, max, initialValue, x, y) => {
            const slider = p.createSlider(min, max, initialValue);
            slider.position(x, y);
            return slider;
        }
        this.topWSlider = setSlider(0, this.w, 83, this.x, this.y);
        this.topHSlider = setSlider(0, this.w, 70, this.x, this.y+20);
        this.bottomWSlider = setSlider(0, this.w, 83, this.x, this.y+40);
        this.bottomHSlider = setSlider(0, this.w, 83, this.x, this.y+60);

        this.startButton = p.createButton('Play Game');
        this.startButton.position(this.x, this.y+90);
        this.startButton.mousePressed(() => {
            this.stageScrollX = 0;
            this.isStarted = true;
        });
    }
}