import 'phaser';
import { payday } from '../objects/operations';

export default class ChessPiece extends RexPlugins.Board.Shape {
  constructor(board, tileXY, camera) {
    const scene = board.scene;
    super(board, tileXY.x, tileXY.y, 1, 0x000000);
    scene.add.existing(this);
    this.setScale(0.5);
    this.monopoly = scene.rexBoard.add.monopoly(this, {
      face: 3,
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

  preload() {
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
    this.load.image('messageBox', 'assets/message_box.png');
  }

  moveAlongPath(path, scene) {
    if (!path.length) {
      this.changeDirectionAtStop(this.scene.currentTile);
      return;
    } else {
      let tile = path.shift();
      this.moveTo.moveTo(tile);
      if (path.length) {
        if ((tile.x === 5 && tile.y === 2) || (tile.x === 8 && tile.y === 3) || (tile.x === 10 && tile.y === 2) || (tile.x === 12 && tile.y === 5) || (tile.x === 13 && tile.y === 0) || (tile.x === 17 && tile.y === 5) || (tile.x === 19 && tile.y === 3) || (tile.x === 22 && tile.y === 3) || (tile.x === 24 && tile.y === 0) || (tile.x === 26 && tile.y === 4) || (tile.x === 30 && tile.y === 1) || (tile.x === 31 && tile.y === 3) || (tile.x === 35 && tile.y === 1) || (tile.x === 37 && tile.y === 4) || (tile.x === 39 && tile.y === 1) || (tile.x === 41 && tile.y === 4) || (tile.x === 43 && tile.y === 1) || (tile.x === 44 && tile.y === 5) || (tile.x === 46 && tile.y === 0)) {
          payday(scene);
        }
      }
      this.monopoly.setFace(this.moveTo.destinationDirection);
      this.moveTo.once(
        'complete',
        () => {
          if ((tile.x === 3 && tile.y === 2) || (tile.x === 20 && tile.y ==5) || (tile.x === 31 && tile.y === 3)) {
            this.monopoly.setFace(4);
            scene.scene.movePiece();
            return;
          }
          else if ((tile.x === 15 && tile.y === 3) || (tile.x === 28 && tile.y === 1)) {
            let face;
            const num = Phaser.Math.Between(1, 4);
            if (num > 2) face = 4;
            else face = 1
            this.monopoly.setFace(face)
            scene.scene.movePiece();
            return;
          } else {
            this.scene.currentTile = tile;
            this.moveAlongPath(path, scene);
          }
        },
        this
      );
    }
  }

  changeDirectionAtStop(tile) {
    //changes direction at first stop
    if (tile.x === 3 && tile.y === 2) {
      this.monopoly.setFace(4);
    }
  }
}
