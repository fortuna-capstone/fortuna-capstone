import 'phaser';

export default class ChessPiece extends RexPlugins.Board.Shape {
  constructor(board, tileXY) {
    const scene = board.scene;
    super(board, tileXY.x, tileXY.y, 1, 0xffc0cb);
    scene.add.existing(this);
    this.setScale(0.5);

    console.log('PHASER RexPlugins OBJECT', RexPlugins.Board);

    // console.log('THIS', this);
    // scene.add.existing(this);
    // this.type = 'circle';
  }
  putPieceOnBoard(board, piece, x, y, z) {
    return board.addChess(piece, x, y, z);
  }
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
