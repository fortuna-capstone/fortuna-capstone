import 'phaser';
import Button from '../objects/Button';
import phaserConfig from '../config/phaserConfig';
import io from 'socket.io-client';

export default class WaitingScene extends Phaser.Scene {
  constructor() {
    super('Waiting');
  }
  preload() {
    this.load.image('box', 'assets/waitingScene.png');
  }
  create() {
    this.add.image(400,300, 'box').setScale(4)
    

    // Phaser.Display.Align.In.TopCenter(text, displayBox);
    // text.y = 210;
    // // this.text.add(0,0, 'Sorry there are no aviable games at the moment!',{ fontSize: fontSize ? fontSize : '32px', fill: '#fff'})
  }
}