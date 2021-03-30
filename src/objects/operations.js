// Connecting to Firebase
import db from '../config/firebaseConfig';

// Importing data from data.js
import { tileKeys, salaryKeys } from './data';

// Pulling Life Tile Data from Firebase
let lifeTiles = {};
const tilesRef = db.ref().child('Tiles');
tilesRef.on('value', (snap) => {
  lifeTiles = snap.val();
});

// pick lifetile function
export function pickLifeTile(scene) {
  let randomNum = Math.floor(Math.random() * Math.floor(tileKeys.length));
  let chosenTile = lifeTiles[tileKeys[randomNum]];
  scene.scene.player.lifeTiles.push(chosenTile);
  tileKeys.splice(randomNum, 1);
}

// payday function
export function payday(scene) {
  scene.scene.player.bankAccount +=
    parseInt(scene.scene.player.salary.amount) * 1000;
  console.log('AFTER PAYDAY', scene.scene.player.bankAccount);
}

export function taxesDue(scene) {
  scene.scene.player.bankAccount -= parseInt(scene.scene.player.salary.taxes) * 1000;
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

//pick career function
export function pickCareer(scene) {
  const options = Object.keys(careers);
  let randomNum = Math.floor(Math.random() * Math.floor(options.length));

  const chosen = careers[options[randomNum]];
  scene.scene.player.career = chosen;
  let update = { taken: false };
  pickSalary(scene);
  return db.ref().child('Career').child(options[randomNum]).update(update);
}

// Pulling Salary Data from Firebase
let salaries = {};
const salariesRef = db.ref().child('Salaries');
salariesRef.on('value', (snap) => {
  salaries = snap.val();
});

function pickSalary(scene) {
  let randomNum = Math.floor(Math.random() * Math.floor(salaryKeys.length));
  let chosenSalary = salaries[salaryKeys[randomNum]];
  scene.scene.player.salary = chosenSalary;
  salaryKeys.splice(randomNum, 1);
}

// Pay function
export function pay(scene, amount) {
  scene.scene.player.bankAccount -= amount;
}

// Collect function
export function collect(scene, amount) {
  scene.scene.player.bankAccount += amount;
}
