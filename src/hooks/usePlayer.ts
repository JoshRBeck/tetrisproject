import React from "react";
import { STAGE_WIDTH } from "../setup";
import { isColliding, randomTetromino } from "../gameHelpers"
import { STAGE } from "../components/Stage/Stage";

export type PLAYER = {
  pos: {
    x: number;
    y: number;
  }
  tetromino: (string | number)[][];
  collided: boolean;
};

export const usePlayer = () => {
  const [player, setPlayer ] = React.useState({} as PLAYER);

  const rotate = (matrix: PLAYER['tetromino']) => {
    // Make the Rows to become Columns (Transpose)
    const mtrx = matrix.map((_, i) => matrix.map(column => column[i]));
    // Reverse Each row to get a rotated matrix
    return mtrx.map(row => row.reverse());
  }

  const playerRotate = (stage: STAGE): void => {
    // This line clones the player object to create a seperate copy. This is done to avoid directly
    // modifying the original 'Player' object. 
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

    // This one is so the player cannot rotate into the wall or other tetrominos
    const posX = clonedPlayer.pos.x;
    let offset = 1;
    while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.pos.x = posX;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }: { x:number, y: number, collided: boolean }): void => {
    setPlayer(prev => ({
      ...prev,
      post: { x: prev.pos.x += x, y: prev.pos.y += y },
      collided
    }));
  };

  const resetPlayer = React.useCallback(
    (): void => 
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 -2, y: 0 },
      tetromino: randomTetromino().shape,
    collided:false
      }),
      []
  );

  return { player, updatePlayerPos, resetPlayer, playerRotate };
}