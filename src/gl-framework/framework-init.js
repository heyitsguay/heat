/**
 * Created by mattguay on 12/23/15.
 */

/**
 * Runs each time the program is restarted.
 */
Framework.prototype.restart = function() {
    // The first time the Framework is restarted, a few extra initialization things must be taken care of.
    if(!this.initialized) {
        // Get a handle to the canvas.
        this.canvas = $('#canvas');

        // Set I/O handle functions.
        $(document).keydown(this.handleKeyDown); // key down
        $(document).keyup(this.handleKeyUp); // key up
        $(window).resize(this.restart); // window resize
        this.canvas.click(this.handleClick); // canvas mouse click
        $('#settings').change(this.handleQualityChange);

        // Set FPS write update interval
        setInterval(this.writeFPS, 500);
    }

    // Set up the canvas.
    this.resizeCanvas();

    // Initialize the necessary WebGL elements.
    this.initGL();

    // Initialize the App.
    this.initApp();

    // Initialize the tracking of time elapsed since the Framework's last restart.
    this.initTime();

    // Finish initialization.
    if(!this.initialized) {
        // Framework is now initialized.
        this.initialized = true;

        // Primary function called every frame.
        this.tick();
    }
};

/**
 * Sets the canvas size and updates the Framework's width and height variables.
 */
Framework.prototype.resizeCanvas = function() {
    // Canvas corner positions in the window.
    var cleft, ctop, cwidth, cheight;
    // Strings of those corner positions, for tossing into CSS.
    var $cleft, $ctop, $cwidth, $cheight;

    // Size of the usable window.
    cwidth = window.innerWidth;
    cheight = window.innerHeight;

    // Fullscreen.
    if(this.xStretch && this.yStretch) {
        // Window dimensions.
        this.xCanvas = Math.ceil(this.canvasScale * cwidth);
        this.yCanvas = Math.ceil(this.canvasScale * cheight);

        // (x,y) coordinates of canvas top-left corner.
        cleft = 0;
        ctop = 0;

        // Half-screen, stretched in y direction.
    } else if(this.yStretch) {
        this.xCanvas = this.yCanvas = Math.ceil(this.canvasScale * cheight);

        cleft = Math.floor((cwidth - cheight) / 2);
        ctop = 0;
        cwidth = cheight;

        // Half-screen, stretched in x direction.
    } else if(this.xStretch) {
        this.xCanvas = this.yCanvas = Math.ceil(this.canvasScale * cwidth);

        cleft = 0;
        ctop = Math.floor((cheight - cwidth) / 2);
        cheight = cwidth;

        // Windowed.
    } else {
        this.xCanvas = this.yCanvas = Math.ceil(this.canvasScale * Math.min(cwidth, cheight));

        cleft = Math.floor((cwidth - this.xCanvas) / 2);
        ctop = Math.floor((cheight - this.yCanvas) / 2);
        cwidth = this.xCanvas;
        cheight = this.yCanvas;
    }

    this.canvas.width(this.xCanvas);
    this.canvas.height(this.yCanvas);

    // Convert values to strings, add 'px' as needed.
    $cleft = cleft.toString() + 'px';
    $ctop = ctop.toString() + 'px';
    $cwidth = cwidth.toString() + 'px';
    $cheight = cheight.toString() + 'px';

    // Set up canvas CSS.
    this.canvas.css({'left': $cleft, 'top': $ctop, 'width': $cwidth, 'height': $cheight});

    // Delay setting until now to avoid a spurious border before startup.
    this.canvas.css({'border': '1px solid #222222'});

    // Set up aspect ratio transform.
    this.clipMat[0] = 2 / this.xCanvas;
    this.clipMat[3] = 2 / this.yCanvas;

    // Texture size for FloatBuffers/PongBuffers covering the canvas.
    this.xTexture = npot(this.xCanvas);
    //noinspection JSSuspiciousNameCombination
    this.yTexture = npot(this.yCanvas);
};

/**
 * Initializes the tracking of time elapsed since the Framework's last restart.

 */
Framework.prototype.initTime = function() {
    // Time when this function is called.
    this.time0 = new Date().getTime();
    // Time at previous frame.
    this.timeLast = this.time0;
    // Time at current frame.
    this.timeNow = this.time0;
    // Time between now and the last time initTime() was called.
    this.timeElapsedTotal = 0;
    // Time elapsed between this frame and the previous frame.
    this.timeElapsedFrame = 0;
};

/**
 * Controls initialization of the WebGL context.
 */
Framework.prototype.initGL = function() {
    // Get WebGL context for the canvas.
    gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
    // Uncomment and use this command to get a debug WebGL context.
    //gl = WebGLDebugUtils.makeDebugContext(gl);

    // Get the WebGL extension allowing for float textures.
    var ext = gl.getExtension('OES_texture_float');

    // Record whether the float texture extension is available.
    this.floatTextures = (ext != null)

    // Disable depth testing.
    gl.disable(gl.DEPTH_TEST);

    // Enable alpha blending.
    gl.enable(gl.BLEND);
    // Set blend function.
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};

/**
 * Initializes the App this sketch runs.
 */
Framework.prototype.initApp = function() {
    // Create the App if this is the first time initApp is called.
    if(!this.initialized) {
        this.app = new App();
    }

    // Call App setup.
    this.app.restart();
};