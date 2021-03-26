import 'phaser';
import { payday } from '../objects/operations';

export default class ChessPiece extends RexPlugins.Board.Shape {
  constructor(board, tileXY) {
    const scene = board.scene;
    super(board, tileXY.x, tileXY.y, 1, 0x000000);
    scene.add.existing(this);
    this.setScale(0.5);
    this.monopoly = scene.rexBoard.add.monopoly(this, {
      face: 3, // determines starting face direction
      pathTileZ: 0,
      costCallback: function (curTileXY, preTileXY, monopoly) {
        const board = monopoly.board;
        return board
          .tileXYZToChess(curTileXY.x, curTileXY.y, 0)
          .getData('cost');
      },
    });

    this.moveTo = scene.rexBoard.add.moveTo(this);
  }

  moveAlongPath(path, scene) {
    if (!path.length) {
      this.changeDirectionAtStop(this.scene.currentTile);
      return;
    } else {
      let tile = path.shift();
      this.moveTo.moveTo(tile);
      if (path.length) {
        if ((tile.x === 3 && tile.y === 2) || (tile.x === 6 && tile.y === 3)) {
          payday(scene);
        }
      }
      this.monopoly.setFace(this.moveTo.destinationDirection);
      this.moveTo.once(
        'complete',
        () => {
          this.scene.currentTile = tile;
          this.moveAlongPath(path, scene);
        },
        this
      );
    }
  }

  changeDirectionAtStop(tile) {
    //changes direction at first stop
    if (tile.x === 2 && tile.y === 2) {
      this.monopoly.setFace(4);
    }
  }
}
