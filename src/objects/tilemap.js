import Tile from './Tiles';
import {
  collect,
  deskItem,
  pay,
  payday,
  pickCareer,
  pickHouse,
  pickLifeTile,
  retire,
  skipTurn,
  taxesDue,
  tradeSalary
} from './operations';

// COLOR KEY:
// 0: red
// 1: orange
// 2: life
// 3: green

const tilemap = [
  [
    new Tile(2, 'Study abroad.', pickLifeTile),
    new Tile(1, 'Spring break! Pay $5,000.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(2, "Dean's List.", pickLifeTile),
    new Tile(1, 'Your AI caused a ruckus. Pay $5,000.', (scene, amount) =>
      pay(scene, (amount = 5000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Get a new car. Pay $10,0000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(2, 'Learn a new language!', pickLifeTile),
    new Tile(1, 'Buy new office furniture. Pay $10,000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(1, 'Upgrade home office. Pay $10,000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Got a new mouse!', (scene, item) => deskItem(scene, item = "mouse")),
    new Tile(1, 'Your program breached National Security. Pay $20,000.', (scene, amount) =>
      pay(scene, (amount = 20000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Hire a part-time assistant. Pay $20,000', (scene, amount) => pay(scene, (amount = 20000))),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Spend a year working abroad.', pickLifeTile),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Buy a luxury car. Pay $90,000.', (scene, amount) =>
      pay(scene, (amount = 90000))
    ),
    new Tile(' '),
    new Tile(1, 'Buy a robot. Pay $35,000.', (scene, amount) =>
      pay(scene, (amount = 35000))
    ),
    new Tile(1, 'Midlife crisis. Start a new career.', pickCareer),
    new Tile(1, 'ORANGE - Spin again if not in the lead.', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(1, 'Buy a vacation home. Pay $125,000', (scene, amount) =>
      pay(scene, (amount = 125000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Trade salary with another player.', tradeSalary),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Pay $35,000.', (scene, amount) =>
      pay(scene, (amount = 35000))
    ),
    new Tile(1, 'Buy a Space X ticket to go to space. Pay $45,000.', (scene, amount) =>
      pay(scene, (amount = 45000))
    ),
  ],
  [
    new Tile(1, 'Study for exams. Miss next turn.', skipTurn),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE', () => console.log('Some function goes here.')),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(0, 'Bought your own office space!', tradeSalary),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Attend a high-tech seminar. Pay $10,000.', (scene, amount) =>
      pay(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(1, 'Win a hackathon! Collect $10,000.', (scene, amount) =>
      collect(scene, (amount = 10000))
    ),
    new Tile(' '),
    new Tile(2, 'Got a rubber duck!', (scene, item) => deskItem(scene, item = "rubber duck")),
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
    new Tile(1, 'ORANGE - Pay $5,000 per desk item.', console.log('Some function goes here')),
    new Tile(1, 'Collect $80,0000.', (scene, amount) =>
      collect(scene, (amount = 80000))
    ),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(1, 'Remodel kitchen. Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Invest in Bitcoin. Collect $80,000.', (scene, amount) =>
      collect(scene, (amount = 80000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE - Pay $5,000 per desk item.', console.log('some function goes here')),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'Buy a luxury cruise online. Pay $30,000.', (scene, amount) =>
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
    new Tile(1, 'ORANGE', () => console.log('some function goes here')),
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
    new Tile(2, 'Join Fiverr.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Pay $15,000.', (scene, amount) =>
      pay(scene, (amount = 15000))
    ),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Night school. Pay $20,000.', (scene, amount) =>
      pay(scene, (amount = 20000))
    ),
    new Tile(' '),
    new Tile(2, 'Got a new monitor!', (scene, item) => deskItem(scene, item = "monitor")),
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
    new Tile(1, 'Write a programming textbook. Collect $95,000.', (scene, amount) =>
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
    new Tile(2, 'Create a popular meme.', pickLifeTile),
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
    new Tile(1, 'Lost! Miss next turn.', skipTurn),
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
    new Tile(1, 'ORANGE - Pay $5,000 per desk item?', console.log('Some function goes here')),
    new Tile(1, 'ORANGE - Trade salary with another player.', tradeSalary),
    new Tile(2, 'Got a second monitor!', (scene, item) => deskItem(scene, item = "second monitor")),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Got a new chair!', (scene, item) => deskItem(scene, item = "desk chair")),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'ORANGE', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(2, 'Become a plant parent.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(2, 'Teach an intro coding course at the local college.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Speak at a high-tech conference. Collect $100,000.', (scene, amount) =>
      collect(scene, (amount = 100000))
    ),
    new Tile(' '),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE - Trade salary with any player.', tradeSalary),
    new Tile(' '),
    new Tile(1, 'Taxes due.', taxesDue),
    new Tile(' '),
    new Tile(1, 'ORANGE', () =>
      console.log('Some function goes here.')
    ),
    new Tile(' '),
    new Tile(2, 'Donate old computer.', pickLifeTile),
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
    new Tile(2, 'Get first tech hoodie.', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Create software blog.', pickLifeTile),
    new Tile(' '),
    new Tile(1, 'Get funding for a startup. Collect $50,000.', (scene, amount) =>
      collect(scene, (amount = 50000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(2, 'Got a new keyboard!', (scene, item) => deskItem(scene, item = "keyboard")),
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
    new Tile(2, 'Got a plant!', (scene, item) => deskItem(scene, item = "plant")),
    new Tile(' '),
    new Tile(1, 'ORANGE - Trade salary with any player?', tradeSalary),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'Pay $35,000.', (scene, amount) =>
      pay(scene, (amount = 35000))
    ),
    new Tile(1, 'ORANGE - Trade salary with any player', tradeSalary),
    new Tile(1, 'Pay $25,000.', (scene, amount) =>
      pay(scene, (amount = 25000))
    ),
    new Tile(1, 'Tax refund. Collect $75,000.', (scene, amount) =>
      collect(scene, (amount = 75000))
    ),
    new Tile(' '),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'ORANGE - Trade salary with any player', tradeSalary),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(2, 'Mentor a new developer.', pickLifeTile),
    new Tile(' '),
    new Tile(3, 'Payday!', payday),
    new Tile(' '),
    new Tile(1, 'Pay $65,000.', (scene, amount) =>
      pay(scene, (amount = 65000))
    ),
    new Tile(' '),
    new Tile(1, 'ORANGE', () =>
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
    new Tile(1, 'Rent apartment. Pay $5,000.', (scene, amount) => pay(scene, (amount = 5000))),
    new Tile(2, 'Make new friends.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
    new Tile(1, 'Pay $5,000.', (scene, amount) => pay(scene, (amount = 5000))),
    new Tile(1, 'Sell your app. Collect $10,000.', (scene, amount) =>
      collect(scene, (amount = 10000))
    ),
    new Tile(2, 'You develop a new technology that creates space travel.', pickLifeTile),
    new Tile(' '),
    new Tile(2, 'Found the next social media platform.', pickLifeTile),
    new Tile(0, 'Buy a house!', pickHouse),
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
    new Tile(1, 'ORANGE - Trade salary with any player.', tradeSalary),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(2, 'Program a hydroponics for a community garden.', pickLifeTile),
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
    new Tile(1, 'ORANGE - Pay $50,000 per desk item?', console.log('some function goes here')),
    new Tile(' '),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(3, 'Payday!', payday),
    new Tile(2, 'Life Tile.', pickLifeTile),
    new Tile(' '),
    new Tile(' '),
  ],
];

export default tilemap;
