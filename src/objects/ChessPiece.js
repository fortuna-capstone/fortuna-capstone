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
    // console.log('THIS CURRENT TILE', this.currentTile);
    if (!path.length) {
      return;
    } else {
      let tile = path.shift();
  
      this.scene.currentTile = tile
      this.moveTo.moveTo(tile);
      
      if (!tile.cost) {
        console.log('TILE IN NO COST', tile);
        this.scene.currentTile = tile;
        return;
      }
      this.moveTo.once(
        'complete',
        () => {
          this.moveAlongPath(path);
        },
        this
      );
    }
  }
  // putPieceOnBoard(board, piece, x, y, z) {
  //   return board.addChess(piece, x, y, z);
  // }
}
