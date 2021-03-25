import Tile from './Tiles';
import { payday, pickLifeTile, pickCareer } from './operations';

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
    new Tile(1, 'Orange Tile # 1', payday),
    new Tile(1, 'Orange Tile #2', payday),
    new Tile(1, 'Orange Tile #3', payday),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
  ],
  [
    new Tile(2, 'Life Tile # 1', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Life Tile #2', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(0, 'Red Tile # 1', payday),
  ],
  [
    new Tile(1, 'Orange Tile # 4', payday),
    new Tile(' '),
    new Tile(0, 'Red Tile #2', pickCareer),
    new Tile(3, 'Green Tile #1', payday),
    new Tile(2, 'Life Tile #3', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Orange Tile #5', payday),
  ],
  [
    new Tile(2, 'Life Tile # 4', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Life Tile #5', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Orange Tile #6', payday),
    new Tile(' '),
    new Tile(3, 'Green Tile #2', payday),
  ],
  [
    new Tile(0, 'Red Tile # 3', pickCareer),
    new Tile(1, 'Orange Tile #7', payday),
    new Tile(1, 'Orange Tile #8', payday),
    new Tile(' '),
    new Tile(1, 'Orange Tile #9', payday),
    new Tile(' '),
    new Tile(2, 'Life Tile #6', pickLifeTile),
  ],
  [
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Orange Tile # 10', payday),
    new Tile(1, 'Orange Tile #11', payday),
    new Tile(2, 'Life Tile #7', pickLifeTile),
  ],
];

export default tilemap;
