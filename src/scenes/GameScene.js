import 'phaser';
import firebase from 'firebase/app';
import 'firebase/database';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images

    this.load.image('logo', 'src/assets/flowers.png');
  }

  create() {
    console.log('THIS IS THE GAME SCENE');
    const dbRefObject = firebase.database().ref().child('HOUSES');
    dbRefObject.on('value', (snap) => console.log(snap.val()));

    firebase
      .database()
      .ref()
      .child('Houses')
      .child('Fancy House')
      .get()
      .then(function (snapshot) {
        console.log('THIS IS THE FANCY HOUSE', snapshot.val());
      });

    this.add.image(400, 300, 'logo');
  }
}
