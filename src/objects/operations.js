// Connecting to Firebase
import db from '../config/firebaseConfig';

// Pulling Life Tile Data from Firebase
let lifeTiles = {};
const tilesRef = db.ref().child('Tiles');
tilesRef.on('value', (snap) => {
  lifeTiles = snap.val();
});

// Pick Lifetile function
export function pickLifeTile(scene) {
  let tileKeys = scene.scene.dataArrays.tileArray;
  let randomNum = Math.floor(Math.random() * Math.floor(tileKeys.length));
  let chosenTile = lifeTiles[tileKeys[randomNum]];
  scene.scene.player.lifeTiles.push(chosenTile);
  tileKeys.splice(randomNum, 1);
}

// Payday function
export function payday(scene) {
  scene.scene.player.bankAccount +=
    parseInt(scene.scene.player.salary.amount) * 1000;
}

// Taxes function
export function taxesDue(scene) {
  scene.scene.player.bankAccount -=
    parseInt(scene.scene.player.salary.taxes) * 1000;
}

// Skip Turn function
export function skipTurn(scene) {
  scene.scene.player.skip = true;
}

// Desk Item function
export function deskItem(scene, item) {
  pickLifeTile(scene);
  scene.scene.player.deskItems.push(item);
}

// Pulling House Data from firebase
let houses = {};
const housesRef = db.ref().child('Houses');
housesRef.on('value', (snap) => {
  houses = snap.val();
});

// Pick House function
export function pickHouse(scene, selectedHouse) {
  scene.scene.player.house = houses[selectedHouse];
  scene.scene.player.bankAccount -=
    parseInt(scene.scene.player.house.cost) * 1000;
  const houseArray = scene.scene.dataArrays.houseArray;
  const index = houseArray.indexOf(selectedHouse);
  houseArray.splice(index, 1);
}

// Pulling Career Data from firebase
let careers = {};
const careersRef = db
  .ref()
  .child('Career')
  .orderByChild('taken')
  .equalTo(false);
careersRef.on('value', (snap) => {
  careers = snap.val();
});

// Pick Career function
export function pickCareer(scene) {
  const options = scene.scene.dataArrays.careerArray;
  let randomNum = Math.floor(Math.random() * Math.floor(options.length));
  const chosen = careers[options[randomNum]];
  scene.scene.player.career = chosen;
  options.splice(randomNum, 1);
  pickSalary(scene);
}

// Pulling Salary Data from Firebase
let salaries = {};
const salariesRef = db.ref().child('Salaries');
salariesRef.on('value', (snap) => {
  salaries = snap.val();
});

// Pick Salary function
function pickSalary(scene) {
  let salaryKeys = scene.scene.dataArrays.salaryArray;
  let randomNum = Math.floor(Math.random() * Math.floor(salaryKeys.length));
  let chosenSalary = salaries[salaryKeys[randomNum]];
  scene.scene.player.salary = chosenSalary;
  salaryKeys.splice(randomNum, 1);
}

// Trade Salary function
export function tradeSalary(scene, otherPlayerTurn) {
  let switchPlayer = scene.scene.otherPlayers.getChildren().filter(player => {
    return player.playerInfo.turn === otherPlayerTurn
  });
  let switchKey = switchPlayer[0].playerInfo.salary;
  let salaryKey = scene.scene.player.salary;

  scene.scene.player.salary = switchKey;
  switchPlayer[0].playerInfo.salary = salaryKey;

  let playerInfo = switchPlayer[0].playerInfo;
  scene.scene.socket.emit('switchStarted', playerInfo)
}

// Pay function
export function pay(scene, amount) {
  scene.scene.player.bankAccount -= amount;
}

// Collect function
export function collect(scene, amount) {
  scene.scene.player.bankAccount += amount;
}

// Retire Function
export function retire(scene) {
  const { bankAccount, house, lifeTiles } = scene.scene.player;
  console.log('LIFE TILES', lifeTiles[0].value);
  const lifeTilesTotal = lifeTiles.reduce((acc, val) => {
    return acc + parseInt(val.value) * 1000;
  }, 0);
  let housePrice = 0;
  if (house.cost) {
    housePrice = house.cost;
  }
  scene.scene.player.retirement = housePrice + bankAccount + lifeTilesTotal;
  scene.scene.player.retired = true;
  scene.scene.player.skip = true;
}

// Calculate winner function
export function calculateWinner(scene) {
  console.log('SCENE', scene.scene.player.turn);
  let playersObj = {};
  let currentPlayer = String(scene.scene.player.turn);
  let currentPlayerTotal = scene.scene.player.retirement;
  playersObj[currentPlayer] = currentPlayerTotal;

  scene.scene.otherPlayers.getChildren().forEach((player) => {
    console.log('CALCULATE', player);
    let playerId = String(player.playerInfo.turn);
    let playerTotal = player.playerInfo.retirement;
    playersObj[playerId] = playerTotal;
  });

  let highestScore = 0;
  let winner = null;

  for (let key in playersObj) {
    if (playersObj[key] > highestScore) {
      highestScore = playersObj[key];
      winner = key;
    }
  }
  let winnerAndScore = {
    winner,
    highestScore,
  };
  return winnerAndScore;
}
