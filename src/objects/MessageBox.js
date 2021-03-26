import 'phaser';
import config from '../config/config'

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, description, callback) {
    super(scene);
    this.scene = scene;
    const width = config.width / 2;
    const height = config.height / 2;
    const msgBox = this.scene.add.group();

    const box = this.scene.add.sprite(width, height, key1).setScale(0.5);

    const button = this.scene.add.sprite(width, height + 50, key2).setInteractive();
    const buttonText = this.scene.add.text(0, 0, 'Okay', {fontSize: '32px', fill: '#fff'}).setScale(0.9);
    Phaser.Display.Align.In.Center(buttonText, button);

    const text = this.scene.add.text(0, 0, description, {fontSize: '20px', fill: '#000', wordWrap: {width: 220}, align: 'center'})
    Phaser.Display.Align.In.TopCenter(text, box);
    text.y = 210;

    msgBox.add(box);
    msgBox.add(button);
    msgBox.add(buttonText);
    msgBox.add(text);


    button.on('pointerdown', function () {
      msgBox.destroy(true);
      callback();
      scene.messageBox = null;
    });

    button.on('pointerover', function () {
      button.setTexture(key3);
    });

    button.on('pointerout', function () {
      button.setTexture(key2);
    });

  }
}