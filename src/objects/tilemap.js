import Tile from './Tiles';
import {
  collect,
  pay,
  payday,
  pickLifeTile,
  pickCareer,
  retire,
  taxesDue,
} from './operations';

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
    new Tile(2, 'Study abroad.', pickLifeTile),
    new Tile(1, 'Spring break! Pay $5,000.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(2, "Dean's List.", pickLifeTile),
    new Tile(1, 'Your buddies crash your car. Pay $5,000.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $10,0000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Pay $10,000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(1, 'Pay $10,000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Life Tile w/ Two Desk Items', pickLifeTile),
    new Tile(1, 'Pay $20,000.', (scene, amount) =>
      pay(scene, (amount = 20000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Life Tile', pickLifeTile),
    new Tile(1, 'Pay $20,000', (scene, amount) => pay(scene, (amount = 20000))),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Pay $90,000.', (scene, amount) =>
      pay(scene, (amount = 90000))
    ),
    new Tile(' '),
    new Tile(1, 'Pay $35,000.', (scene, amount) =>
      pay(scene, (amount = 35000))
    ),
    new Tile(1, 'Midlife crisis. Start a new career.', pickCareer),
    new Tile(1, 'ORANGE - Spin again if not in the lead.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(1, 'Pay $125,000', (scene, amount) =>
      pay(scene, (amount = 125000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Trade Salary with another player.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Pay $35,000.', (scene, amount) =>
      pay(scene, (amount = 35000))
    ),
    new Tile(1, 'Pay $45,000.', (scene, amount) =>
      pay(scene, (amount = 45000))
    ),
  ],
  [
    new Tile(1, 'ORANGE - Study for exams. Miss next turn.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(0, 'GET MARRIED or something', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $10,000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(1, 'Collect $10,000.', (scene, amount) =>
      collect(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile w/ Desk Item', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $20,000.', (scene, amount) =>
      pay(scene, (amount = 20000))
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'ORANGE - Pay $5,000 per desk item.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(1, 'Collect $80,0000.', (scene, amount) =>
      collect(scene, (amount = 80000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Collect $80,000.', (scene, amount) =>
      collect(scene, (amount = 80000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE - Pay $5,000 per desk item.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'Pay $30,000.', (scene, amount) =>
      pay(scene, (amount = 30000))
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(
      1,
      'ORANGE - Pension. Collect 20,000 times your spin?',
      (scene, amount) => collect(scene, (amount = 20000))
    ),
  ],
  [
    new Tile(1, 'Part-time job. Collect $5,000.', (scene, amount) =>
      collect(scene, (amount = 5000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Graduation Day!', pickLifeTile),
    new Tile(0, 'Choose a career.', pickCareer),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Birthday Party!', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Pay $20,000.', (scene, amount) =>
      pay(scene, (amount = 20000))
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile w/ Desk Item', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Pay $5,000.', (scene, amount) => pay(scene, (amount = 5000))),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(' '),
    new Tile(1, 'Collect $10,000.', (scene, amount) =>
      collect(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(0, 'You may sell your house and buy a new one!', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(1, 'Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(' '),
    new Tile(' '),

    new Tile(1, 'Taxes due.', taxesDue),

    new Tile(' '),
    new Tile(1, 'Collect $95,000.', (scene, amount) =>
      collect(scene, (amount = 95000))
    ),
    new Tile(' '),
    new Tile(1, 'Pay $50,000.', (scene, amount) =>
      pay(scene, (amount = 50000))
    ),
    new Tile(' '),
    new Tile(1, 'Taxes due.', taxesDue),
    new Tile(' '),
    new Tile(1, 'Pay $100,000', (scene, amount) =>
      pay(scene, (amount = 100000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Pay $45,000.', (scene, amount) =>
      pay(scene, (amount = 45000))
    ),
    new Tile(' '),
    new Tile(0, 'Retire!', retire),
  ],
  [
    new Tile(2, 'Make new friends.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE - Lose turn?', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),

    new Tile(1, 'Taxes due.', taxesDue),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $5,000.', (scene, amount) => pay(scene, (amount = 5000))),
    new Tile(' '),
    new Tile(1, 'Pay $40,000.', (scene, amount) =>
      pay(scene, (amount = 40000))
    ),
    new Tile(1, 'ORANGE - Pay $5,000 per desk item?', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(1, 'ORANGE - Trade salary with another player.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(2, 'Life Tile w/ Desk Item', pickLifeTile),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Life Tile w/ Desk Item', pickLifeTile),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'ORANGE - Spin again if not in the lead.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE - Spin again if not in the lead?', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Collect $100,000.', (scene, amount) =>
      collect(scene, (amount = 100000))
    ),
    new Tile(' '),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE - Trade salary with any player.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(1, 'Taxes due.', taxesDue),
    new Tile(' '),
    new Tile(1, 'ORANGE - spin again if not in the lead?', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
  ],
  [
    new Tile(1, 'Buy books and supplies. Pay $5,000.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Birthday party!.', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Collect $50,000.', (scene, amount) =>
      collect(scene, (amount = 50000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Life Tile w/ Desk item', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Pay $5,000.', (scene, amount) => pay(scene, (amount = 5000))),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile w/ Desk Item', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'ORANGE - Trade salary with any player?', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'Pay $35,000.', (scene, amount) =>
      pay(scene, (amount = 35000))
    ),
    new Tile(1, 'ORANGE - Trade salary with any player', () =>
      console.log('Some function goes here.')
    ),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(1, 'Tax refund. Collect $75,000.', (scene, amount) =>
      collect(scene, (amount = 75000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE - Trade salary with any player', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'Pay $65,000.', (scene, amount) =>
      pay(scene, (amount = 65000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE - Spin again if not in the lead?', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(' '),
  ],
  [
    new Tile(1, 'Scholarship! Collect $20,000.', (scene, amount) =>
      collect(scene, (amount = 20000))
    ),
    new Tile(0, 'Start here.'),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(2, 'Make new friends.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $5,000.', (scene, amount) => pay(scene, (amount = 5000))),
    new Tile(1, 'Sell your app. Collect $10,000.', (scene, amount) =>
      collect(scene, (amount = 10000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(0, 'You may buy a house!', () =>
      console.log('Some function goes here.')
    ),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Lose your job. Start a new career.', pickCareer),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(1, 'ORANGE - Trade salary with any player.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Taxes due.', taxesDue),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $30,000.', (scene, amount) =>
      pay(scene, (amount = 30000))
    ),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(1, 'Pay $125,000', (scene, amount) =>
      pay(scene, (amount = 125000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(1, 'Pay $100,000', (scene, amount) =>
      pay(scene, (amount = 100000))
    ),
    new Tile(1, 'ORANGE - Pay $50,000 per desk item?', (scene, amount) =>
      pay(scene, (amount = 50000))
    ),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
  ],
];

export default tilemap;
