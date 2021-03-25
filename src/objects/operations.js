// Connecting to Firebase
import db from '../config/firebaseConfig';

// Pulling Life Tile Data from Firebase
let lifeTiles = {};
const tilesRef = db.ref().child('Tiles');
tilesRef.on('value', (snap) => {
  lifeTiles = snap.val();
});

// Pulling in the tileKeys array with keys to database data
import tileKeys from './lifeTiles';

// pick lifetile function
export function pickLifeTile(scene) {
  let randomNum = Math.floor(Math.random() * Math.floor(tileKeys.length));
  let chosenTile = lifeTiles[tileKeys[randomNum]];
  // scene.scene.socket.lifeTiles.push(chosenTile);
  tileKeys.splice(randomNum, 1);
}

// payday function
export function payday(scene) {
  // scene.scene.socket.bank += 100;
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
  // scene.scene.socket.career = chosen;
  let update = { taken: true };
  return db.ref().child('Career').child(options[randomNum]).update(update);
}
// import 'phaser';

// export default class Operations extends Phaser.Game{
//   constructor(scene, ){
//     super()

//   }
//   create(){
//   this.payday = () =>
//   }
// }
