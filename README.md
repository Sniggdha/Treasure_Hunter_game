# Treasure Hunter Game
This JavaScript program implements a simple game where the user controls a treasure hunter navigating through a grid, collecting treasures and avoiding obstacles.

## Overview
The game consists of three stages: setup, play, and end. During the setup stage, the user places treasures, obstacles, and the treasure hunter on the grid. In the play stage, the treasure hunter attempts to collect treasures by moving horizontally or vertically. The game ends when the user decides to end the play stage, no treasures are left, or the treasure hunter is unable to move.

## File Structure
- `index.html`: HTML file containing the game interface.
- `styles.css`: CSS file for styling the game interface.
- `treasures.js`: JavaScript file containing the game logic.
- `assets/`: Directory containing images used in the game.
  - `background.jpg`: Background image for the game grid.
  - `obstacle.png`: Image for obstacles on the grid.
  - `treasure.png`: Image for treasures on the grid.
  - `hunter.png`: Image for the treasure hunter character.

## Game Mechanics

Setup Stage
During the setup stage, the user can place objects on the grid:
Place treasures by typing a number between 5 and 8.
Place obstacles by typing the letter "o".
Place the treasure hunter by typing the letter "h".

Play Stage
During the play stage, the user controls the treasure hunter with the following keys:
"a" moves the treasure hunter one cell to the left.
"d" moves the treasure hunter one cell to the right.
"w" moves the treasure hunter one cell up.
"s" moves the treasure hunter one cell down.

End Stage
The game ends when one of the following conditions is met:
The user ends the play stage.
There are no treasures left on the grid.
The treasure hunter is unable to move.

## Additional Features

Dynamic Updates: The program updates the status information, including the number of rounds, remaining treasures, and user's score, during the play stage.
Performance Index: At the end stage, the program computes a performance index based on the user's score and the number of rounds completed.
Requirements

JavaScript environment (browser or Node.js).
Suitable data structures for efficient grid representation and management of objects.
Clear separation of view and model components for grid visualization and internal representation.

## Notes
Ensure appropriate error handling for invalid user inputs and game states.
Consider implementing adjustable grid dimensions for scalability.
