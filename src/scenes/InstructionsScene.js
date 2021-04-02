import 'phaser';
import phaserConfig from '../config/phaserConfig';

import DecisionBox from '../objects/DecisionBox';

export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  preload() {
    this.load.image('box', 'assets/message_box.png');
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
    this.load.image;
  }

  create() {
    let scene = this.scene;
    // let welcome = this.add.image(400, 300, 'box');

    this.skip = new DecisionBox(
      this,
      phaserConfig.width / 2,
      phaserConfig.height / 2,
      'box',
      'blueButton1',
      'blueButton2',
      'Welcome to Game of Life: Engineer Edition! Did you want to read the instructions?',
      'Show me!',
      'I am a pro.'
    );

    this.skip.setScale(2);
    //   let box = this.add
    //     .image(phaserConfig.width / 2, phaserConfig.height / 2, 'box')
    //     .setDepth(6);

    //   let text = this.add
    //     .text(
    //       box.width / 2,
    //       box.height / 2,
    //       'WELCOME TO GAME OF LIFE: DEVELOPER EDITION!',
    //       {
    //         fontSize: '32px',
    //         fill: '#000',
    //         wordWrap: { width: 600 },
    //         align: 'center',
    //       }
    //     )
    //     .setDepth(7);

    //   Phaser.Display.Align.In.TopCenter(text, box);
    //   text.y = 210;
  }
}
