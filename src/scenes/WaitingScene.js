import 'phaser';
import Button from '../objects/Button';
import phaserConfig from '../config/phaserConfig';
import io from 'socket.io-client';

export default class WaitingScene extends Phaser.Scene {
  constructor() {
    super('Waiting');
  }
  preload() {
    this.load.image('box', 'assets/message_box.png');
  }
  create() {
    let displayBox = this.add.image(400,300, 'box')
    
    let text = this.add.text(0, 0, 'Sorry the game is full at the moment please come back at a later time!', {
      fontSize: '20px',
      fill: '#000',
      wordWrap: { width: 220 },
      align: 'center',
    })

    Phaser.Display.Align.In.TopCenter(text, displayBox);
    text.y = 210;
    // this.text.add(0,0, 'Sorry there are no aviable games at the moment!',{ fontSize: fontSize ? fontSize : '32px', fill: '#fff'})
  }
}