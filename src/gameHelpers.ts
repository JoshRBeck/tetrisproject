import { STAGE_HEIGHT, STAGE_WIDTH } from "./setup";
import { TETROMINOS } from "./setup";
import { PLAYER } from "./hooks/usePlayer";
import { STAGE } from "./components/Stage/Stage";

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

export const randomTetromino = () => {
  const tetrominos = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as (keyof typeof TETROMINOS)[];
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const isColliding = (
  player: PLAYER,
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number, y: number } 
) => {
  // Using for loops to be able to return and break
  for (let y = 0; y < player.tetromino.length; y +=1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that are on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is within the game area height (Y) and not passing through the bottom
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is within the game width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that that the cell we are moving to isnt clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
  // /if everything above is falsae, then return false
  return false;
}