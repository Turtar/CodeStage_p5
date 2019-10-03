export class Stage {
    construntor() {
        this.stageParams = [];
        this.stageScrollX = 0;
        this.isStarted = false;
        // ステージ上部
        // ステージ下部
        // ステージ描画
    }

    _addStageParams(file, isTop) {
        const containerId = isTop ? "top-container" : "bottom-container";
        const container = document.getElementById(containerId);
    }

    _setupFileListener() {
        // document.getElementById("top-stage").style.zIndex = -1000;
        let topFiles = [];
        document.getElementById("top-file-selector").addEventListener("onchange", (ev) => topFiles = ev.currentTargete.files);
        document.getElementById("add-top").onclick = () => {
            this._addStageParams(topFiles[0], true);
            // document.getElementById("top-stage").style.zIndex = 0;
        }

        // document.getElementById("bottom-stage").style.zIndex = -1000;
        let bottomFiles = [];
        document.getElementById("bottom-file-selector").addEventListener("onchange", (ev) => bottomFiles = ev.currentTargete.files);
        document.getElementById("add-bottom").onclick = () => {
            this._addStageParams(bottomFiles[0], false);
            // document.getElementById("bottom-stage").style.zIndex = 0;
        }
    }

    init() {
        console.log("stage init");
        this._setupFileListener();
    }

    drawMain() {

    }

    drawMiniMap() {

    }

    swapSource() {

    }
}
