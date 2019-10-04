export class EditGUI {
    constructor() {
        this.x = 15;
        this.y = 5;
        this.w = 300;
        this.topWSlider;
        this.topHSlider;
        this.bottomWSlider;
        this.bottomHSlider;
        this.startButton;
        this.isStarted = false;
        this.sliderIsChanged = true;
    }
    
    init(p) {
        const setSlider = (min, max, initialValue, x, y) => {
            const slider = p.createSlider(min, max, initialValue);
            slider.changed(() => this.sliderIsChanged = true);
            slider.position(x, y);
            return slider;
        }
        this.topWSlider = setSlider(0, this.w, 83, this.x, this.y);
        this.topHSlider = setSlider(0, this.w, 70, this.x, this.y+20);
        this.bottomWSlider = setSlider(0, this.w, 83, this.x, this.y+40);
        this.bottomHSlider = setSlider(0, this.w, 70, this.x, this.y+60);

        this.startButton = p.createButton('Play Game');
        this.startButton.position(this.x, this.y+90);
        this.startButton.mousePressed(() => {
            this.stageScrollX = 0;
            this.isStarted = true;
        });
    }

    drawBackground(p) {
        p.fill(50, 230);
        p.rect(0, 0, 165, 130);
    }

    get sliderValues() {
        return {
            top: {
                w: this.topWSlider.value(),
                h: this.topHSlider.value(),
            },
            bottom: {
                w: this.bottomWSlider.value(),
                h: this.bottomHSlider.value(),
            },
        }
    }
}