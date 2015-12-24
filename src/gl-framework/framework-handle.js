/**
 * Created by mattguay on 12/23/15.
 */

/**
 * Handles key press events.
 * @param {KeyboardEvent} e
 */
Framework.prototype.handleKeyDown = function(e) {
    this.keys[e.keyCode] = true;
};

/**
 * Handles key release events.
 * @param {KeyboardEvent} e
 */
Framework.prototype.handleKeyUp = function(e) {
    this.keys[e.keyCode] = false;
    this.togglables[e.keyCode] = true;
};

/**
 * Handles all actions to be taken due to keyboard state.
 */
Framework.prototype.handleKeys = function() {

};

/**
 * Handles mouse clicks on the canvas.
 * @param {MouseEvent} e
 */
Framework.prototype.handleClick = function(e) {

};

/**
 * Handles input from the sketch's radio buttons that control visual quality.
 */
Framework.prototype.handleQualityChange = function() {
    // Quality radio button value.
    var quality = $('input[name="q1"]:checked').val();

    // Set the canvas scale based on the quality setting
    if(quality === 'low') {
        this.canvasScale = 0.3;
    } else if(quality === 'medium') {
        this.canvasScale = 0.6;
    } else if(quality === 'high') {
        this.canvasScale = 0.8;
    } else if(quality === 'best') {
        this.canvasScale = 1;
    }

    // Canvas size radio button value.
    var canvasSize = $('input[name="q2"]:checked').val();

    // Determine which directions to stretch the canvas in.
    this.xStretch = false;
    this.yStretch = false;
    if(canvasSize === 'half') {
        // Half-screen. Stretch in the window direction that is most narrow.

        if(window.innerWidth >= window.innerHeight) {
            this.yStretch = true;
        } else {
            this.xStretch = true;
        }

    } else if(canvasSize === 'full') {
        // Fullscreen.

        this.xStretch = this.yStretch = true;
    }

    this.restart();
};