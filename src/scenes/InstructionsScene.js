import 'phaser';
import phaserConfig from '../config/phaserConfig';

import Button from '../objects/Button';

export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  preload() {
    this.load.image('box', 'assets/message_box.png');
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
    this.load.image('backgroundImage', 'assets/grassBackground.png');
  }

  create() {
    let scene = this.scene;

    this.add.image(400, 300, 'backgroundImage').setScale(4).setScrollFactor(0);

    this.title = this.add
      .text(phaserConfig.width / 2 - 220, 20, 'The Rules of the Game', {
        fontSize: '32px',
        fill: '#000',
        wordWrap: { width: 600 },
        align: 'center',
      })
      .setDepth(10);

    let instructionSentences = [
      `The tiles represent events at a developer's life.`,
      `Green: Payday`,
      `Red: Major life event`,
      `Pink: Life tiles`,
      `Orange: Life event`,
      `The game starts when the first player spins.`,
      `Each player must wait their turn.`,
      `When a pop up appears you must respond to it before you can continue.`,
    ];
    let y = 70;
    instructionSentences.forEach((sentence) => {
      this.add
        .text(0, y, `◊ ${sentence}`, {
          fontSize: '24px',
          fill: '#000',
          wordWrap: { width: 800 },
        })
        .setDepth(10);
      y += 30;
    });

    this.playButton = new Button(
      this,
      phaserConfig.width / 2,
      phaserConfig.height - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      () => this.scene.start('Game')
    );
  }
}
