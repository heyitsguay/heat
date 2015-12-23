/**
 * Created by mattguay on 12/20/15.
 */

// Tracks which keys are pressed.
var keys = {};

// Used to track the state of keys which should only perform an action when the keypress state changes.
var togglables = [];
var togglables_size = 256;
// Initialize togglables to true.
while(togglables_size--){togglables.push(true);}

/**
 * Handles keydown events.
 * @param {KeyboardEvent} e
 */
function handle_keydown(e) {
    keys[e.keyCode] = true;
}

/**
 * Handles keyup events.
 * @param {KeyboardEvent} e
 */
function handle_keyup(e) {
    keys[e.keyCode] = false;
    togglables[e.keyCode] = true;
}

/**
 * Handles all actions to be taken due to keyboard state.
 */
function handle_keys() {

}

/**
 * Handles mouse clicks on the canvas.
 * @param {MouseEvent} e
 */
function handle_click(e) {

}