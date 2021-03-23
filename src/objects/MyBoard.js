// COLOR KEY:
// 0: red
// 1: orange
// 2: life
// 3: green

const tiles = [
  '111    ',
  '2 2   0',
  '1 032 1',
  '2 2 1 3',
  '011 1 2',
  '    112',
  '       ',
];
const COLORMAP = [0xff0000, 0xffa500, 0xffc0cb, 0x00cc00];

export default class MyBoard extends RexPlugins.Board.Board {
  constructor(scene) {
    super(scene, {
      grid: {
        gridType: 'quadGrid',
        x: 130,
        y: 30,
        cellWidth: 60,
        cellHeight: 60,
        type: 'orthogonal',
      },
      width: 7,
      height: 7,
    });

    this.createTiles(tiles);
  }

  createTiles(tiles) {
    for (let tileX = 0; tileX < tiles.length; tileX++) {
      let line = tiles[tileX];
      for (let tileY = 0; tileY < line.length; tileY++) {
        let symbol = line[tileY];
        if (symbol === ' ') {
          continue;
        }
        let cost = 1;
        if (symbol === '0') {
          cost = 0;
        }
        this.scene.rexBoard.add
          .shape(this, tileY, tileX, 0, COLORMAP[symbol])
          .setStrokeStyle(1, 0xffffff, 1)
          .setData('cost', cost);
      }
    }
    return this;
  }
}
