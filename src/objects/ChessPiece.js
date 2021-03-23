import 'phaser';

export default class ChessPiece extends RexPlugins.Board.Shape {
  constructor(board, tileXY) {
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

  moveAlongPath(path) {
    if (!path.length) {
      return;
    }
    let tile = path.shift();
    this.moveTo.moveTo(tile);
    if (!tile.cost) {
      return;
    }
    this.moveTo.once('complete', () => { 
      this.moveAlongPath(path);
    }, this);
    return this;
  }
  // putPieceOnBoard(board, piece, x, y, z) {
  //   return board.addChess(piece, x, y, z);
  // }
}

// import 'phaser';
// export default class ChessPiece extends Phaser.GameObjects {
//   constructor(board, tileXY) {
//     const scene = board.scene;
//     super();
//     console.log('THIS IN CHESSPIECE', this);
//   }
// }

// let gameObj = this.add.circle(0, 0, 10, 0x000000);
//   board.addChess(gameObj, 0, 4, 2);
