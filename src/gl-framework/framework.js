/**
 * Created by mattguay on 12/22/15.
 */

/**
 * This sketch uses a custom WebGL framework to handle rendering to canvas and user i/o.
 * @constructor
 */
function Framework() {
    // Tracks whether the Framework has been initialized.
    this.initialized = false;

    /** App attributes **/
    // Handle to the App.
    this.app = null;

    // App start time.
    this.time0 = null;

    // Previous frame's time.
    this.timeLast = null;

    // Current frame's time.
    this.timeNow = null;

    // Time elapsed since the previous frame.
    this.timeElapsedFrame = null;

    // Time elapsed since the App's start.
    this.timeElapsedTotal = null;

    // Framerate estimate.
    this.fps = 0;

    // Filter used to smooth the FPS estimate in time.
    this.fpsFilter = 30;

    /** Canvas attributes **/
    // Handle to the canvas.
    this.canvas = null;

    // Size of the logical canvas as a fraction of the displayed canvas size.
    this.canvasScale = 0.6;

    // True if canvas is run in a smaller window on the screen, false if canvas covers the entire browser.
    this.windowed = false;

    // If true, stretch the canvas to fill the browser in the x direction.
    this.xStretch = true;

    // If true, stretch the canvas to fill the browser in the y direction.
    this.yStretch = true;

    // Clip space transform offset vector.
    this.clipOffset = vec2.fromValues(1, 1);

    // Aspect ratio transformation matrix.
    this.clipMat = mat2.create();

    // Canvas size (in pixels).
    this.xCanvas = null;
    this.yCanvas = null;

    /** I/O attributes **/
    // Tracks which keys are pressed.
    this.keys = [];

    // Some keys should have effects triggered only on onset and offset: 'togglables'. Track their state in the
    // togglable array.
    this.togglables = [];
    // Interacting with toggables requires that key states be initialized to true.
    this.numTogglables = 256;
    while(this.numTogglables--) {this.togglables.push(true);}

    /** WebGL attributes **/
    // List of the ShaderPrograms used.
    this.shaderPrograms = {};

    // Contains all the data needed to create all the ShaderPrograms.
    this.shaderProgramData = {};

    // ID's of the ShaderPrograms.
    this.shaderProgramID = [];

    // AttributeArrays containing (some, commonly used) shader vertex attributes.
    this.attributes = {};

    // Shader uniform variables.
    this.uniforms = {};

    // Texture size for FloatBuffers/PongBuffers spanning the canvas.
    this.xTexture = null;
    this.yTexture = null;

    // If true, the WebGL OES_texture_float extension was available. False otherwise. Controls how data is represented
    // in textures.
    this.floatTextures = false;

    // List of FloatBuffers used in this sketch.
    this.floatBuffers = {};

    // List of PongBuffers used in this sketch.
    this.pongBuffers = {};
}

/**
 * Update the variables that track the time since the sketch was last restarted.
 */
Framework.prototype.updateTime = function() {
    this.timeLast = this.timeNow;
    this.timeNow = new Date().getTime();
    this.timeElapsedFrame = this.timeNow - this.timeLast;
    this.timeElapsedTotal = this.timeNow - this.time0;
};

/**
 * Update the sketch's FPS estimate.
 */
Framework.prototype.updateFPS = function() {
    if(this.timeElapsedFrame > 0) {
        this.fps += (1000. / this.timeElapsedFrame - this.fps) / this.fpsFilter;
    }
};

/**
 * Write the current FPS estimate to the appropriate DOM element.
 */
Framework.prototype.writeFPS = function() {
    $('#fpscounter').html(framework.fps.toFixed(1) + " fps");
};