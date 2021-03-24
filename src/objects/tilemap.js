import Tile from './Tiles';
import { test } from './operations';

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

const tilemap = [
  [
    new Tile(1, 'Orange Tile # 1', test),
    new Tile(1, 'Orange Tile #2', test),
    new Tile(1, 'Orange Tile #3', test),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
  ],
  [
    new Tile(2, 'Life Tile # 1', test),
    new Tile(' '),
    new Tile(2, 'Life Tile #2', test),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(0, 'Red Tile # 1', test),
  ],
  [
    new Tile(1, 'Orange Tile # 4', test),
    new Tile(' '),
    new Tile(0, 'Red Tile #2', test),
    new Tile(3, 'Green Tile #1', test),
    new Tile(2, 'Life Tile #3', test),
    new Tile(' '),
    new Tile(1, 'Orange Tile #5', test),
  ],
  [
    new Tile(2, 'Life Tile # 4', test),
    new Tile(' '),
    new Tile(2, 'Life Tile #5', test),
    new Tile(' '),
    new Tile(1, 'Orange Tile #6', test),
    new Tile(' '),
    new Tile(3, 'Green Tile #2', test),
  ],
  [
    new Tile(0, 'Red Tile # 3', test),
    new Tile(1, 'Orange Tile #7', test),
    new Tile(1, 'Orange Tile #8', test),
    new Tile(' '),
    new Tile(1, 'Orange Tile #9', test),
    new Tile(' '),
    new Tile(2, 'Life Tile #6', test),
  ],
  [
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Orange Tile # 10', test),
    new Tile(1, 'Orange Tile #11', test),
    new Tile(2, 'Life Tile #7', test),
  ],
];

console.log('TILEMAP', tilemap);

export default tilemap;
