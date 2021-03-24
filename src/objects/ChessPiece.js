import 'phaser';

export default class ChessPiece extends RexPlugins.Board.Shape {
  constructor(board, tileXY) {
    const scene = board.scene;
    super(board, tileXY.x, tileXY.y, 1, 0x000000);
    scene.add.existing(this);
    this.setScale(0.5);
    this.start = 'bootcamp'
    this.monopoly = scene.rexBoard.add.monopoly(this, {
      face: this.start === 'bootcamp' ? 4 : 3, // determines starting face direction
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

  moveAlongPath(path) {
    // console.log('THIS CURRENT TILE', this.currentTile);
    if (!path.length) {
      return;
    } else {
      let tile = path.shift();
  
      this.scene.currentTile = tile
      this.moveTo.moveTo(tile);
      
      if (!tile.cost) {
          this.changeDirectionAtStop(tile)
        this.scene.currentTile = tile;
        return;
      }
       this.monopoly.setFace(this.moveTo.destinationDirection);
      this.moveTo.once(
        'complete',
        () => {
          this.moveAlongPath(path);
        },
        this
      );
    }
  
  }

  changeDirectionAtStop(tile) {
    //changes direction at first stop
    if (tile.x === 2 && tile.y === 2) {
      this.monopoly.setFace(4) 
    }
  }
}

// putPieceOnBoard(board, piece, x, y, z) {
//   return board.addChess(piece, x, y, z);
// }
