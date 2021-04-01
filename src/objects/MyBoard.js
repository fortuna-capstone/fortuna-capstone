import tilemap from './tilemap';
// COLOR KEY:
// 0: red
// 1: orange
// 2: life
// 3: green

// const tiles = [
//   '111    ',
//   '2 2   0',
//   '1 032 1',
//   '2 2 1 3',
//   '011 1 2',
//   '    112',
//   '       ',
// ];
const tiles = tilemap;
const COLORMAP = [0xff0000, 0xffa500, 0xffc0cb, 0x00cc00];

export default class MyBoard extends RexPlugins.Board.Board {
  constructor(scene) {
    super(scene, {
      grid: {
        gridType: 'quadGrid',
        x: 80,
        y: 175,
        cellWidth: 60,
        cellHeight: 60,
        type: 'orthogonal',
      },
      width: 48,
      height: 7,
    });

    this.createTiles(tiles);
  }

  createTiles(tiles) {
    for (let tileY = 0; tileY < tiles.length; tileY++) {
      let line = tiles[tileY];
      for (let tileX = 0; tileX < line.length; tileX++) {
        let color = line[tileX].color;
        let tile = line[tileX];
        if (color === ' ') {
          continue;
        }
        let cost = 1;
        if (color === 0) {
          cost = 0;
        }
        let data = { cost: cost, description: tile.description };
        const tiles = this.scene.rexBoard.add
          .shape(this, tileX, tileY, 0, COLORMAP[color])
          .setStrokeStyle(1, 0xffffff, 1)
          .setData('cost', cost)
          .setData('description', tile.description)
          .setData('operation', tile.operation);
      }
    }
    return this;
  }
}
