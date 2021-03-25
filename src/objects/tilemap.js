import Tile from './Tiles';
import { collect, pay, payday, pickLifeTile, pickCareer } from './operations';

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
    new Tile(1, 'Part-Time Job! Collect $5,000 (Orange #1)', (scene, amount) =>
      collect(scene, (amount = 5000))
    ),
    new Tile(
      1,
      'Spilled coffee on keyboard. Pay $2,000 for a new laptop (Orange #2)',
      (scene, amount) => pay(scene, (amount = 2000))
    ),
    new Tile(1, 'Spring Break! Pay $500 (Orange #3)', (scene, amount) =>
      pay(scene, (amount = 2000))
    ),
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
    new Tile(1, 'Scholarship! Collect $20,000 (Orange #4)', (scene, amount) =>
      collect(scene, (amount = 20000))
    ),
    new Tile(' '),
    new Tile(0, 'Red Tile #2', pickCareer),
    new Tile(3, 'Green Tile #1', payday),
    new Tile(2, 'Life Tile #3', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Buy a new car! Pay $10,000 (Orange #5)', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
  ],
  [
    new Tile(2, 'Life Tile # 4', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Life Tile #5', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Stimulus! Collect $2,000 (Orange #6)', (scene, amount) =>
      collect(scene, (amount = 2000))
    ),
    new Tile(' '),
    new Tile(3, 'Green Tile #2', payday),
  ],
  [
    new Tile(0, 'Red Tile # 3', pickCareer),
    new Tile(1, 'Bootcamp Deposit! Pay $1,000 (Orange #7)', (scene, amount) =>
      pay(scene, (amount = 1000))
    ),
    new Tile(
      1,
      'Built a website for a local company! Collect $2,000 (Orange #8)',
      (scene, amount) => collect(scene, (amount = 2000))
    ),
    new Tile(' '),
    new Tile(
      1,
      'You get a bonus! Collect $10,000! (Orange #9)',
      (scene, amount) => collect(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile #6', pickLifeTile),
  ],
  [
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Rent is due! Pay $1000 (Orange #10)', (scene, amount) =>
      pay(scene, (amount = 1000))
    ),
    new Tile(
      1,
      'Sell old computer equipment. Collect $3,000 (Orange #11)',
      (scene, amount) => collect(scene, (amount = 3000))
    ),
    new Tile(2, 'Life Tile #7', pickLifeTile),
  ],
];

export default tilemap;
