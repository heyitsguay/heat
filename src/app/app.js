/**
 * Created by mattguay on 12/23/15.
 */

/**
 * Main class for the application that this sketch runs.
 * @constructor
 */
function App() {
    // Tracks whether the App has been initialized.
    //this.initialized = false;

    // The current World.
    this.world = null;

    // Time increment used for eaach frame's update.
    this.dt = 0.1;

    // App only runs when this is true.
    this.keepRunning = false;
}

App.prototype.restart = function() {
    // Load and setup a (currently just the one single) World.
    this.loadWorld();

    // App should run now.
    this.keepRunning = false;

    // Main function called every frame.
    this.tick();
};