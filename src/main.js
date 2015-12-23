/**
 * Created by Matt Guay on 12/8/15.
 */

// WebGL context.
var gl;

// Sketch Framework.
var framework;

/**
 * Use jQuery to set up the sketch once the DOM is loaded.
 */
$(document).ready(function() {
    // Create the Framework.
    framework = new Framework();
    // Initialize the Framework.
    framework.restart();
});

