import 'phaser';

export default class Board extends RexPlugins.Board.Board {
  constructor(scene) {
    super(scene, {
      grid: {
        gridType: 'quadGrid',
        x: 0,
        y: 0,
        cellWidth: 0,
        cellHeight: 0,
        type: 'orthogonal', // 'orthogonal'|'isometric'
      },
      width: 0,
      height: 0,
    });
  }
}
